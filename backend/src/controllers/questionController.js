const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

// @desc  Get all questions
// @route GET /api/questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).populate('author', ['name', 'avatar']);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc  Create a question
// @route POST /api/questions
const createQuestion = async (req, res) => {
  try {
    const { title, content, tags, author } = req.body;
    const question = new Question({ title, content, tags, author });
    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc  Get question by ID
// @route GET /api/questions/:id
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', ['name', 'avatar'])
      .populate({
        path: 'answers',
        populate: {
          path: 'author',
          select: ['name', 'avatar']
        }
      });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getQuestions, createQuestion, getQuestionById };
