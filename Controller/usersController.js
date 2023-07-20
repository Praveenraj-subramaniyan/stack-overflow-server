const mongoose = require("mongoose");
const User = require("../Models/User");

async function GetAllUsers() {
  try {
    const userList = await User.find().lean();
    return userList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

module.exports = { GetAllUsers };
