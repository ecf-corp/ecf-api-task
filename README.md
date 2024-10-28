# 백엔드 개발자 기술 과제

## 과제 개요
쇼핑몰 서비스의 인기 검색어 기능을 구현하는 백엔드 API를 개발합니다.

### 필수 요구사항

1. 검색어 수집 API
   - 검색어 저장 API 구현
   - 검색 시간 기록
   - 간단한 사용자 식별값 저장 (임의의 값으로 대체 가능)

2. 인기 검색어 조회 API
   - 24시간 동안의 인기 검색어 순위 제공
   - 상위 10개 검색어 반환
   - 검색어별 검색 횟수 포함
  
## API 명세 예시
아래는 참고용 예시이며, 자유롭게 변경하실 수 있습니다.

### 1. 검색어 저장 API
```
POST /api/search/keywords

# 비회원 요청 예시
Request:
{
  "keyword": "맨투맨",
  "ip": "123.456.789.012"  // 동일 IP의 과도한 검색 방지, 지역별 트렌드 분석 가능
}

# 회원 요청 예시
Request:
{
  "keyword": "맨투맨",
  "userId": "user123",
  "userInfo": {
    "age": 28,
    "gender": "female",
    "region": "서울"
  }
}

Response: (200 OK)
{
  "success": true,
  "data": {
    "id": 1,
    "keyword": "맨투맨",
    "createdAt": "2024-10-28T09:00:00.000Z",
    // ... 저장된 데이터
  }
}
```

### 2. 인기 검색어 조회 API
```
GET /api/search/trending

# 기본 조회
GET /api/search/trending

# 필터링 조회 예시 (선택적 구현)
GET /api/search/trending?age=20-30&gender=female&region=서울

Response: (200 OK)
{
  "success": true,
  "data": [
    {
      "keyword": "맨투맨",
      "count": 150,
      "rank": 1,
      "variation": 2  // 옵션: 순위 변동
    },
    {
      "keyword": "청바지",
      "count": 120,
      "rank": 2,
      "variation": -1
    }
    // ... 상위 10개
  ]
}
```
응답 구조나 필드는 구현하는 방향에 따라 자유롭게 변경하실 수 있습니다.
추가적인 기능이나 필드를 구현하셔도 좋습니다.

### 기술 스택
  - NestJS
  - PostgreSQL 또는 MongoDB
  - Prisma (선택 사항)
  - Redis (선택 사항)

### 평가 기준

- **코드 구조 (40%)**
  - 코드 가독성
  - 기본적인 에러 처리
  - TypeScript 활용

- **기능 구현 (40%)**
  - API 정상 작동
  - 데이터 저장 및 조회 정확성
  - HTTP 상태 코드 적절성

- **문서화 (20%)**
  - README 작성
  - 코드 주석

### 선택 구현 사항
구현하면 가산점이 있는 항목들입니다:
- API 문서화 (Swagger)
- 테스트 코드
- 성능 최적화
- 데이터 검증


## 패키지 설치 및 설정 예시

### NestJS CLI 설치 (설치되어 있지 않은 경우)
```bash
npm i -g @nestjs/cli
```

### 새 프로젝트 생성
```bash
# NestJS 프로젝트 생성
nest new search-trending-api(프로젝트명 자유롭게 입력)
# 패키지 매니저 선택 화면에서 npm 선택
```

### Prisma 설정 (선택)
```bash
# Prisma 설치
npm install @prisma/client prisma --save-dev

# Prisma 초기화
npx prisma init
```

schema.prisma 예시:
```prisma
model SearchKeyword {
  id        Int      @id @default(autoincrement())
  keyword   String
  userId    String
  createdAt DateTime @default(now())

  @@index([createdAt])
  @@index([keyword])
}
```

### Redis 설정 (선택)
```bash
# Redis 클라이언트 설치
npm install ioredis

# Redis 모듈 설치 (NestJS용)
npm install @nestjs/cache-manager cache-manager
```

Redis 연결 예시:
```typescript
// redis.config.ts
import { Redis } from 'ioredis';

export const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

// app.module.ts
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class AppModule {}
```

Redis 사용 예시:
```typescript
// 인기 검색어 저장
await redis.zincrby('trending:keywords', 1, keyword);

// 인기 검색어 조회
const trending = await redis.zrevrange('trending:keywords', 0, 9, 'WITHSCORES');
```

## 환경변수 설정 (.env.example)
```plaintext
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/search_db?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Application
PORT=3000
```

이 설정들은 참고용이며, 다른 방식으로 구현해도 무방합니다.

프로젝트를 본인의 GitHub 저장소에 업로드하여 진행해 주세요.

## 제출 방법

작업이 완료되면 다음 사항을 이메일(kingoxpo@ecfkorea.com)로 전달해 주세요:
- 제목: [이름] 백엔드 개발자 과제 제출
- GitHub 저장소 URL
- 이름
- 연락처


## 필수 제출 사항

1. `README.md` 파일에 다음 내용을 포함해 주세요:
   - 프로젝트 실행 방법
   - API 사용 방법
   - 구현한 기능 목록
   
2. `SUBMISSION.md` 파일에 다음 내용을 포함해 주세요:
   - 구현 방법 설명
   - 어려웠던 점
   - 개선하고 싶은 부분

## 과제 진행 시 유의사항

- 과제 수행 기간: 2차 면접일 전일까지(주말 및 공휴일 무관)
- 앱 실행에 필요한 모든 절차는 README.md에 명시
- 기본적인 기능 구현에 집중해 주세요
- 모든 기능을 완벽하게 구현하지 못하더라도 구현한 내용을 바탕으로 평가합니다
- 과제 진행 중 문의사항은 이메일(kingoxpo@ecfkorea.com)로 연락 주시기 바랍니다

## 참고 사항
- 필요한 라이브러리는 자유롭게 선택하여 사용 가능합니다.
- 데이터베이스 스키마는 자유롭게 설계해도 됩니다.
- 기능 동작에 중점을 두고 평가합니다
- 완성도보다는 문제 해결 과정을 중요하게 봅니다
- 구현하지 못한 부분은 어떻게 구현하고 싶었는지 설명해 주세요
