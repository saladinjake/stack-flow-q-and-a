const express = require('express');
const router = express.Router();
const { createAnswer, voteAnswer } = require('../controllers/answerController');

router.route('/').post(createAnswer);
router.route('/:id/vote').patch(voteAnswer);

module.exports = router;
