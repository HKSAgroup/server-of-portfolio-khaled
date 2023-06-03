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
                    timeout: 5000, // Timeout after 5 seconds
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
                    message: "OTP didn't send successfully!",
                    error: error,
                });
            }
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