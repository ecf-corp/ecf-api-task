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

### 기술 스택
  - NestJS
  - Prisma
  - PostgreSQL 또는 MongoDB
  - TypeScript
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

## 제출 방법
1. 본 과제 템플릿을 본인의 GitHub 저장소로 옮겨 진행해 주세요:

# 1. 과제 템플릿 클론
git clone [과제템플릿주소]

# 2. 본인의 새로운 저장소로 옮기기
cd [프로젝트폴더]
git remote remove origin
git remote add origin [본인의_새로운_저장소_주소]
git push -u origin main
## 필수 제출 사항

2. 다음 사항을 이메일(kingoxpo@ecfkorea.com)로 전달해 주세요:
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

- 대면면접 전일까지 제출해 주세요
- 기본적인 기능 구현에 집중해 주세요
- 모든 기능을 완벽하게 구현하지 못하더라도 구현한 내용을 바탕으로 평가합니다
- 과제 진행 중 문의사항은 이메일(kingoxpo@ecfkorea.com)로 연락 주시기 바랍니다

## 참고 사항
- 필요한 라이브러리는 자유롭게 선택하여 사용 가능합니다.
- 데이터베이스 스키마는 자유롭게 설계해도 됩니다.
- 기능 동작에 중점을 두고 평가합니다
- 완성도보다는 문제 해결 과정을 중요하게 봅니다
- 구현하지 못한 부분은 어떻게 구현하고 싶었는지 설명해 주세요
