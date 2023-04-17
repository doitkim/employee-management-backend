const express = require("express");
const { jwtDecoder } = require("../Auth/JWT/jwtLoginAuth");
const router = express.Router();

// 프론트에서 토큰 받고 복호화 시켜서 지점명 돌려주기
router.post("/", async (req, res) => {
  try {
    const token = req.body.token;
    const decode = jwtDecoder(token);
    return res.status(200).json(decode);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

module.exports = router;
