const User = require('../models/user');
const deleteChallenge = require('./challengeHelper').deleteChallenge;
const del = require('delete');

exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    email: request.email,
    company: request.company,
    industry: request.industry,
    role: request.role,
    company_type: request.company_type,
    account_type: request.account_type,
    image: request.image,
    firstname: request.firstname,
    lastname: request.lastname,
    isVerified: request.isVerified
  };

  return getUserInfo;
};

exports.deleteUser = async function(user_id) {
  return await User.deleteOne({ _id: user_id });
};

exports.deleteUserChallenges = function(user_id) {
  User.findOne(
    {
      _id: user_id
    },
    function(err, data) {
      if (err) {
        return err;
      } else if (data) {
        data.challenges.map((challenge_id, key) => {
          deleteChallenge(challenge_id);
        });
        return 'success';
      }
    }
  );
};

exports.addChallengeRef = async function(user_id, challenge_id) {
  await User.findOneAndUpdate(
    { _id: user_id },
    {
      $push: { challenges: challenge_id }
    }
  );
};

exports.updateUser = async function(
  user_id,
  { firstname, lastname, email, company, industry, role, company_type, image }
) {
  let updateData = {};
  if (firstname !== undefined && firstname) updateData['firstname'] = firstname;
  if (lastname !== undefined && lastname) updateData['lastname'] = lastname;
  if (email !== undefined && email) updateData['email'] = email;
  if (company !== undefined && company) updateData['company'] = company;
  if (industry !== undefined && industry) updateData['industry'] = industry;
  if (role !== undefined && role) updateData['role'] = role;
  if (company_type !== undefined && company_type) updateData['company_type'] = company_type;
  if (image !== undefined && image) {
    updateData['image'] = image;
  }

  const userResult = await User.update({ _id: user_id }, updateData);
  return userResult;
};
