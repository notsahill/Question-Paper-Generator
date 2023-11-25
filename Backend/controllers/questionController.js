const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

const addQuestion = asyncHandler(async (req, res) => {
  const { question, subject, topic, difficulty, marks } = req.body;
  const newQuestion = await Question.create({
    question,
    subject,
    topic,
    difficulty,
    marks,
  });
  res.status(201).json(newQuestion);
});

module.exports = { getAllQuestions, addQuestion };
