const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion, getQuestionById } = require('../controllers/questionController');

router.route('/').get(getQuestions).post(createQuestion);
router.route('/:id').get(getQuestionById);

module.exports = router;
