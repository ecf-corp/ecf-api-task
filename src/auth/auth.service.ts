import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../users/dto/user.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });
    return new UserDto(user);
  }

  async login(loginDto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: loginDto.email } });
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
      return { accessToken: token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}