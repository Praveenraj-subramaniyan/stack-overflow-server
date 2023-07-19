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
    await newQuestionDB.save();
    return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function GetAllQuestion() {
  try {
    const questionList = await Questions.find().lean().sort({ askedOn: -1 });
    return questionList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function DeleteQuestion(id, email) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Invalid";
    }
    const question = await Questions.findOne({ _id: id });
    if (question.userEmail === email) {
      console.log(question.userEmail)
      await Questions.deleteOne({ _id: id });
      return true;
    }
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}
module.exports = { AskQuestion, GetAllQuestion, DeleteQuestion };
