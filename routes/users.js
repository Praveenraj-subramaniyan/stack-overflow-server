var express = require("express");
var router = express.Router();
const { GetAllUsers } = require("../Controller/usersController");

router.get("/", async function (req, res, next) {
  try {
    res.json(await GetAllUsers());
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

module.exports = router;