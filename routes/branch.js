const { jwtLoginAuth } = require("../Auth/JWT/jwtLoginAuth");
const { Branch } = require("../models");
const express = require("express");
const router = express.Router();

// 로그인 요청 시 지점 테이블 조회하여 존재 확인
router.post("/", async (req, res) => {
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
