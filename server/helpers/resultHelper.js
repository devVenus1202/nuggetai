const Event = require('../models/event');
const ChallengeResult = require('../models/challengeResult');
const pipelineHelper = require('../helpers/pipelineHelper');

exports.addResult = async function(pipeline_id, user_email, { challenge_id, firstname, lastname, email, gender }) {
  const event = new Event({ challenge_id: challenge_id });
  await event.save();

  const result = new ChallengeResult({
    challenge_id,
    firstname,
    lastname,
    email,
    gender,
    event_id: event._id,
  });

  await result.save();
  
  await pipelineHelper.addResultToCandidate(pipeline_id, user_email, result._id);

  return result;
}

