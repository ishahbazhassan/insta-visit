import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateVisitRequestDto } from './dto/create-visit-request.dto';
import { VisitRequestsService } from './visit-requests.service';

@Controller('visit-requests')
export class VisitRequestsController {
  constructor(private readonly visitRequestsService: VisitRequestsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateVisitRequestDto) {
    return this.visitRequestsService.create(dto);
  }
}
