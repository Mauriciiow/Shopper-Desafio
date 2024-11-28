import { Module } from '@nestjs/common';
import { RideModule } from './ride/ride.module';
import { DatabaseModule } from './database/dabatase.module';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RideModule, DatabaseModule, UsersModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
