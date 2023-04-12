const jwt = require("jsonwebtoken");
const secretKey = "manager";

function jwtLoginAuth(branchId, branchName) {
  // console.log(`branchNAme:${branchName}`);
  const payload = {
    branchCode: branchId,
    branchName,
    role: "admin",
  };

  const options = {
    expiresIn: "24h", // 만료 기간
  };

  return jwt.sign(payload, secretKey, options);
}
function jwtDecoder(token) {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
}
module.exports = { jwtLoginAuth, jwtDecoder };
