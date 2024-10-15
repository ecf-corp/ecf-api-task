// orders.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaClient();


@Injectable()
// 주문 생성
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }
    const { items, totalAmount } = createOrderDto;
    
    return this.prisma.order.create({
      data: {
        userId,
        totalAmount: createOrderDto.totalAmount,
        status: 'PENDING',
        orderItems: {
          create: createOrderDto.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  // 주문 수정
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { status, items } = updateOrderDto;
  
    return this.prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(items && {
          orderItems: {
            deleteMany: {},
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        })
      },
      include: { orderItems: true }
    });
  }


  // 주문 목록 조회
  async findAll(): Promise<OrderDto[]> {
    // JSON 데이터를 반환합니다.
    return this.prisma.order.findMany({
      include: { orderItems: true },
    });
  }

  // 주문 조회
  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
  }

  // 주문 삭제
  async remove(id: number): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.orderItem.deleteMany({
        where: { orderId: id },
      });

      await prisma.order.delete({
        where: { id },
      });
    });
  }
}