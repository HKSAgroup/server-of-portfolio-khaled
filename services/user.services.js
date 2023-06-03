const User = require("../Models/UserModel");

module.exports.getAllUserService = async (data) => {
    return await User.find({});
};

module.exports.findAUserWithPhoneNumber = async (phoneNumber) => {
    return await User.findOne({ phoneNumber });
  };