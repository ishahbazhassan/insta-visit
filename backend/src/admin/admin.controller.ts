import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
