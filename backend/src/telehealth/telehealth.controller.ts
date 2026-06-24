import { Controller, Get, Param } from '@nestjs/common';
import { TelehealthCatalogService } from './telehealth.service';

@Controller('telehealth')
export class TelehealthController {
  constructor(
    private readonly telehealthCatalogService: TelehealthCatalogService,
  ) {}

  @Get('categories')
  findCategories() {
    return this.telehealthCatalogService.findCategories();
  }

  @Get('services')
  findServices() {
    return this.telehealthCatalogService.findServices();
  }

  @Get('pharmacies')
  findPharmacies() {
    return this.telehealthCatalogService.findPharmacies();
  }

  @Get('services/:slug')
  findServiceBySlug(@Param('slug') slug: string) {
    return this.telehealthCatalogService.findServiceBySlug(slug);
  }
}
