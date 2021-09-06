const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
