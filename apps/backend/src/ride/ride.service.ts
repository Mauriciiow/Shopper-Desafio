import { Client } from '@googlemaps/google-maps-services-js';
import { BadRequestException, Injectable } from '@nestjs/common';
import { env } from 'process';
import { PrismaService } from 'src/database/prisma.service';
import { ConfirmRideDto } from './dto/confirm-ride.dto';

@Injectable()
export class RideService {
  private readonly client: Client;

  constructor(private readonly prisma: PrismaService) {
    this.client = new Client();
  }

  async estimateRide(
    userId: string,
    origin: string,
    destination: string,
  ): Promise<any> {
    if (origin === destination) {
      throw new BadRequestException(
        'Origin and destination cannot be the same.',
      );
    }

    const route = await this.client.directions({
      params: {
        origin,
        destination,
        key: env.GOOGLE_API_KEY,
      },
    });

    const { distance, duration } = route.data.routes[0].legs[0];
    const startLocation = route.data.routes[0].legs[0].start_location;
    const endLocation = route.data.routes[0].legs[0].end_location;

    const drivers = await this.prisma.driver.findMany();

    const distanceInKm = distance.value / 1000;
    const availableDrivers = drivers
      .filter((driver) => distanceInKm >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: driver.rating,
          comment: driver.comment,
        },
        value: parseFloat((distanceInKm * driver.pricePerKm).toFixed(2)),
      }))
      .sort((a, b) => a.value - b.value);

    return {
      origin: {
        latitude: startLocation.lat,
        longitude: startLocation.lng,
      },
      destination: {
        latitude: endLocation.lat,
        longitude: endLocation.lng,
      },
      distance: distance.text,
      duration: duration.text,
      options: availableDrivers,
      routeResponse: route.data,
    };
  }

  async confirmRide(
    confirmRideDto: ConfirmRideDto & { customer_id: string },
  ): Promise<any> {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = confirmRideDto;

    if (origin === destination) {
      throw new BadRequestException(
        'Origin and destination cannot be the same.',
      );
    }

    const driverExists = await this.prisma.driver.findUnique({
      where: { id: driver.id },
    });
    if (!driverExists) {
      throw new BadRequestException('Invalid driver selected.');
    }

    if (distance < driverExists.minKm) {
      throw new BadRequestException(
        'Distance is too short for the selected driver.',
      );
    }

    const ride = await this.prisma.ride.create({
      data: {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        value,
        driverId: driver.id,
      },
    });

    return { message: 'Ride confirmed successfully.', ride };
  }

  async getRidesByCustomer(customer_id: string, driver_id?: number) {
    if (!customer_id) {
      throw new BadRequestException('Customer ID cannot be empty.');
    }

    if (driver_id) {
      const driverExists = await this.prisma.driver.findUnique({
        where: { id: driver_id },
      });
      if (!driverExists) {
        throw new BadRequestException('Invalid driver ID.');
      }
    }

    const rides = await this.prisma.ride.findMany({
      where: {
        customer_id,
        ...(driver_id && { driverId: driver_id }),
      },
      include: {
        driver: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedRides = rides.map((ride) => ({
      id: ride.id,
      date: ride.createdAt,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    }));

    return {
      customer_id,
      rides: formattedRides,
    };
  }
}
