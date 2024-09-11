# Nest.js와 PostgreSQL을 이용한 e-commerce API 개발 실습

## 목적
이 실습 프로젝트는 우리 팀의 주요 기술 스택인 **Nest.js**, **PostgreSQL**, 그리고 **Prisma ORM**을 실제로 경험하고 학습하는 것을 목표로 합니다. 간단한 e-commerce API를 구현하면서 이러한 기술들을 효과적으로 활용하는 방법을 직접 체험해볼 수 있습니다.

**기간**: 1주 (7일)

## 학습 목표
1. Nest.js 프레임워크의 기본 구조와 사용법 익히기
2. PostgreSQL 데이터베이스와 Prisma ORM을 통한 데이터 관리 방법 이해하기
3. RESTful API 설계 및 구현 능력 향상
4. 실제 프로젝트와 유사한 환경에서의 개발 경험 쌓기

## 구현할 API 기능

### 1. 상품 관리
- `POST /products`: 새 상품 생성
- `GET /products`: 상품 목록 조회
- `GET /products/{id}`: 특정 상품 조회
- `PUT /products/{id}`: 상품 정보 수정
- `DELETE /products/{id}`: 상품 삭제

### 2. 사용자 관리 및 인증
- `POST /auth/register`: 회원가입
- `POST /auth/login`: 로그인 (JWT 토큰 반환)
- `GET /users/me`: 현재 로그인한 사용자 정보 조회

### 3. 장바구니 기능
- `POST /cart`: 장바구니에 상품 추가
- `GET /cart`: 장바구니 조회
- `DELETE /cart/{productId}`: 장바구니에서 상품 제거

### 4. 주문 처리
- `POST /orders`: 주문 생성
- `GET /orders`: 사용자의 주문 목록 조회
- `GET /orders/{id}`: 특정 주문 조회

## API 응답 구조

1. 상품 관리
   - POST /products
     {
       "id": 1,
       "name": "상품명",
       "description": "상품 설명",
       "price": 10000,
       "stock": 100
     }
   - GET /products
     {
       "items": [
         {
           "id": 1,
           "name": "상품명",
           "price": 10000
         }
       ],
       "total": 10,
       "page": 1,
       "limit": 20
     }
   - GET /products/{id}
     {
       "id": 1,
       "name": "상품명",
       "description": "상품 설명",
       "price": 10000,
       "stock": 100
     }
   - PUT /products/{id}: GET /products/{id}와 동일한 응답
   - DELETE /products/{id}
     {
       "message": "상품이 삭제되었습니다."
     }

2. 사용자 관리 및 인증
   - POST /auth/register
     {
       "id": 1,
       "email": "user@example.com",
       "name": "사용자명"
     }
   - POST /auth/login
     {
       "accessToken": "JWT_TOKEN_HERE"
     }
   - GET /users/me
     {
       "id": 1,
       "email": "user@example.com",
       "name": "사용자명"
     }

3. 장바구니 기능
   - POST /cart
     {
       "id": 1,
       "productId": 1,
       "quantity": 2
     }
   - GET /cart
     {
       "items": [
         {
           "id": 1,
           "productId": 1,
           "name": "상품명",
           "price": 10000,
           "quantity": 2
         }
       ],
       "total": 20000
     }
   - DELETE /cart/{productId}
     {
       "message": "장바구니에서 상품이 제거되었습니다."
     }

4. 주문 처리
   - POST /orders
     {
       "id": 1,
       "totalAmount": 20000,
       "status": "PENDING",
       "items": [
         {
           "productId": 1,
           "quantity": 2,
           "price": 10000
         }
       ]
     }
   - GET /orders
     {
       "items": [
         {
           "id": 1,
           "totalAmount": 20000,
           "status": "PENDING",
           "createdAt": "2023-04-20T12:00:00Z"
         }
       ],
       "total": 5,
       "page": 1,
       "limit": 20
     }
   - GET /orders/{id}
     {
       "id": 1,
       "totalAmount": 20000,
       "status": "PENDING",
       "items": [
         {
           "productId": 1,
           "name": "상품명",
           "quantity": 2,
           "price": 10000
         }
       ],
       "createdAt": "2023-04-20T12:00:00Z"
     }

오류 응답 구조:
{
  "statusCode": 400,
  "message": "에러 메시지",
  "error": "Bad Request"
}

## 데이터베이스 관련
1. Prisma를 사용하여 데이터베이스 스키마를 정의해주세요.
2. 초기 더미 데이터는 필수입니다. Prisma의 seeding 기능을 사용하여 더미 데이터를 생성해주세요.
   - 최소 5개의 상품
   - 2-3명의 사용자 (일반 사용자, 관리자)
   - 1-2개의 주문 내역
3. README 파일에 데이터베이스 설정 및 시딩 방법을 명시해주세요.

## 데이터베이스 설정
1. 다음 SQL 명령을 사용하여 자신의 데이터베이스를 생성하세요:
   CREATE DATABASE task_<your_name>;
   (예: task_john_doe)
