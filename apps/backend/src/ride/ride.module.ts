import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [RideService, PrismaService],
  controllers: [RideController],
  exports: [RideService, PrismaService],
})
export class RideModule {}
