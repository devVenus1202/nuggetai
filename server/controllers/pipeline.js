const challengeHelper = require('../helpers/challengeHelper');
const userHelper = require('../helpers/userHelper');
const pipelineHelper = require('../helpers/pipelineHelper');

exports.createPipeline = async function(req, res) {
  const challenge_id = req.params.challenge_id;
  const title = req.body.title;
  const pipeline_desc = req.body.pipeline_desc;
  const benchmark = req.body.benchmark;
  const color = req.body.color;

  const pipeline = await pipelineHelper.createPipeline({
    challenge_id,
    title,
    pipeline_desc,
    benchmark,
    color,
  });

  if (pipeline) {
    await challengeHelper.addPipelineRef(challenge_id, pipeline._id);

    res.status(200).json({
      success: true,
      pipeline: pipeline,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'create pipeline failed',
    });
  }
};

exports.getPipeline = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;

  const pipeline = await pipelineHelper.getPipeline(pipeline_id);
  if (pipeline) {
    res.status(200).json({
      success: true,
      pipeline: pipeline,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'pipeline doesnt exist',
    });
  }
};

exports.updatePipeline = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const title = req.body.title;
  const pipeline_desc = req.body.pipeline_desc;
  const benchmark = req.body.benchmark;

  const pipeline = await pipelineHelper.updatePipeline(pipeline_id, {
    title,
    pipeline_desc,
    benchmark,
  });

  if (pipeline) {
    res.status(200).json({
      success: true,
      msg: 'pipeline updated successfully',
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'create pipeline failed',
    });
  }
};

exports.deletePipeline = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const challenge_id = req.params.challenge_id;

  const pipeline = await pipelineHelper.updatePipeline(pipeline_id, {
    status: 'deleted',
  });

  if (pipeline) {
    res.status(200).json({
      success: true,
      pipeline: pipeline,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'pipeline doesnt exist',
    });
  }
};

exports.createCandidate = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const role = req.body.role;

  const pipeline = await pipelineHelper.createCandidate(pipeline_id, {
    email,
    firstname,
    lastname,
    role,
  });

  if (pipeline) {
    res.status(200).json({
      success: true,
      cid: pipeline.cid,
      msg: 'candidate created successfully',
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'candidate create failed',
    });
  }
};

exports.updateCandidate = async function(req, res) {
  const challenge_id = req.params.challenge_id;
  const pipeline_id = req.params.pipeline_id;
  const user_email = req.params.user_id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const roleFunction = req.body.roleFunction;
  const roleLevel = req.body.roleLevel;
  const age = req.body.age;
  const gender = req.body.gender;
  const ethnicity = req.body.ethnicity;
  const marital = req.body.marital;
  const degree = req.body.degree;
  const employment = req.body.employment;
  const advice = req.body.advice;
  const recommendScore = req.body.recommendScore;
  const reasonRecommendScore = req.body.reasonRecommendScore;
  const contentScore = req.body.contentScore;
  const reasonContentScore = req.body.reasonContentScore;
  const feedback = req.body.feedback;
  const emailAddress = req.body.emailAddress;
  const state = req.body.state;

  console.log('state', state);
  const pipeline = await pipelineHelper.updateCandidate(
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
  );

  if (pipeline) {
    res.status(200).json({
      success: true,
      candidate: pipeline.users,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'candidate update failed',
    });
  }
};

exports.deleteCandidate = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const user_email = req.params.user_id;

  const pipeline = await pipelineHelper.deleteCandidate(
    pipeline_id,
    user_email,
  );

  if (pipeline) {
    res.status(200).json({
      success: true,
      candidate: pipeline.users,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'candidate update failed',
    });
  }
};

exports.getCandidate = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const user_email = req.params.user_id;

  const candidate = await pipelineHelper.getCandidate(pipeline_id, user_email);

  if (candidate !== undefined) {
    res.status(200).json({
      success: true,
      candidate: candidate,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: 'candidate update failed',
    });
  }
};

exports.validateCandidate = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const user_email = req.params.user_id;

  const candidate = await pipelineHelper.validateCandidate(
    pipeline_id,
    user_email,
  );

  if (candidate !== undefined) {
    res.status(200).json({
      success: true,
      valid: candidate,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

exports.benchmarkPipeline = async function(req, res) {
  const pipeline_id = req.params.pipeline_id;
  const user_email = req.params.user_id;

  const candidate = await pipelineHelper.validateCandidate(
    pipeline_id,
    user_email,
  );

  if (candidate !== undefined) {
    res.status(200).json({
      success: true,
      valid: candidate,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
