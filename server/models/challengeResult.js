const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeResultSchema = new Schema({
  challenge_id: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge'
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  score_id: {
    type: Schema.Types.ObjectId,
    ref: 'Score'
  }
},
{
  timestamps: true
});


module.exports = mongoose.model('ChallengeResult', ChallengeResultSchema);

