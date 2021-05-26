const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
require('dotenv').config();

const API_KEY = process.env.WASTON_NATURAL_LANG_API_KEY;
const URL = process.env.WASTON_NATURAL_LANG_URL;

const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: API_KEY,
  url: URL,
});

const exampleText =
  'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.';

module.exports = text => {
  const parameters = {
    text: text,
    features: {
      categories: {
        limit: 1,
      },
      concepts: {
        limit: 1,
      },
      entities: {
        sentiment: true,
        limit: 1,
      },
      sentiment: {
        document: true,
      },
      emotion: {
        document: true,
      },
      entities: {
        emotion: true,
        sentiment: true,
        limit: 2,
      },
      keywords: {
        emotion: true,
        sentiment: true,
        limit: 5,
      },
    },
  };

  return new Promise((resolve, reject) => {
    natural_language_understanding.analyze(parameters, function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  })
};
