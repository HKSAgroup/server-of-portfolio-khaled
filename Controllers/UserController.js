const User = require("../Models/UserModel");
const userService = require("../services/user.services")
const { json } = require("express");
const { ObjectId } = require("mongodb");
// const { routes } = require("../app");
const _ = require("lodash");
const otpGenerator = require("otp-generator");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const Otp = require("../Models/OTPModel");
// const generateToken = require("../Utils/generateToken");
require("dotenv").config();


module.exports.getAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await userService.getAdminService(id);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "successfully getting an Admin",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Couldn't get an Admin",
            error: error.message,
        });
    }
}

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

module.exports.deleteAUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteAUserByIDService(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't find this user to delete",
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "successfully deleted this user",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't delete this user",
      error: err.message,
    });
  }
};

module.exports.registerUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            phoneNumber: req.body.phoneNumber,
        });
        if (user) {
            return res
                .status(400)
                .json({ status: "failed", code: 400, message: "User already exists!" });
        }
        // it generates 6 digits of otp code randomly
        const OTP = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const number = req.body.phoneNumber;
        const message = `Dear User Your OTP is: ${OTP}`;
        if (number && message) {
            const url = `https://mimsms.com.bd/smsAPI?sendsms&apikey=${process.env.MIM_API_KEY}&apitoken=${process.env.MIM_API_TOKEN}&type=sms&from=${process.env.MIM_SENDER_ID}&to=${number}&text=${message}`;
            try {
                const response = await axios({
                    method: 'post',
                    url,
                    timeout: 6000, // Timeout after 6 seconds
                });
                if (response.status === 200) {
                    // otp send successfully. Please try to do some work here..
                    const otp = new Otp({ phoneNumber: req.body.phoneNumber, otp: OTP });
                    const salt = await bcrypt.genSalt(10);
                    otp.otp = await bcrypt.hash(otp.otp, salt);
                    const result = await otp.save();
                    res.status(200).json({
                        status: "success",
                        code: 200,
                        message: "Otp send successfully!",
                        data: result,
                    });
                }
            } catch (error) {
                // otp failed work here..
                res.status(400).json({
                    status: "error",
                    code: 400,
                    message: "OTP didn't send successfully!, Try again",
                    error: error.message,
                });
            }
        }
        else {
            res.status(400).json({
                status: "error",
                code: 400,
                message: "Didn't worked",
                error: error.message,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Couldn't register user",
            err: error.message,
        });
    }
};

module.exports.getAUserByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log('id', id)
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                message: "This id is not valid",
            });
        }
        const result = await userService.getAUserByIDService(id);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Successfully getting this user",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Couldn't get this user",
            error: error.message,
        });
    }
};


/**
 *1. Check if email & password are given
 *2. Load user with email
 *3. if not user, send res
 *4. compare password,
 *5. if password not correct, send res
 *6. check if user is active
 *7. if not active send res
 *8. if account is inactive , then active again, and then give entrance to our site
 *8. generate token
 *9. send user and token
 */
module.exports.login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res.status(401).json({
                status: "failed",
                code: 401,
                error: "Please provide your number & password",
            });
        }

        // checking if user is already in our db, or not?
        const userExists = await userService.findAUserWithPhoneNumber(phoneNumber);
        // console.log('userExists', userExists)
        if (!userExists) {
            return res.status(401).json({
                status: "failed",
                code: 401,
                error: "No user found. Please create an account",
            });
        }

        const isPasswordMatched = userExists.comparePassword(
            password,
            userExists.password
        );
        console.log('isPasswordMatched', isPasswordMatched)

        if (!isPasswordMatched) {
            return res.status(403).json({
                status: "failed",
                code: 403,
                error: "Password is not correct",
            });
        }

        if (userExists.status === "blocked") {
            return res.status(401).json({
                status: "failed",
                code: 401,
                error: "Your'e account is blocked",
            });
        }

        // logout user will automatically inactive, when user again logged in , we have to make them again active.
        if (userExists.status === "inactive") {
            return await User.updateOne(
                { _id: userExists?._id },
                { $set: { status: "active" } }
            );
        }

        const token = generateToken(userExists);
        const { password: pwd, ...others } = userExists.toObject();

        res.status(200).json({
            status: "success",
            code: 200,
            message: "successfully logged in",
            data: { user: others, token },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Couldn't login",
            error: err.message,
        });
    }
};

module.exports.makeUserAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                message: "Id is not valid",
            });
        }
        const result = await userService.makeUserAdminService(id);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Successfully make this user an SUPER-ADMIN",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Couldn't make an Admin",
            error: error.message,
        });
    }
};

// change password
module.exports.changePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                message: "Couldn't find this id",
            });
        }
        // checking if user is already in our db, or not?
        const userExists = await User.findById({ _id: id });
        // console.log('userExists', userExists)
        if (!userExists) {
            return res.status(401).json({
                status: "failed",
                code: 401,
                error: "No user found. Please create an account",
            });
        }
        const isPasswordMatched = userExists.comparePassword(
            data.oldPassword,
            userExists.password
        );
        // console.log(isPasswordMatched)
        if (!isPasswordMatched) {
            return res.status(403).json({
                status: "failed",
                code: 403,
                error: "Password is not correct",
            });
        }
        const result = await userService.changePasswordService(id, data);
        if (result.modifiedCount > 0) {
            res.status(200).json({
                status: "success",
                code: 200,
                message: "Successfully updated your password",
                data: result,
            });
        } else {
            res.status(400).json({
                status: "failed",
                code: 400,
                message: "Couldn't update your password",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Couldn't update your password",
            error: error.message,
        });
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
        // const result = await userService.registerUserService(req.body);
        // const token = generateToken(result);
        const otpHolder = await Otp.find({
            phoneNumber: req.body.phoneNumber,
        });
        if (otpHolder.length === 0) {
            return res.status(400).json({
                status: "failed",
                code: 400,
                message: "Your'e using an Expired OTP!",
            });
        }

        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        console.log("validUser", validUser);

        if (rightOtpFind.phoneNumber === req.body.phoneNumber && validUser) {
            // console.log("render");

            const salt = await bcrypt.genSalt(10);

            const password = await bcrypt.hash(req.body.password, salt);

            // console.log("password", password);

            const user = new User(_.pick(req.body, ["phoneNumber", "password"]));
            // console.log("user", user);
            const token = generateToken(user);
            const result = await user.save();
            const OTPDelete = await Otp.deleteMany({
                number: rightOtpFind.number,
            });
            return res.status(200).send({
                status: "success",
                code: 200,
                message: "User Registration Successful!",
                data: { result, token },
            });
        } else {
            return res.status(400).send("Your OTP was wrong!");
        }
    } catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                code: 400,
                message: "OTP Didn't verified",
                error: error.message,
            });
    }
};


module.exports.UpdateProfileById = async (req, res, next) => {
    try {
      // console.log('files', req.files)
      // console.log('body', req.body)
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "Id is not valid",
        });
      }
      const result = await userService.UpdateProfileByIdService(
        id,
        req.body,
        req.files
      );
      if (result.modifiedCount > 0) {
        res.status(200).json({
          status: "success",
          code: 200,
          message: "successfully update profile",
          data: result,
        });
      } else {
        res.status(400).json({
          status: "failed",
          code: 400,
          message: "Couldn't update profile",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't update profile",
        error: error.message,
      });
    }
  };

  module.exports.userLogOut = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          status: "failed",
          code: 400,
          message: "This id is not valid",
        });
      }
      const result = await userService.userLogOutService(id);
      // console.log("result", result);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Successfully logout",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't logout",
        error: error.message,
      });
    }
  };