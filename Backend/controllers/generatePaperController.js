const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");

function shuffleObject(obj) {
  // Convert object values into an array
  const valuesArray = Object.values(obj);

  // Fisher-Yates (Knuth) shuffle algorithm
  for (let i = valuesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valuesArray[i], valuesArray[j]] = [valuesArray[j], valuesArray[i]];
  }

  // Reconstruct the object with shuffled values
  const shuffledObject = {};
  Object.keys(obj).forEach((key, index) => {
    shuffledObject[key] = valuesArray[index];
  });

  return shuffledObject;
}


//Main logic used here is to use backtracking to pick some questions from the question bank of the required difficulty so that they there is no chance of repetition
const generatePaper = asyncHandler(async (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;

  if (!totalMarks || !difficultyDistribution) {
    return res.status(400).json({ error: "Invalid request format" });
  }

  const paper = [];

  const easyMarks = totalMarks * (difficultyDistribution.easy / 100);
  const mediumMarks = totalMarks * (difficultyDistribution.medium / 100);
  const hardMarks = totalMarks * (difficultyDistribution.hard / 100);

  const easyQuestions = await Question.find({ difficulty: "Easy" });
  const shuffledEasyQuestions = shuffleObject(easyQuestions); //Shuffling is done to make sure that everytime a unique set of questions is chosen
  const pickedEasyQuestions = [];
  pickRandomQuestions(shuffledEasyQuestions, pickedEasyQuestions, 0, easyMarks);

  const mediumQuestions = await Question.find({ difficulty: "Medium" });
  const shuffledMediumQuestions = shuffleObject(mediumQuestions);
  const pickedMediumQuestions = [];
  pickRandomQuestions(
    shuffledMediumQuestions,
    pickedMediumQuestions,
    0,
    mediumMarks
  );

  const hardQuestions = await Question.find({ difficulty: "Hard" });
  const shuffledHardQuestions = shuffleObject(hardQuestions); 
  const pickedHardQuestions = [];
  pickRandomQuestions(shuffledHardQuestions, pickedHardQuestions, 0, hardMarks);

  paper.push(...pickedEasyQuestions);
  paper.push(...pickedMediumQuestions);
  paper.push(...pickedHardQuestions);

  res.json({ paper });
});

function pickRandomQuestions(questions, picked, currentIndex, marksLimit) {
  if (getCurrentMarks(picked) === marksLimit) {
    return true;
  }
  if (
    currentIndex >= questions.length ||
    getCurrentMarks(picked) > marksLimit
  ) {
    return false;
  }

  const question = questions[currentIndex];

  // Try including question
  picked.push(question);
  if (pickRandomQuestions(questions, picked, currentIndex + 1, marksLimit)) {
    return true;
  }
  // Backtrack
  picked.pop();

  return pickRandomQuestions(questions, picked, currentIndex + 1, marksLimit);
}

function getCurrentMarks(questions) {
  return questions.reduce((sum, q) => sum + q.marks, 0);
}

module.exports = { generatePaper };
