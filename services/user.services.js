const User = require("../Models/UserModel");

module.exports.getAllUserService = async (data) => {
    return await User.find({});
};