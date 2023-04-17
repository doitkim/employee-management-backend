const { WorkSchedule } = require("../models");
const express = require("express");
const router = express.Router();

// 해당 지점 근로자 근태 등록
router.post("/", async (req, res) => {
  try {
    const { workerName, phoneNumber, startTime, endTime } = req.body;
    const newWorkSchedule = await WorkSchedule.create({
      employeeName: workerName,
      phoneNumber,
      workStartTime: startTime,
      workEndTime: endTime,
    });
    return res.status(201).json(newWorkSchedule);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