2. 프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가하세요:
   DB_HOST=void-admin.ct0thd4yrhzu.ap-northeast-2.rds.amazonaws.com
   DB_PORT=5432
   DB_USERNAME=admin
   DB_PASSWORD=ecfstore2024
   DB_NAME=task_<your_name>
3. <your_name> 부분을 자신의 이름으로 바꾸는 것을 잊지 마세요.
4. .env 파일은 .gitignore에 포함되어 있으므로 GitHub에 업로드되지 않습니다. 
   이는 각자의 DB_NAME이 다르기 때문입니다.
5. 데이터베이스 연결에 문제가 있다면 관리자에게 문의하세요.

참고: 이 정보는 회사 내부용이므로 외부에 공유하지 마세요.

Prisma 시딩:
초기 데이터 설정을 위해 Prisma의 seeding 기능을 사용합니다. 이를 통해 데이터베이스 작업의 기본을 익힐 수 있습니다.

Prisma Seeding 사용하기:
Prisma의 seeding 기능은 데이터베이스에 초기 데이터를 쉽게 삽입할 수 있게 해줍니다. 이 프로젝트에서는 seeding을 통해 기본 상품, 사용자, 주문 데이터를 생성합니다.

1. seed 스크립트 생성:
   prisma/seed.ts 파일을 생성하고 다음과 같이 작성합니다:

   import { PrismaClient } from '@prisma/client'
   
   const prisma = new PrismaClient()
   
   async function main() {
     // 상품 데이터 생성
     await prisma.product.createMany({
       data: [
         { name: '상품1', description: '상품1 설명', price: 10000, stock: 100 },
         { name: '상품2', description: '상품2 설명', price: 20000, stock: 50 },
         // 추가 상품...
       ],
     })
   
     // 사용자 데이터 생성
     const user = await prisma.user.create({
       data: {
         email: 'user@example.com',
         name: '사용자1',
         password: 'hashedpassword123', // 실제 구현 시 비밀번호 해싱 필요
       },
     })
   
     // 주문 데이터 생성
     await prisma.order.create({
       data: {
         userId: user.id,
         totalAmount: 10000,
         status: 'PENDING',
         orderItems: {
           create: [
             {
               productId: 1, // 상품1의 ID
               quantity: 1,
               price: 10000,
             },
           ],
         },
       },
     })
   }
   
   main()
     .catch((e) => {
       console.error(e)
       process.exit(1)
     })
     .finally(async () => {
       await prisma.$disconnect()
     })

2. package.json에 seed 스크립트 추가:
   "scripts": {
     "seed": "ts-node prisma/seed.ts"
   }

3. seeding 실행:
   터미널에서 다음 명령어를 실행합니다:
   npm run seed

   이 명령어는 prisma/seed.ts 파일을 실행하여 데이터베이스에 초기 데이터를 삽입합니다.

4. 자동 seeding 설정 (선택사항):
   prisma/schema.prisma 파일에 다음 내용을 추가하면, 데이터베이스 마이그레이션 후 자동으로 seeding이 실행됩니다:

   generator client {
     provider = "prisma-client-js"
     previewFeatures = ["seedingWithoutDatasource"]
   }

주의사항:
- seed 스크립트는 여러 번 실행해도 안전하도록 작성해야 합니다.
- 실제 프로덕션 환경에서는 중요한 데이터를 seeding하지 않도록 주의하세요.
- seeding은 개발 및 테스트 목적으로만 사용하세요.


## 프로젝트 시작 방법
1. 이 리포지토리를 클론합니다.
2. 'live' 브랜치에서 본인의 영문 이름으로 새 브랜치를 생성합니다. (예: `git checkout -b jimin`)
3. 해당 브랜치에서 프로젝트를 진행합니다.
4. 작업이 완료되면 해당 브랜치를 push하고, Pull Request를 생성합니다.
5. Pull Request 링크를 제출합니다.

## 제출 요구사항
1. 소스 코드
2. README 파일 (프로젝트 설정, 실행 방법, 데이터베이스 설정 및 시딩 방법 포함)
3. Prisma 스키마 파일
4. 더미 데이터 생성을 위한 시딩 스크립트

## 평가 기준
1. API 기능 구현 완성도
2. 코드 구조 및 가독성
3. Prisma를 이용한 데이터베이스 모델링 및 연동 적절성
4. 더미 데이터의 적절성 및 시딩 스크립트 구현

## 권장 사항
- 공식 문서를 적극 활용하세요. (Nest.js, Prisma, PostgreSQL)
- 이해가 가지 않는 부분이 있다면 언제든 팀원들에게 질문하세요.
- 기능 구현 외에도 코드의 구조와 가독성에 신경 써보세요.
- 시간이 된다면 단위 테스트도 작성해보세요.

이 프로젝트를 통해 우리 팀의 기술 스택을 빠르게 익히고, 실제 프로젝트에 더 쉽게 참여할 수 있게 될 것입니다. 어려운 점이 있다면 언제든 도움을 요청하세요. 함께 성장하는 좋은 기회가 되기를 바랍니다!
