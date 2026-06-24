import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TelehealthModule } from './telehealth/telehealth.module';
import { VisitRequestsModule } from './visit-requests/visit-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AdminModule,
    TelehealthModule,
    VisitRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}