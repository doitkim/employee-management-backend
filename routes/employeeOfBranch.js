// 해당 지점 근로자 전체 조회
const express = require("express");
const { Employee } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
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

module.exports = router;
