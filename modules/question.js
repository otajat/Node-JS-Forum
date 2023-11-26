const { Schema , model } = require('mongoose');
const mongoose = require('mongoose');



const questionSchema = mongoose.Schema({
  user: {
      type : Schema.Types.ObjectId,
      required : true,
      ref: 'User'
  },
  question: {
      type : String,
      required : true,
  },
  date: {
      type : Date,
      default : Date.now()
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;