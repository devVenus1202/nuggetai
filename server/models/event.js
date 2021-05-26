const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  challenge_id: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge'
  },
  events: {
    type: Object,
    default: {},
  }
},
{
  timestamps: true
});


module.exports = mongoose.model('Event', EventSchema);
