import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.register(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
