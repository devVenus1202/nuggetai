const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
require('dotenv').config();

const API_KEY = process.env.WASTON_PERSONALITY_API_KEY;
const URL = process.env.WASTON_PERSONALITY_URL;

const personalityInsights = new PersonalityInsightsV3({
  version_date: '2017-10-13',
  iam_apikey: API_KEY,
  url: URL,
});

const profiletext =
  'We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution, We dare not forget today that we are the heirs of that first revolution';

exports.getJSON = (text, lang = 'en') => {
  const profileParams = {
    content: text,
    content_type: 'text/plain',
    consumption_preferences: false,
    raw_scores: true,
    headers: {
      'Content-Language': lang,
    },
  };

  return new Promise((resolve, reject) => {
    personalityInsights.profile(profileParams, function(error, profile) {
      if (error) {
        reject(error);
      } else {
        resolve(profile);
      }
    });
  });
};

exports.getCSV = text => {
  const params = {
    content: text || 'No text provided',
    content_type: 'text/plain',
    consumption_preferences: false,
    raw_scores: true,
    csv_headers: true,
    headers: {
      Accept: 'text/csv',
    },
  };

  return new Promise((resolve, reject) => {
    personalityInsights.profile(params, function(error, profile) {
      if (error) {
        console.log('personality insights error ----> ', error);
        resolve(null);
      } else {
        resolve(profile);
      }
    });
  });
};
