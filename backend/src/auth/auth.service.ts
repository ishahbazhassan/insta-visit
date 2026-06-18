import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ProviderRequestDto } from './dto/provider-request.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { BadRequestException } from '@nestjs/common';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async providerRequest(dto: ProviderRequestDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      if (
        existingUser.role === Role.PROVIDER &&
        existingUser.status === UserStatus.PENDING
      ) {
        throw new ConflictException(
          'A provider request with this email is already pending approval',
        );
      }

      throw new ConflictException('Email is already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        role: Role.PROVIDER,
        status: UserStatus.PENDING,
        phone: dto.phone,
        npiNumber: dto.npiNumber,
        credentials: dto.credentials,
        licenseNumber: dto.licenseNumber,
        licenseExpirationDate: dto.licenseExpirationDate,
        licenseState: dto.licenseState,
        homeStreetAddress: dto.homeStreetAddress,
        homeCity: dto.homeCity,
        homeState: dto.homeState,
        homeZipCode: dto.homeZipCode,
        practiceAddress: dto.practiceAddress,
        sameAsHomeAddress: dto.sameAsHomeAddress ?? false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        phone: true,
        createdAt: true,
      },
    });

    return {
      message: 'Provider request submitted successfully. Awaiting admin approval.',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.password) {
      throw new ForbiddenException(
        'Your account is pending approval. Please wait for admin approval.',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status === UserStatus.PENDING) {
      throw new ForbiddenException(
        'Your account is pending approval. Please wait for admin approval.',
      );
    }

    if (user.status === UserStatus.REJECTED) {
      throw new ForbiddenException(
        'Your provider request was declined. Please contact support.',
      );
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new ForbiddenException(
        'Your account is inactive. Please contact support.',
      );
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { user };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Always return same message (don't reveal if email exists)
    const successMessage =
      'If this email is registered, an OTP has been sent';

    if (!user) {
      return { message: successMessage };
    }

    // Optional: invalidate old unused OTPs for this user
    await this.prisma.passwordReset.updateMany({
      where: {
        userId: user.id,
        used: false,
      },
      data: {
        used: true,
      },
    });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        otp,
        expiresAt,
      },
    });

    // Dev only: log OTP (replace with email service later)
    console.log(`[Forgot Password] OTP for ${user.email}: ${otp}`);

    return { message: successMessage };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const passwordReset = await this.prisma.passwordReset.findFirst({
      where: {
        otp: dto.otp,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
        user: {
          email: dto.email,
        },
      },
      include: {
        user: true,
      },
    });

    if (!passwordReset) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Mark OTP as used (one-time use)
    await this.prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used: true },
    });

    // Short-lived token for reset-password API (API 3)
    const resetToken = this.jwtService.sign(
      {
        sub: passwordReset.user.id,
        email: passwordReset.user.email,
        purpose: 'password-reset',
      },
      { expiresIn: '15m' },
    );

    return {
      message: 'OTP verified successfully',
      resetToken,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    let payload: {
      sub: string;
      email: string;
      purpose?: string;
    };

    try {
      payload = this.jwtService.verify(dto.resetToken);
    } catch {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (payload.purpose !== 'password-reset') {
      throw new BadRequestException('Invalid reset token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return {
      message: 'Password updated successfully',
    };
  }

}
