const User = require('../models/user');
const Challenge = require('../models/challenge');
const Pipeline = require('../models/pipeline');

exports.getAllUsers = async () => {
  try {
    const users = await User.find(
      { status: 'active' },
      {
        email: true,
      },
    );
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getAllChallenges = async () => {
  try {
    const results = await Challenge.find(
      { status: 'active' },
      {
        test_name: true,
        test_desc: true,
      },
    );
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getAllPipelines = async () => {
  try {
    const results = await Pipeline.find(
      { status: 'active' },
      {
        title: true,
        pipeline_desc: true,
      },
    );
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
