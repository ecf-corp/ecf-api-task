import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 상품 데이터 생성
  const products = await prisma.product.createMany({
    data: [
      { name: '상품1', description: '상품1 설명', price: 10000, stock: 100 },
      { name: '상품2', description: '상품2 설명', price: 20000, stock: 50 },
      { name: '상품3', description: '상품3 설명', price: 15000, stock: 75 },
      { name: '상품4', description: '상품4 설명', price: 25000, stock: 30 },
      { name: '상품5', description: '상품5 설명', price: 30000, stock: 20 },
    ],
  });

  // 사용자 데이터 생성
  const users = await prisma.user.createMany({
    data: [
      { email: 'user1@example.com', name: '사용자1', password: 'hashedpassword123' },
      { email: 'user2@example.com', name: '사용자2', password: 'hashedpassword456' },
      { email: 'admin@example.com', name: '관리자', password: 'hashedpassword789' },
    ],
  });

  // 주문 및 주문 아이템 데이터 생성
  const order = await prisma.order.create({
    data: {
      userId: 1, // 첫 번째 사용자의 ID
      totalAmount: 30000,
      status: 'PENDING',
      orderItems: {
        create: [
          {
            productId: 1, // 상품1의 ID
            quantity: 2,
            price: 10000,
          },
          {
            productId: 2, // 상품2의 ID
            quantity: 1,
            price: 20000,
          },
          {
            productId: 3, // 상품3의 ID
            quantity: 1,
            price: 15000,
          },
          {
            productId: 4, // 상품4의 ID
            quantity: 1,
            price: 25000,
          },
          {
            productId: 5, // 상품5의 ID
            quantity: 1,
            price: 30000,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });