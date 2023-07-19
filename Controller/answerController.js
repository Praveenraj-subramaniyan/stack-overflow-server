const mongoose = require("mongoose");
const Questions = require("../Models/Questions");

async function PostAnswer(
  _id,
  noOfAnswers,
  answerBody,
  userEmail,
  userAnswered
) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return "Invalid";
  }
  try {
    updateNoOfQuestions(_id, noOfAnswers);
    await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userEmail }] },
    });
    return true;
  } catch (error) {
    return "Server Busy";
  }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { PostAnswer };
