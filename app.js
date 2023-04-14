const express = require("express"); // Express 라이브러리 사용
const { sequelize, Branch, Employee, WorkSchedule } = require("./models"); // DB 모델 및 sequelize 사용
const cors = require("cors"); // CORS 문제 해결 위해 사용
const { jwtLoginAuth, jwtDecoder } = require("./Auth/JWT/jwtLoginAuth");

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

app.post("/workerRegister", async (req, res) => {
  try {
    const searchEmployee = await Employee.findAll({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });
    if (searchEmployee.length === 0) {
      await Employee.create({
        employeeName: req.body.employeeName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        workDays: req.body.workDays,
        hireDate: req.body.hireDate,
        leaveDate: req.body.leaveDate,
        branchId: req.body.branchId,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/worktimeregit", async (req, res) => {
  try {
    await WorkSchedule.create({
      employeeName: req.body.workerName,
      phoneNumber: req.body.phoneNumber,
      workStartTime: req.body.startTime,
      workEndTime: req.body.endTime,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/worktime", async (req, res) => {
  try {
    const result = await WorkSchedule.findAll({
      where: {
        employeeName: req.body.workerName,
        phoneNumber: req.body.workerPhoneNumber,
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
