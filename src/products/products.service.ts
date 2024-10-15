import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  async create(createProductDto: any) {
    return prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return prisma.product.findMany();
  }

  async findOne(id: number) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: any) {
    return prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }
}