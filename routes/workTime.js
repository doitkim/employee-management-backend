const { WorkSchedule } = require("../models");
const express = require("express");
const router = express.Router();

// 해당 지점의 근로자 중 한명을 조회해서 근태 정보 확인
router.post("/", async (req, res) => {
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

module.exports = router;
