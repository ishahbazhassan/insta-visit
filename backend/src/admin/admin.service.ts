import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const providerRequestSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  npiNumber: true,
  credentials: true,
  licenseNumber: true,
  licenseExpirationDate: true,
  licenseState: true,
  homeStreetAddress: true,
  homeCity: true,
  homeState: true,
  homeZipCode: true,
  practiceAddress: true,
  role: true,
  status: true,
  createdAt: true,
} as const;

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findApprovedProviders() {
    const providers = await this.prisma.user.findMany({
      where: {
        role: Role.PROVIDER,
        status: { in: [UserStatus.ACTIVE, UserStatus.INACTIVE] },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        credentials: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      providers: providers.map((provider) => ({
        id: provider.id,
        name: `${provider.firstName} ${provider.lastName}`.trim(),
        email: provider.email,
        phone: provider.phone,
        education: provider.credentials,
        patientsAttended: 0,
        status: provider.status,
        createdAt: provider.createdAt,
      })),
      total: providers.length,
    };
  }

  async findProviderRequests() {
    const requests = await this.prisma.user.findMany({
      where: {
        role: Role.PROVIDER,
        status: { in: [UserStatus.PENDING, UserStatus.REJECTED] },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        credentials: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      requests: requests.map((request) => ({
        id: request.id,
        name: `${request.firstName} ${request.lastName}`.trim(),
        email: request.email,
        phone: request.phone,
        education: request.credentials,
        status: this.mapRequestStatus(request.status),
        createdAt: request.createdAt,
      })),
      total: requests.length,
    };
  }

  async findProviderRequestById(id: string) {
    const request = await this.findProviderRequestOrThrow(id);

    return {
      id: request.id,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phone: request.phone,
      npiNumber: request.npiNumber,
      credentials: request.credentials,
      licenseNumber: request.licenseNumber,
      licenseExpirationDate: request.licenseExpirationDate,
      licenseState: request.licenseState,
      homeStreetAddress: request.homeStreetAddress,
      homeCity: request.homeCity,
      homeState: request.homeState,
      homeZipCode: request.homeZipCode,
      practiceAddress: request.practiceAddress,
      status: this.mapRequestStatus(request.status),
      createdAt: request.createdAt,
    };
  }

  async approveProviderRequest(id: string) {
    const request = await this.findPendingProviderOrThrow(id);

    const plainPassword = randomBytes(9).toString('base64url');
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await this.prisma.user.update({
      where: { id: request.id },
      data: {
        status: UserStatus.ACTIVE,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    console.log(
      `Provider approved — email: ${user.email}, password: ${plainPassword}`,
    );

    return {
      message: 'Provider approved successfully',
      user,
    };
  }

  async rejectProviderRequest(id: string) {
    const request = await this.findPendingProviderOrThrow(id);

    await this.prisma.user.update({
      where: { id: request.id },
      data: { status: UserStatus.REJECTED },
    });

    return {
      message: 'Provider request declined successfully',
    };
  }

  async updateProviderStatus(id: string, status: 'ACTIVE' | 'INACTIVE') {
    const provider = await this.findManagedProviderOrThrow(id);
    const nextStatus =
      status === 'ACTIVE' ? UserStatus.ACTIVE : UserStatus.INACTIVE;

    if (provider.status === nextStatus) {
      return {
        message: `Provider is already ${status.toLowerCase()}`,
        user: {
          id: provider.id,
          email: provider.email,
          firstName: provider.firstName,
          lastName: provider.lastName,
          status: provider.status,
        },
      };
    }

    const user = await this.prisma.user.update({
      where: { id: provider.id },
      data: { status: nextStatus },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    return {
      message:
        nextStatus === UserStatus.ACTIVE
          ? 'Provider activated successfully'
          : 'Provider deactivated successfully',
      user,
    };
  }

  private mapRequestStatus(status: UserStatus): 'pending' | 'decline' {
    return status === UserStatus.REJECTED ? 'decline' : 'pending';
  }

  private async findProviderRequestOrThrow(id: string) {
    const request = await this.prisma.user.findUnique({
      where: { id },
      select: providerRequestSelect,
    });

    if (!request) {
      throw new NotFoundException('Provider request not found');
    }

    if (request.role !== Role.PROVIDER) {
      throw new BadRequestException('User is not a provider request');
    }

    if (
      request.status !== UserStatus.PENDING &&
      request.status !== UserStatus.REJECTED
    ) {
      throw new BadRequestException('This provider request is no longer available');
    }

    return request;
  }

  private async findPendingProviderOrThrow(id: string) {
    const request = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException('Provider request not found');
    }

    if (request.role !== Role.PROVIDER) {
      throw new BadRequestException('User is not a provider request');
    }

    if (request.status !== UserStatus.PENDING) {
      throw new BadRequestException('Only pending requests can be updated');
    }

    return request;
  }

  private async findManagedProviderOrThrow(id: string) {
    const provider = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    if (provider.role !== Role.PROVIDER) {
      throw new BadRequestException('User is not a provider');
    }

    if (
      provider.status !== UserStatus.ACTIVE &&
      provider.status !== UserStatus.INACTIVE
    ) {
      throw new BadRequestException(
        'Only approved providers can be activated or deactivated',
      );
    }

    return provider;
  }
}
