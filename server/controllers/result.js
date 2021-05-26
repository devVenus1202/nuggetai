const resultHelper = require('../helpers/resultHelper');

exports.addResult = async function (req, res) {
  const challenge_id = req.params.challenge_id;
  const pipeline_id = req.params.pipeline_id;
  const user_email = req.params.user_id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const gender = req.body.gender;

  const challenge_result = await resultHelper.addResult(pipeline_id, user_email, {
    challenge_id,
    firstname,
    lastname,
    email,
    gender,
  });

  if (challenge_result) {
    res.status(200).json({
      success: true,
      challengeResult: challenge_result
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'add result failed',
    });
  }
}