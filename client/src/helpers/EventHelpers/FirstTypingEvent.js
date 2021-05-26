export let result = {};
export let keywordResult = {};

export const onSetFirstWord = (sectionId, time) => {
  result[sectionId] = time;
};

export const onSetFirstKeyWord = (sectionId, time) => {
  keywordResult[sectionId] = time;
};

export const getHeadStart = () => {
  let totalStart = 0;

  Object.keys(result).forEach((key, ind) => {
    if (totalStart < result[key]) {
      totalStart = result[key];
    }
  });

  return totalStart;
};

export const onSendFirstWord = (event_id, sendEvent) => {
  console.log('send firstword typing event : ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'first_word_event',
      data: result,
    },
  });

  result = {};
  keywordResult = {};
};

export const onSendFirstKeyWord = (event_id, sendEvent) => {
  console.log('send first Keyword typing event : ', keywordResult);

  return sendEvent({
    event_id,
    data: {
      event_type: 'first_keyword_event',
      data: keywordResult,
    },
  });

  result = {};
  keywordResult = {};
};
