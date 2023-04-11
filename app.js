const express = require("express"); // Express 라이브러리 사용
const { sequelize, Branch } = require("./models"); // DB 모델 및 sequelize 사용
const cors = require("cors"); // CORS 문제 해결 위해 사용
const jwtLoginAuth = require("./Auth/JWT/jwtLoginAuth");

// jwt 라이브러리 사용 인증 폴더로 추후 이동
// const jwt = require("jsonwebtoken");
// const secretKey = "manager";

const app = express(); // 익스프레스 사용
const port = 8000; // 포트 사용

// 모든 출처에서 오는 요청을 신뢰하도록 설정
let corsOptions = {
  origin: "*",
  Credential: true,
};

// CORS 설정
app.use(cors(corsOptions));

// 익스프레스에서 JSON 사용
app.use(express.json());

// 로그인 요청 시 지점 테이블 조회하여 존재 확인
app.post("/branchs", async (req, res) => {
  try {
    console.log(req.body);
    const result = await Branch.findOne({
      where: {
        branchCode: req.body.branchId,
      },
    });

    // 지점 정보가 없을 때 실행
    if (!result) {
      return res.status(404).json({ message: "Branch Not Found" });
    }

    // 지점 정보와 인증코드가 일치 시 실행
    if (req.body.authNumber === result.dataValues.authenticationCode) {
      // const payload = {
      //   branchCode: req.body.branchId,
      //   role: "admin",
      // };

      // const options = {
      //   expiresIn: "1h", // 만료 기간
      // };

      // const token = jwt.sign(payload, secretKey, options);
      // return res.status(200).json(token);
      const token = jwtLoginAuth(req.body.branchId);
      return res.status(200).json(token);
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log("로그인 실패");
  }
});

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
