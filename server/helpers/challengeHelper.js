const Challenge = require('../models/challenge');
const Pipeline = require('../models/pipeline');
const ChallengeResult = require('../models/challengeResult');
const deleteEvent = require('./eventHelper').deleteEvent;
const deletePipeline = require('./pipelineHelper').deletePipeline;
const keywordAnalyze = require('../controllers/waston/KeywordAnalyze');
const _ = require('lodash');
const testdata = require('./data').testdata;

const blueSky = require('./dummyData/blue_sky');
const b2b = require('./dummyData/b2b');
const dataScientist = require('./dummyData/data_scientist');
const marketing = require('./dummyData/marketing');
const realEstate = require('./dummyData/real_estate');
const engineering = require('./dummyData/software_engineer');
const strategy = require('./dummyData/strategy');

exports.deleteResult = function(result_id) {
  ChallengeResult.findOne(
    {
      _id: result_id,
    },
    function(err, result) {
      if (err) {
        return err;
      } else if (result) {
        if (event_id) {
          deleteEvent(result.event_id);
        }
      }
    },
  );

  ChallengeResult.deleteOne(
    {
      _id: result_id,
    },
    function(err) {
      if (err) {
        return err;
      } else {
        return 'success';
      }
    },
  );
};

exports.removeChallenge = async function(challenge_id) {
  Challenge.findOne(
    {
      _id: challenge_id,
    },
    function(err, data) {
      if (err) {
        return err;
      } else if (data) {
        data.pipelines.map((pipeline_id, key) => {
          deletePipeline(pipeline_id);
        });
      }
    },
  );

  return await Challenge.deleteOne({ _id: challenge_id });
};

exports.getChallenge = async function(challenge_id) {
  const challenge = await Challenge.findOne({ _id: challenge_id })
    .populate('pipelines', null, { status: 'active' })
    .populate('user', { company: true }, 'User')
    .exec();
  return challenge;
};

const getTestCardText = cards => {
  let result = '';
  cards.forEach(({ details }) => {
    result += details + ' \n';
  });
  return result;
};

exports.addChallenge = async function({
  role,
  position,
  test_name,
  test_desc,
  cards,
  keywords,
  image,
  timer,
  user,
  functions,
  sponsored,
}) {
  // const cardText = getTestCardText(cards);
  // with dummy card data

  let cardText = "";

  const challengeDummyData = [
    blueSky,
    b2b,
    dataScientist,
    marketing,
    realEstate,
    engineering,
    strategy,
  ];

  challengeDummyData.forEach((data, ind) => {
    const {
      test_id,
      title,
      test_desc: testDesc,
      cards: cardData
    } = data;

    console.log('test_id: ', test_id)
    console.log('test_desc: ', test_desc)
    if (test_id.toLowerCase() === test_desc.toLowerCase()) {
      cardText = testDesc + '\n' + getTestCardText(cardData);
    }
  });

  let card_keywords = [];
  try {
    const wastonResult = await keywordAnalyze(cardText);
    const keywords = wastonResult.keywords || [];
    card_keywords = keywords.map(keyword => keyword.text);
    console.log('card_keywords: ', card_keywords);
  } catch (error) {
    console.log('keyword analyze error: ', error);
  }

  const challenge = new Challenge({
    role,
    position,
    test_name,
    test_desc,
    cards,
    keywords,
    card_keywords,
    image,
    timer,
    user,
    functions,
    sponsored,
    status: 'active',
  });

  const result = await challenge.save();
  return result;
};

exports.updateChallenge = async function(
  challenge_id,
  {
    role,
    position,
    test_name,
    test_desc,
    cards,
    image,
    timer,
    status,
    keywords,
    functions,
    sponsored,
  },
) {
  let updateData = {};
  if (role !== undefined) updateData['role'] = role;
  if (position !== undefined) updateData['position'] = position;
  if (test_name !== undefined) updateData['test_name'] = test_name;
  if (test_desc !== undefined) updateData['test_desc'] = test_desc;
  if (cards !== undefined) updateData['cards'] = cards;
  if (keywords !== undefined) updateData['keywords'] = keywords;
  if (image !== undefined) updateData['image'] = image;
  if (timer !== undefined) updateData['timer'] = timer;
  if (status !== undefined) updateData['status'] = status;
  if (functions !== undefined) updateData['functions'] = functions;
  if (sponsored !== undefined) updateData['sponsored'] = sponsored;

  const challenge = await Challenge.update({ _id: challenge_id }, updateData);
  return challenge;
};

exports.deleteChallenge = async function(challenge_id) {
  const challenge = await Challenge.update(
    { _id: challenge_id },
    { status: 'deleted' },
  );
  return challenge;
};

exports.addPipelineRef = async function(challenge_id, pipeline_id) {
  await Challenge.findOneAndUpdate(
    { _id: challenge_id },
    {
      $push: { pipelines: pipeline_id },
    },
  );
};

exports.getWastonKeywords = async text => {
  try {
    const { keywords } = await keywordAnalyze(text);
    return keywords.map(val => val.text);
  } catch (error) {
    return [];
  }
};
