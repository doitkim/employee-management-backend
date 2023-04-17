const express = require("express"); // Express 라이브러리 사용
const { sequelize } = require("./models"); //sequelize 사용
const cors = require("cors"); // CORS 문제 해결 위해 사용
const branch = require("./routes/branch"); // branch 라우팅
const auth = require("./routes/auth"); // auth 라우팅
const worker = require("./routes/employeeOfBranch"); // worker 라우팅
const workerRegister = require("./routes/workerRegister"); // workerRegit 라우팅
const workTimeRegit = require("./routes//workTimeRegit"); // workTimeRegit 라우팅
const workTime = require("./routes/workTime"); // workTime 라우팅

const app = express(); // 익스프레스 사용
const port = 8000; // 포트 사용

// 모든 출처에서 오는 요청을 신뢰하도록 설정
let corsOptions = {
  origin: "*",
  credentials: true,
};

// CORS 설정
app.use(cors(corsOptions));

// 익스프레스에서 JSON 사용
app.use(express.json());

// Routes 폴더 만들어서 코드 분할
app.use("/branchs", branch); // 로그인 요청 시 지점 테이블 조회하여 존재 확인
app.use("/auth", auth); // 지점 로그인 성공 시 JWT 토큰 복호화 하여 지점명과 지점아이디 획득
app.use("/worker", worker); // 해당 지점 근로자 전체 조회
app.use("/workerRegister", workerRegister); // 해당 지점 근로자 등록
app.use("/worktimeregit", workTimeRegit); // 해당 지점 근로자 근태 등록
app.use("/worktime", workTime); // 해당 지점 근로자 근태 정보 확인

// DB 연결 성공 로그 표출
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("API DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
