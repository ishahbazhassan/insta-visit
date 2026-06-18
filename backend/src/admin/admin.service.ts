import { Injectable } from '@nestjs/common';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findApprovedProviders() {
    const providers = await this.prisma.user.findMany({
      where: {
        role: Role.PROVIDER,
        status: UserStatus.ACTIVE,
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
        status: UserStatus.PENDING,
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
        status: request.status.toLowerCase(),
        createdAt: request.createdAt,
      })),
      total: requests.length,
    };
  }
}
