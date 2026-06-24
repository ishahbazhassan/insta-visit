import { Module } from '@nestjs/common';
import { VisitRequestsController } from './visit-requests.controller';
import { VisitRequestsService } from './visit-requests.service';

@Module({
  controllers: [VisitRequestsController],
  providers: [VisitRequestsService],
})
export class VisitRequestsModule {}
