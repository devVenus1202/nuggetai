const helper = require('../helpers/challengeHelper');
const userHelper = require('../helpers/userHelper');
const challenge = require('../models/challenge');
const pipelineHelper = require('../helpers/pipelineHelper');

exports.getAllChallenges = async function(req, res) {
  const userInfo = await req.user
    .populate({ path: 'challenges', model: challenge })
    .execPopulate();

  const result = userInfo.challenges.filter(
    challenge => challenge.status === 'active',
  );
  res.status(200).json({
    success: true,
    challenges: result,
  });
};

exports.deleteAllChallenges = function(req, res) {
  const user = req.user;

  const result = userHelper.deleteUserChallenges(user._id);

  if (result === 'success') {
    res.status(200).json({
      success: true,
      challenges: userInfo.challenges,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'delete failed',
    });
  }
};

exports.createChallenge = async function(req, res) {
  const user = req.user;
  const role = req.body.role;
  const position = req.body.position;
  const test_name = req.body.test_name;
  const test_desc = req.body.test_desc;
  const cards = JSON.parse(req.body.cards);
  const keywords = JSON.parse(req.body.keywords);
  const timer = Number(req.body.timer);
  const userId = user._id;
  const functions =
    req.body.functions && req.body.functions !== 'undefined'
      ? JSON.parse(req.body.functions)
      : {};
  const sponsored = req.body.sponsored;

  let image;
  if (req.body.image) {
    image = req.body.image;
  } else if (req.files.image) {
    image = `resources/${req.files.image[0].filename}`;
  } else {
    image = null;
  }

  const challenge = await helper.addChallenge({
    role,
    position,
    test_name,
    test_desc,
    cards,
    keywords,
    image,
    timer,
    user: userId,
    functions,
    sponsored,
  });

  if (challenge) {
    await userHelper.addChallengeRef(user._id, challenge._id);

    res.status(200).json({
      success: true,
      challenge: challenge,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'create challenge failed',
    });
  }
};

exports.getChallenge = async function(req, res) {
  const challenge_id = req.params.challenge_id;

  const challenge = await helper.getChallenge(challenge_id);
  if (challenge) {
    res.status(200).json({
      success: true,
      challenge: challenge,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'challenge doesnt exist',
    });
  }
};

exports.deleteChallenge = async function(req, res) {
  const challenge_id = req.params.challenge_id;

  const challenge = await helper.deleteChallenge(challenge_id);
  if (challenge) {
    res.status(200).json({
      success: true,
      msg: 'challenge deleted successfully',
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'delete challenge failed',
    });
  }
};

exports.updateChallenge = async function(req, res) {
  const user = req.user;
  const challenge_id = req.params.challenge_id;
  const role = req.body.role;
  const position = req.body.position;
  const test_name = req.body.test_name;
  const test_desc = req.body.test_desc;
  const cards = req.body.cards;
  const keywords = req.body.keywords;
  const image = req.body.image;
  const timer = req.body.timer;
  const functions = req.body.functions;
  const sponsored = req.body.sponsored;

  const challenge = await helper.updateChallenge(challenge_id, {
    role,
    position,
    test_name,
    test_desc,
    cards,
    keywords,
    image,
    timer,
    functions,
    sponsored,
  });

  if (challenge) {
    res.status(200).json({
      success: true,
      msg: 'updated successfully',
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'update challenge failed',
    });
  }
};

exports.getWastonKeywords = async (req, res) => {
  const { text } = req.body;

  const keywords = await helper.getWastonKeywords(text);

  if (keywords) {
    res.status(200).json({
      success: true,
      keywords,
    });
  } else {
    res.status(500).json({
      success: false,
      msg: 'getting keywords failed',
    });
  }
};

exports.getAllSandboxChallenges = async function(req, res) {
  const result = await challenge.find({ status: 'active' });

  res.status(200).json({
    success: true,
    challenges: result,
  });
};
