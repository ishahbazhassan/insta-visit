import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('providers')
  findApprovedProviders() {
    return this.adminService.findApprovedProviders();
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
