const Answer = require('../models/Answer');
const Question = require('../models/Question');

// @desc  Create an answer
// @route POST /api/answers
const createAnswer = async (req, res) => {
  try {
    const { content, question, author } = req.body;
    const answer = new Answer({ content, question, author });
    const createdAnswer = await answer.save();
    
    // Add answer to question
    await Question.findByIdAndUpdate(question, {
      $push: { answers: createdAnswer._id }
    });
    
    res.status(201).json(createdAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc  Vote on an answer
// @route PATCH /api/answers/:id/vote
const voteAnswer = async (req, res) => {
  try {
    const { type } = req.body; // 'up' or 'down'
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    
    if (type === 'up') answer.upvotes += 1;
    else if (type === 'down') answer.downvotes += 1;
    
    await answer.save();
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createAnswer, voteAnswer };
