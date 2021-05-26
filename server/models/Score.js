const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  rank: {
    type: Number,
  },
  boxplot: {
    std_dev: Number,
    range: Number,
    user_score: Number,
    benchmark_score: Number,
    average_score: Number,
  },
  events: {
    type: Array,
    default: [],
  },
  graph: {
    radius: Number,
    xcoordinate: Number,
    ycoordinate: Number,
  },
},
{
  timestamps: true
});


module.exports = mongoose.model('Score', ScoreSchema);
