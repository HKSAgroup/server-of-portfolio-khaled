const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const dotenv = require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    /**
     * 1. check if token exists
     * 2. if not token send res
     * 3. decode the token
     * 4. if valid call next()
     */
    // console.log('req', req.headers?.authorization?.split(" ")?.[1])

    // const token = JSON.parse(req.headers?.authorization?.split(" ")?.[1]) || req.headers?.authorization?.split(" ")?.[1]
    const token = req.headers?.authorization?.split(" ")?.[1];
    // console.log('token', token)
    if (!token) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        message: "Please login first",
        error: "Your'e not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // ekhane localStorage theke j data pabo, data update hoileu, sei localStorage token tw r update hobena. ei jonne sei token theke id ta nibo, sei id diye db theke user find kore, update data ta req.user=UpdateData eihisabe pathai dibo

    // const id = decoded?.id;
    // console.log('id', id)
    // console.log("decoded", decoded);
    // console.log("findUser", User.findById({id}));
    async function getUserById(id) {
      try {
        const updateUser = await User.findById(id);
        return updateUser;
      } catch (err) {
        console.error(err);
      }
    }

    const id = decoded?.id;

    const updateUser = await getUserById(id);
    // console.log(updateUser);

    req.user = updateUser;
    next();
  } catch (err) {
    res.status(403).json({
      status: "failed",
      code: 403,
      message: "Your token is expired, Please login again",
      error: "Invalid token",
    });
  }
};