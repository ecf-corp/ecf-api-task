import { Exclude, Type } from 'class-transformer';

class OrderItemDto {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export class OrderDto {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  constructor(partial: Partial<OrderDto>) {
    Object.assign(this, partial);
  }
}

export class CreateOrderDto {
  items: Array<{ 
    productId: number; 
    quantity: number;
    price: number; 
  }>;
  totalAmount: number;
}