import { Controller, Get, Post, Body, Param, UseGuards, Request, UnauthorizedException, SetMetadata, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
const Public = () => SetMetadata('isPublic', true);

@Controller('orders')
// @UseGuards(JwtStrategy)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = 1; // Postman 에러 임시 해결책: 고정된 userId 사용 또는 옵셔널 체이닝 연산자 사용
    console.log('Received DTO : ', JSON.stringify(createOrderDto, null, 2));
    return this.ordersService.create(createOrderDto, userId);
  }

  @Public() // 인증 없이 접근 가능
  @Get()
  // async findAll(@Request() req): Promise<OrderDto[]> {
  //   // if (!req.user) {
  //   //   throw new UnauthorizedException('User not authenticated');
  //   // }
  //   const userId = req.user ? req.user.userId : null;
  //   return this.ordersService.findAll(req.user.userId);
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = 1; // Postman 에러 임시 해결책: 고정된 userId 사용 또는 옵셔널 체이닝 연산자 사용
    return this.ordersService.findOne(+id);  // 사용자 id로 필터링
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const userId = 1; // Postman 에러 임시 해결책: 고정된 userId 사용 또는 옵셔널 체이닝 연산자 사용
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}