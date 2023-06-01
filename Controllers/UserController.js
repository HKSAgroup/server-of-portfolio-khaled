const userService = require("../services/user.services")

module.exports.getAllUser = async (req, res, next) => {
    try {
      const result = await userService.getAllUserService();
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          code: 200,
          message: `Successfully getting ${result.length} users`,
          data: result,
        });
      } else {
        res.status(200).json({
          status: "success",
          code: 200,
          message: `Successfully getting ${result.length} users`,
          data: [],
        });
      }
  
  
    } catch (err) {
      res.status(400).json({
        status: "failed",
        code: 400,
        code: 400,
        message: "Couldn't get all users",
        err: err.message,
      });
    }
  };