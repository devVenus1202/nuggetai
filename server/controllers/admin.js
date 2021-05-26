const User = require('../models/user');
const Challenge = require('../models/challenge');
const Pipeline = require('../models/pipeline');
const ChallengeResult = require('../models/challengeResult');
const Event = require('../models/event');
const adminHelper = require('../helpers/adminHelper');
const eventHelper = require('../helpers/eventHelper');

exports.getAllUsers = async function(req, res) {
  const users = await adminHelper.getAllUsers();
  if (users) {
    res.status(200).json({
      success: true,
      users,
      msg: 'request success',
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'request failed',
    });
  }
};

exports.getUserChallenges = async function(req, res) {
  const user_id = req.params.user_id;

  if (user_id) {
    const userInfo = await User.findOne({ _id: user_id })
      .populate({
        path: 'challenges',
        model: Challenge,
        select: {
          role: 0,
          position: 0,
          position: 0,
          cards: 0,
          keywords: 0,
          image: 0,
          timer: 0,
        },
      })
      .exec();

    const result = userInfo.challenges.filter(
      challenge => challenge.status === 'active',
    );
    res.status(200).json({
      success: true,
      challenges: result,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'request failed',
    });
  }
};

exports.getPipelines = async function(req, res) {
  const challenge_id = req.params.challenge_id;

  if (challenge_id) {
    const data = await Challenge.findOne({ _id: challenge_id })
      .populate({
        path: 'pipelines',
        model: Pipeline,
      })
      .exec();

      const result = await Promise.all(data.pipelines.map(async pipeline => {
      if (pipeline.status === 'active') {
        const userResult = await Promise.all(pipeline.users.map(async user => {
          if (user['result_id']) {

            const eventResult = await ChallengeResult.findOne({
              _id: user.result_id,
            })
              .populate({
                path: 'event_id',
                model: Event,
              })
              .exec();
            if (Object.keys(eventResult).length && eventResult.event_id) {
              user.result_id = eventResult;
              return user;
            }
          }
        }));

        userResult.filter(user => user !== null );
        pipeline.users = userResult;
        return pipeline;
      }
    }));
    res.status(200).json({
      success: true,
      pipelines: result,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'request failed',
    });
  }
};

exports.getWastonCSV = async function(req, res) {
  const event_id = req.params.event_id;
  const waston_type = req.params.waston_type;

  const result = await eventHelper.getWastonCSV(event_id, waston_type);

  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'request failed',
    });
  }
};
