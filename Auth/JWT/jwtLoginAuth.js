const jwt = require("jsonwebtoken");
const secretKey = "manager";

function jwtLoginAuth(branchId) {
  const payload = {
    branchCode: branchId,
    role: "admin",
  };

  const options = {
    expiresIn: "1h", // 만료 기간
  };

  return jwt.sign(payload, secretKey, options);
}

module.exports = jwtLoginAuth;
