const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PipelineSchema = new Schema(
  {
    challenge_id: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
    },
    title: {
      type: String,
      required: true,
    },
    pipeline_desc: {
      type: String,
    },
    benchmark: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Pipeline', PipelineSchema);
