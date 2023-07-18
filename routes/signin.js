const express = require("express");
var router = express.Router();
const { CheckUser } = require("../Controller/loginController");
const {
  InsertSignUpUser,
  InsertVerifyUser,
} = require("../Controller/signinController");

router.get("/:token", async (req, res) => {
  try {
    const response = await InsertSignUpUser(req.params.token);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(`<html>
    <head>
      <title>Registration Failed</title>
    </head>
    <body>
      <h1>Registration Failed</h1>
      <p>Link Expired...</p>
    </body>
  </html>`);
  }
});

router.post("/verify", async (req, res) => {
  console.log("/verify");
  try {
    const { name, email, password } = await req.body;
    var registerCredentials = await CheckUser(email);
    if (registerCredentials === false) {
      await InsertVerifyUser(name, email, password);
      res.status(200).send(true);
    } else if (registerCredentials === true) {
      res.status(400).send(false);
    }
  } catch (error) {
    console.log("catch");
    console.log(error);
    res.status(500).send("error");
  }
});

module.exports = router;
