const express = require("express");
const { Employee, WorkSchedule } = require("../models");
const router = express.Router();

// 해당 지점 근로자 삭제 및 근무 시간 삭제
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await WorkSchedule.destroy({
      where: { employeeId: req.body.employeeId },
    }).then(
      await Employee.destroy({
        where: { employeeId: req.body.employeeId },
      })
    );
    return res.status(200).json({ message: "employee deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "not found employee" });
  }
});

module.exports = router;
