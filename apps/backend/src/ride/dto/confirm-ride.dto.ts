import { IsNotEmpty, IsNumber, IsString, ValidateNested, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

class DriverDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ConfirmRideDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @IsPositive()
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @ValidateNested()
  @Type(() => DriverDto)
  driver: DriverDto;

  @IsNumber()
  @Min(0)
  value: number;
}
