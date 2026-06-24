import { Module } from '@nestjs/common';
import { TelehealthController } from './telehealth.controller';
import { TelehealthCatalogService } from './telehealth.service';

@Module({
  controllers: [TelehealthController],
  providers: [TelehealthCatalogService],
  exports: [TelehealthCatalogService],
})
export class TelehealthModule {}
