import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findOne(id: number): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await prisma.user.findMany();
    return users.map(user => new UserDto(user));
  }
}