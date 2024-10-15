import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

// 커스텀 인터페이스 정의
interface RequestWithUser extends Request {
  user: { userId: number }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtStrategy)
  @Get('me')
  async getProfile(@Req() req: RequestWithUser): Promise<UserDto> {
    const user = await this.usersService.findOne(req.user.userId);
    return new UserDto(user);
  }

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }
}