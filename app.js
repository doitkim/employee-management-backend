const express = require("express"); // Express 라이브러리 사용
const { sequelize, Branch, Employee } = require("./models"); // DB 모델 및 sequelize 사용
const cors = require("cors"); // CORS 문제 해결 위해 사용
const { jwtLoginAuth, jwtDecoder } = require("./Auth/JWT/jwtLoginAuth");

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
    const result = await Branch.findOne({
      where: {
        branchId: req.body.branchId,
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
      const token = jwtLoginAuth(
        req.body.branchId,
        result.dataValues.branchName
      );

      return res.status(200).json(token);
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log("로그인 실패");
    console.log(error);
  }
});

// 프론트에서 토큰 받고 복호화 시켜서 지점명 돌려주기 (앱 라우터 기능으로 추후 정리 예정)
app.post("/auth", async (req, res) => {
  try {
    const token = req.body.token;
    const decode = jwtDecoder(token);
    return res.status(200).json(decode);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

// 해당 지점 근로자 전체 조회
app.post("/worker", async (req, res) => {
  console.log(req.body);
  try {
    const result = await Employee.findAll({
      where: {
        branchId: req.body.branchID,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
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
