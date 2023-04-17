const express = require("express");
const { Employee } = require("../models");
const router = express.Router();

// 해당 지점 근로자 등록
router.post("/", async (req, res) => {
  try {
    const searchEmployee = await Employee.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });
    if (searchEmployee === null) {
      const newEmployee = await Employee.create({
        employeeName: req.body.employeeName,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        workDays: req.body.workDays,
        hireDate: req.body.hireDate,
        leaveDate: req.body.leaveDate,
        branchId: req.body.branchId,
      });
      return res.status(201).json(newEmployee);
    } else {
      return res.status(409).json({ message: "Duplicate phoneNumber" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
