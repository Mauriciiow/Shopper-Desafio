import { IsNotEmpty, IsString } from 'class-validator';

export class RideEstimateDto {
  @IsNotEmpty({ message: 'The origin address cannot be empty.' })
  @IsString({ message: 'The origin address must be a string.' })
  origin: string;

  @IsNotEmpty({ message: 'Destination address cannot be empty.' })
  @IsString({ message: 'The destination address must be a string.' })
  destination: string;
}
