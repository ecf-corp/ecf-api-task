Nest.js와 PostgreSQL을 이용한 e-commerce API 개발 과제

과제 개요:
이 과제는 Nest.js와 PostgreSQL을 사용하여 간단한 e-commerce API를 개발하는 것입니다. Prisma ORM을 사용하여 데이터베이스를 관리하고, RESTful API 원칙을 따라 개발해야 합니다.

기간: 1주 (7일)

기술 요구사항:
1. Nest.js 프레임워크 사용
2. PostgreSQL 데이터베이스 사용
3. Prisma ORM을 이용한 데이터베이스 연동

API 요구사항:

1. 상품 관리
   - POST /products: 새 상품 생성
   - GET /products: 상품 목록 조회
   - GET /products/{id}: 특정 상품 조회
   - PUT /products/{id}: 상품 정보 수정
   - DELETE /products/{id}: 상품 삭제

2. 사용자 관리 및 인증
   - POST /auth/register: 회원가입
   - POST /auth/login: 로그인 (JWT 토큰 반환)
   - GET /users/me: 현재 로그인한 사용자 정보 조회

3. 장바구니 기능
   - POST /cart: 장바구니에 상품 추가
   - GET /cart: 장바구니 조회
   - DELETE /cart/{productId}: 장바구니에서 상품 제거

4. 주문 처리
   - POST /orders: 주문 생성
   - GET /orders: 사용자의 주문 목록 조회
   - GET /orders/{id}: 특정 주문 조회

API 응답 구조:

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

데이터베이스 관련:
1. Prisma를 사용하여 데이터베이스 스키마를 정의해주세요.
2. 초기 더미 데이터는 필수입니다. Prisma의 seeding 기능을 사용하여 더미 데이터를 생성해주세요.
   - 최소 5개의 상품
   - 2-3명의 사용자 (일반 사용자, 관리자)
   - 1-2개의 주문 내역
3. README 파일에 데이터베이스 설정 및 시딩 방법을 명시해주세요.

데이터베이스 설정:
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

과제 제출 방법:
1. 이 리포지토리를 클론합니다.
2. 'main' 브랜치에서 본인의 영문 이름으로 새 브랜치를 생성합니다. (예: 'git checkout -b john-doe')
3. 해당 브랜치에서 과제를 수행합니다.
4. 작업이 완료되면 해당 브랜치를 push하고, Pull Request를 생성합니다.
5. Pull Request 링크를 제출합니다.

제출 요구사항:
1. 소스 코드
2. README 파일 (프로젝트 설정, 실행 방법, 데이터베이스 설정 및 시딩 방법 포함)
3. Prisma 스키마 파일
4. 더미 데이터 생성을 위한 시딩 스크립트

평가 기준:
1. API 기능 구현 완성도
2. 코드 구조 및 가독성
3. Prisma를 이용한 데이터베이스 모델링 및 연동 적절성
4. 더미 데이터의 적절성 및 시딩 스크립트 구현

참고사항:
- 상세한 에러 처리나 고급 기능은 필수가 아닙니다. 기본적인 CRUD 작업에 집중하세요.
- 보안이나 인증 관련 고급 기능은 구현하지 않아도 됩니다. 단순한 JWT 토큰 사용으로 충분합니다.
- Postman으로 API를 테스트할 수 있도록 각 엔드포인트의 요청/응답 형식을 README에 간단히 기술해주세요.
- Prisma 사용법에 대해 궁금한 점이 있다면 공식 문서를 참조하거나 질문해주세요.