# 근태 관리 시스템 프로젝트

## 개발 목적

- React, Node.js, JWT, TypeORM(Sequelize), Express, MySQL 숙련도 향상을 목적

## 사용 기술

- React, Node.js, JWT, TypeORM(Sequelize), Express, MySQL

### 작업 내역

- 작업일자 : 2023.04.13
- 작업자 : doitKim
- 작업 내용 :

1. 근태 조회 및 등록 기능 구현
   (달력 형식으로 모달창을 띄워 시도했지만 이중 모달은 구현이 힘들고 디자인도 안좋아서 테이블 형식으로 디자인을 하게 됨)

---

- 작업일자 : 2023.04.12
- 작업자 : doitKim
- 작업 내용 :

1. 근로자 등록 기능 구현 및 데이터베이스 컬럼명 수정

---

- 작업일자 : 2023.04.12
- 작업자 : doitKim
- 작업 내용 :

[추후 직원 등록 및 삭제에서 테스트 필요]

1. 해당 지점 삭제 시 지점에 포함된 직원 정보 삭제 목적으로 cascade 옵션 적용
2. 직원들의 근무스케쥴 테이블 또한 적용
3. JWT 복호화 및 지점별 해당 근로자 조회 구현

---

- 작업일자 : 2023.04.11
- 작업자 : doitKim
- 작업 내용 :

1. Express, Sequelize, Sequelize-cli (개발환경) 설치

2. npx sequelize-cli init
   (시퀄라이즈를 이용한 데이터베이스 환경 설정)

3. testDB 생성 및 config 설정

4. Branch(지점) 테이블 설정

5. localhost로 테스트 시 CORS 에러 발생으로 CORS 설정

6. 로그인 성공 시 JWT 토큰 생성 (만료일 1시간) 및 프론트에 전달

7. 디렉토리 정리
