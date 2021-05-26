import {
  countStringIncluded,
  countStringIncluded2,
} from '../../helpers/dataHelper';

export let result = {
  longSentences: {},
  beverbs: {},
  combos: {},
  pronouns: {},
  phrase1: {},
  phrase2: {},
  phrase3: {},
  phrase4: {},
};

const initialResult = {
  longSentences: {},
  pronouns: {},
  beverbs: {},
  combos: {},
  collectionWords: {},
  engenderWords: {},
};

const regex = /\s+/gi;
const letterRegex = /^[a-zA-Z]+$/i;
const nonLetterRegex = /[^0-9a-z]/gi;

const wordsPerLine = 30;
const pronouns = ['it', 'they', 'them', 'he', 'she', 'him', 'her'];
const beVerbs = ['is', 'are', 'be'];
const wordGroup1 = [
  'similarly',
  'equality',
  'equally',
  'in the same way',
  'likewise',
  'by the same token',
  'in a like manner',
  'even more',
  'above all',
  'indeed',
  'more importantly',
  'besides',
];
const wordGroup2 = [
  'but',
  'however',
  'in contrast',
  'by way of contrast',
  'yet',
  'when in fact',
  'while',
  'whereas',
  'conversely',
  'on the other hand',
  'though',
  'still',
  'on the contrary',
  'but even so',
  'however',
  'nevertheless',
  'nonetheless',
  'although',
  'even though',
  'despite',
  'in spite of',
  'granted',
  'on the other hand',
  'notwithstading',
  'regardless',
  'be that as it may',
  'admittedly',
  'albeit',
];

const wordGroup3 = [
  'equally',
  'in the same way',
  'likewise',
  'by the same token',
  'in a like manner',
  'even more',
  'above all',
  'indeed',
  'more importantly',
  'besides',
];

const wordGroup4 = [
  'by way of contrast',
  'yet',
  'when in fact',
  'while',
  'whereas',
  'conversely',
  'on the other hand',
  'though',
  'still',
  'but even so',
  'nevertheless',
  'nonetheless',
  'although',
  'even though',
  'despite',
  'in spite of',
  'granted',
  'on the other hand',
  'notwithstanding',
  'regardless',
  'be that as it may',
  'admittedly',
  'albeit',
];

export const splitToWords = text => {
  return text.replace(regex, ' ').split(' ');
};

export const getOnlyLetters = text => {
  return text
    .replace(nonLetterRegex, ' ')
    .split(' ')
    .filter(val => val);
};

export const isLongSentence = text => {
  return splitToWords(text).length > wordsPerLine;
};

export const getWordCount = (text, word) => {
  return getOnlyLetters(text).filter(
    val => val.toUpperCase() === word.toUpperCase(),
  ).length;
};

export const countLongSentences = (sectionId, sectionText) => {
  if (result.longSentences[sectionId] === undefined) {
    result.longSentences[sectionId] = 0;
  }

  sectionText.split('.').map(sentence => {
    if (isLongSentence(sentence)) {
      result.longSentences[sectionId]++;
    }
  });
};

export const getRunOn = () => {
  const data = result.longSentences;
  let total = 0;

  Object.keys(data).forEach((key, ind) => {
    total += data[key];
  });

  return total;
};

export const countBeVerbs = (sectionId, text) => {
  setCountWordsInResult('beverbs', beVerbs, sectionId, text);
};

export const countWordsInSections = (sectionId, text) => {
  setCountPronounsInResult('pronouns', pronouns, sectionId, text);
  setCountWordsInResult('phrase1', wordGroup1, sectionId, text);
  setCountWordsInResult('phrase2', wordGroup2, sectionId, text);
  setCountWordsInResult('phrase3', wordGroup3, sectionId, text);
  setCountWordsInResult('phrase4', wordGroup4, sectionId, text);
};

const setCountWordsInResult = (field, words, sectionId, text) => {
  result[field][sectionId] = 0;
  words.forEach(word => {
    result[field][sectionId] += countStringIncluded2(text, word);
  });
};

const setCountPronounsInResult = (field, words, sectionId, text) => {
  result[field][sectionId] = 0;
  words.forEach(word => {
    result[field][sectionId] += countStringIncluded2(text, word);
  });
};

export const analyzeContent = (sectionId, sectionText) => {
  countLongSentences(sectionId, sectionText);
  countBeVerbs(sectionId, sectionText);
  countWordsInSections(sectionId, sectionText);
};

export const onSendAnalysisEvent = (event_id, sendEvent) => {
  console.log('analysis event : ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'analysis_event',
      data: result,
    },
  });

  result = initialResult;
};
