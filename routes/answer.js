var express = require("express");
var router = express.Router();
const { AuthorizeUser } = require("../Controller/loginController");
const { PostAnswer } = require("../Controller/answerController");

// router.get("/", async function (req, res, next) {
//   try {
//    res.json(await GetAllQuestion());
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server Busy");
//   }
// });

router.post("/new/:id", async function (req, res, next) {
  const auth_token = req.headers.authorization.split(" ")[1];
  const { id,noOfAnswers,answerBody } = req.body;
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(400).send("Invalid");
    } else {
      res.json(await  PostAnswer(id,noOfAnswers,answerBody,loginCredentials.email,loginCredentials.name));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

module.exports = router;
