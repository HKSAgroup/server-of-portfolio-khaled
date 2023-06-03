const User = require("../Models/UserModel");

module.exports.getAdminService = async (id) => {
    return await User.findById(id);
};

module.exports.getAllUserService = async (data) => {
    return await User.find({});
};

module.exports.findAUserWithPhoneNumber = async (phoneNumber) => {
    return await User.findOne({ phoneNumber });
};

module.exports.makeUserAdminService = async (id) => {
    return User.updateOne({ _id: id }, { $set: { role: "super-admin" } });
  };