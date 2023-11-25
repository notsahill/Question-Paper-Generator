const mongoose = require("mongoose");

const Question = mongoose.model("Question", {
  question: String,
  subject: String,
  topic: String,
  difficulty: String,
  marks: Number,
});

module.exports = Question;
