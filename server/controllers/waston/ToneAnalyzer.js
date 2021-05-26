const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
require('dotenv').config();

const API_KEY = process.env.WASTON_TONE_ANALYZE_API_KEY;
const URL = process.env.WASTON_TONE_ANALYZE_URL;

const toneAnalyzer = new ToneAnalyzerV3({
  version_date: '2017-09-21',
  iam_apikey: API_KEY,
  url: URL,
});

const text =
  'Team, I know that times are tough! Product ' +
  'sales have been disappointing for the past three ' +
  'quarters. We have a competitive product, but we ' +
  'need to do a better job of selling it!';

module.exports = (text, callback) => {
  const toneParams = {
    tone_input: { text: text },
    content_type: 'application/json',
  };

  return new Promise((resolve, reject) => {
    toneAnalyzer.tone(toneParams, function(error, toneAnalysis) {
      if (error) {
        reject(error);
      } else {
        resolve(toneAnalysis);
      }
    });
  });
};
