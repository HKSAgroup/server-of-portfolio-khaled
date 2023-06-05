const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  console.log("generateToken => userInfo", userInfo);
  const payload = {
    id: userInfo?._id,
    number: userInfo?.phoneNumber
  };
  // console.log('payload', payload)
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = generateToken;