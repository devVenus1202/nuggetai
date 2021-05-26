const _ = require('lodash');
const Pipeline = require('../models/pipeline');
const Challenge = require('../models/challenge');
const Result = require('../models/challengeResult');
const deleteResult = require('./challengeHelper').deleteResult;
const uuidv1 = require('uuid/v1');

exports.removePipeline = async function(challenge_id, pipeline_id) {
  Challenge.findOne({ _id: challenge_id }, async function(err, challenge) {
    if (err) throw err;
    if (challenge) {
      challenge.pipelines.remove(pipeline_id);
      await challenge.save();
    }
  });

  Pipeline.findOne(
    {
      _id: pipeline_id,
    },
    function(err, data) {
      if (err) {
        return err;
      } else if (data) {
        data.users.map((user, key) => {
          if (user.result_id !== undefined) {
            deleteResult(user.result_id);
          }
        });
      }
    },
  );

  return await Pipeline.deleteOne({ _id: pipeline_id });
};

exports.getPipeline = async function(pipeline_id) {
  const pipeline = await Pipeline.findOne({ _id: pipeline_id });
  return pipeline;
};

exports.createPipeline = async function({
  challenge_id,
  title,
  pipeline_desc,
  benchmark,
  color,
}) {
  const pipeline = new Pipeline({
    challenge_id,
    title,
    pipeline_desc,
    benchmark,
    status: 'active',
    color,
  });
  const result = await pipeline.save();
  return result;
};

exports.updatePipeline = async function(
  pipeline_id,
  { title, pipeline_desc, benchmark, status, color },
) {
  let updateData = {};
  if (title) updateData['title'] = title;
  if (pipeline_desc) updateData['pipeline_desc'] = pipeline_desc;
  if (benchmark) updateData['benchmark'] = benchmark;
  if (status) updateData['status'] = status;
  if (color) updateData['color'] = color;

  console.log('UpdateBenchmark');
  if (benchmark) {
    await Pipeline.updateMany(
      { benchmark: true },
      { $set: { benchmark: false } },
    );
  }
  const pipeline = await Pipeline.update({ _id: pipeline_id }, updateData);
  return pipeline;
};

exports.deletePipeline = async function(challenge_id, pipeline_id) {
  return updatePipeline(pipeline_id, { status: 'deleted' });
};

exports.createCandidate = async function(
  pipeline_id,
  { email, firstname, lastname, role },
) {
  const _id = uuidv1();
  const pipeline = await Pipeline.update(
    { _id: pipeline_id },
    {
      $push: {
        users: {
          _id,
          email,
          firstname,
          lastname,
          role,
        },
      },
    },
  );
  if (pipeline.ok) {
    pipeline['cid'] = _id;
  }
  console.log('piplline', pipeline);
  return pipeline;
};

exports.updateCandidate = async function(
  challenge_id,
  pipeline_id,
  user_email,
  {
    firstname,
    lastname,
    roleFunction,
    roleLevel,
    age,
    gender,
    ethnicity,
    marital,
    degree,
    employment,
    advice,
    recommendScore,
    reasonRecommendScore,
    contentScore,
    reasonContentScore,
    feedback,
    emailAddress,
    state,
  },
) {
  const updateData = _.pickBy(
    {
      firstname,
      lastname,
      roleFunction,
      roleLevel,
      age,
      gender,
      ethnicity,
      marital,
      degree,
      employment,
      advice,
      recommendScore,
      reasonRecommendScore,
      contentScore,
      reasonContentScore,
      feedback,
      emailAddress,
      state,
    },
    _.identity,
  );
  const pipeline = await Pipeline.findOne({ _id: pipeline_id });

  let isChangedState = false;
  if (pipeline) {
    pipeline.users.map((user, ind) => {
      if (user.email === user_email) {
        if (pipeline.users[ind].state != updateData.state) {
          isChangedState = true;
        }
        pipeline.users[ind] = { ...pipeline.users[ind], ...updateData };
      }
    });

    pipeline.markModified('users');

    await pipeline.save();

    console.log(isChangedState);
    if (isChangedState) {
      const pipelines = await Pipeline.find({ challenge_id, status: 'active' });
      pipelines.forEach(async p => {
        console.log(pipeline_id);
        if (p._id === pipeline_id) return;
        console.log('**********', p);
        p.users.map((user, ind) => {
          if (user.email === user_email) {
            console.log('other-pipe', user_email);
            p.users[ind] = { ...p.users[ind], state: updateData.state };
          }
        });
        p.markModified('users');
        await p.save();
      });
    }
    return pipeline;
  } else {
    return null;
  }
};

exports.deleteCandidate = async function(pipeline_id, user_email) {
  const pipeline = await Pipeline.findOne({ _id: pipeline_id });

  if (pipeline) {
    pipeline.users = pipeline.users.filter(user => user.email != user_email);

    await pipeline.save();

    return pipeline;
  } else {
    return null;
  }
};

// exports.getCandidate = async function(pipeline_id, user_email) {
//   const pipeline = await Pipeline.findOne({ _id: pipeline_id });
//   if (pipeline) {
//     return pipeline.users.find(user => user.email === user_email);
//   }
//   else { return null; }
// }

exports.getCandidate = async function(pipeline_id, user_email) {
  const pipeline = await Pipeline.findOne({ _id: pipeline_id });
  if (pipeline) {
    const candidate = pipeline.users.find(user => user.email === user_email);
    if (candidate !== undefined) {
      const result = await Result.findOne({ _id: candidate.result_id })
        .populate('event_id')
        .exec();

      return {
        ...candidate,
        result,
      };
    }
  } else {
    return null;
  }
};

exports.validateCandidate = async function(pipeline_id, user_email) {
  const pipeline = await Pipeline.findOne({ _id: pipeline_id });
  if (pipeline) {
    const candidate = pipeline.users.find(user => user.email === user_email);
    if (candidate !== undefined) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

exports.addResultToCandidate = async function(
  pipeline_id,
  user_email,
  result_id,
) {
  let pipeline = await Pipeline.findOne({ _id: pipeline_id });

  pipeline.users.map((user, ind) => {
    if (user.email === user_email) {
      let newUser = pipeline.users[ind];
      newUser['result_id'] = result_id;
      pipeline.users[ind] = newUser;
    }
  });

  pipeline.markModified('users');
  await pipeline.save();
};
