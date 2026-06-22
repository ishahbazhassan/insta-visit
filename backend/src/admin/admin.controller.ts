import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { UpdateProviderStatusDto } from './dto/update-provider-status.dto';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('providers')
  findApprovedProviders() {
    return this.adminService.findApprovedProviders();
  }

  @Patch('providers/:id/status')
  @HttpCode(HttpStatus.OK)
  updateProviderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateProviderStatusDto,
  ) {
    return this.adminService.updateProviderStatus(id, dto.status);
  }

  @Get('provider-requests')
  findProviderRequests() {
    return this.adminService.findProviderRequests();
  }

  @Get('provider-requests/:id')
  findProviderRequestById(@Param('id') id: string) {
    return this.adminService.findProviderRequestById(id);
  }

  @Post('provider-requests/:id/approve')
  @HttpCode(HttpStatus.OK)
  approveProviderRequest(@Param('id') id: string) {
    return this.adminService.approveProviderRequest(id);
  }

  @Post('provider-requests/:id/reject')
  @HttpCode(HttpStatus.OK)
  rejectProviderRequest(@Param('id') id: string) {
    return this.adminService.rejectProviderRequest(id);
  }
}
