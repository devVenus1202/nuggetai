const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  role: {
    type: String,
  },
  position: {
    type: String,
  },
  test_name: {
    type: String,
    required: true,
  },
  test_desc: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    default: [],
  },
  keywords: {
    type: Array,
    default: [],
  },
  card_keywords: {
    type: Array,
    default: [],
  },  
  image: {
    type: String,
  },
  timer: {
    type: Number,
  },
  status: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  pipelines: [{
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  }],
  functions: {
    type: Array,
    default: [],
  },
  sponsored: {
    type: String,
  },
},
{
  timestamps: true
});


module.exports = mongoose.model('Challenge', ChallengeSchema);
