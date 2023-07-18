const mongoose = require("mongoose");
const Questions = require("../Models/Questions");

async function AskQuestion(newQuestion, email, name) {
  try {
    const newQuestionDB = new Questions({
      questionTitle: newQuestion.questionTitle,
      questionBody: newQuestion.questionBody,
      questionTags: newQuestion.questionTags.split(" "),
      userEmail: email,
      userPosted: name,
    });
    console.log(newQuestionDB)
    await newQuestionDB.save();
    return true;
  } catch (error) {
    console.log(error)
    return "Server Busy";
  }
}

async function GetAllQuestion() {
  try {
    const questionList = await Questions.find().lean();
    // console.log("questionList",questionList)
    return questionList;
  } catch (error) {
    console.log(error)
    return "Server Busy";
  }
}

module.exports = { AskQuestion, GetAllQuestion };
