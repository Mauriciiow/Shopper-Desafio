import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideEstimateDto } from './dto/RideEstimateDto';
import { AuthGuard } from '@nestjs/passport';
import { ConfirmRideDto } from './dto/confirm-ride.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  async estimateRide(@Request() req, @Body() rideEstimateDto: RideEstimateDto) {
    const userId = req.user.userId;
    const { origin, destination } = rideEstimateDto;
    return await this.rideService.estimateRide(userId, origin, destination);
  }

  @Patch('confirm')
  async confirmRide(@Request() req, @Body() confirmRideDto: ConfirmRideDto) {
    const customer_id = req.user.userId;

    return await this.rideService.confirmRide({
      ...confirmRideDto,
      customer_id,
    });
  }

  @Get(':customer_id')
  async getRidesByCustomer(
    @Param('customer_id') customer_id: string,
    @Query('driver_id') driver_id?: string,
  ) {
    const driverId = driver_id ? parseInt(driver_id, 10) : undefined;
    return await this.rideService.getRidesByCustomer(customer_id, driverId);
  }
}
