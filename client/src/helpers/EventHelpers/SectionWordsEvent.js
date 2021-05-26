export let result = {};

export const addWordCount = (sectionId, text) => {
  if (!text) {
    return 0;
  }

  const regex = /\s+/gi;
  result[sectionId] = text
    .trim()
    .replace(regex, ' ')
    .split(' ').length;
};

export const getTotalWords = () => {
  let totalWords = 0;

  Object.keys(result).forEach((key, ind) => {
    totalWords += Number(result[key]);
  });

  return totalWords;
};

export const onSectionWordsEvent = (event_id, sendEvent) => {
  console.log('wordcount event : ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'word_count_event',
      data: result,
    },
  });

  // result = {};
};
