import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const serviceSummarySelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  icon: true,
  price: true,
  sortOrder: true,
} satisfies Prisma.TelehealthServiceSelect;

const formFieldSelect = {
  id: true,
  key: true,
  label: true,
  section: true,
  fieldType: true,
  options: true,
  required: true,
  sortOrder: true,
} satisfies Prisma.ServiceFormFieldSelect;

@Injectable()
export class TelehealthCatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async findCategories() {
    const categories = await this.prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        sortOrder: true,
        services: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          select: serviceSummarySelect,
        },
      },
    });

    return {
      categories: categories.map((category) => ({
        ...category,
        services: category.services.map((service) =>
          this.mapServiceSummary(service),
        ),
      })),
      total: categories.length,
    };
  }

  async findServices() {
    const services = await this.prisma.telehealthService.findMany({
      where: { isActive: true },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
      select: {
        ...serviceSummarySelect,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
          },
        },
      },
    });

    return {
      services: services.map((service) => ({
        ...this.mapServiceSummary(service),
        category: service.category,
      })),
      total: services.length,
    };
  }

  async findServiceBySlug(slug: string) {
    const service = await this.prisma.telehealthService.findFirst({
      where: {
        slug,
        isActive: true,
        category: { isActive: true },
      },
      select: {
        ...serviceSummarySelect,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
          },
        },
        formFields: {
          orderBy: { sortOrder: 'asc' },
          select: formFieldSelect,
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Telehealth service not found');
    }

    return {
      service: {
        ...this.mapServiceSummary(service),
        category: service.category,
      },
      
    };
  }

  async findPharmacies() {
    const pharmacies = await this.prisma.pharmacy.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        phone: true,
        fax: true,
        latitude: true,
        longitude: true,
      },
    });

    return {
      pharmacies,
      total: pharmacies.length,
    };
  }

  private mapServiceSummary(
    service: Prisma.TelehealthServiceGetPayload<{
      select: typeof serviceSummarySelect;
    }>,
  ) {
    return {
      ...service,
      price:
        service.price === null || service.price === undefined
          ? null
          : Number(service.price),
    };
  }
}
