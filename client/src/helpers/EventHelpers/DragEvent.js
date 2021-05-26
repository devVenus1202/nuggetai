export let result = {
  dragCount: {},
  wordCount: {},
};

const regex = {
  letterAndnumber: /^[a-z0-9]+$/i,
  wordSplitter: /\s+/gi,
};

const getWordCount = text => {
  if (!text) {
    return 0;
  }
  return text
    .trim()
    .replace(regex.wordSplitter, ' ')
    .split(' ').length;
};

export const onDropped = (sectionId, text) => {
  console.log('dragged text : ', text);

  if (result.wordCount[sectionId] === undefined) {
    result.wordCount[sectionId] = 0;
  }
  if (result.dragCount[sectionId] === undefined) {
    result.dragCount[sectionId] = 0;
  }

  result.wordCount[sectionId] += getWordCount(text);
  result.dragCount[sectionId]++;
};

export const init = () => {
  result = {
    dragCount: {},
    wordCount: {},
  };
};

const isActive = () => {
  return result.dragCount !== {} || result.wordCount !== {};
};

export const onSendDragEvent = (event_id, sendEvent) => {
  if (!isActive()) {
    return;
  }
  console.log('dragevent result : ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'drag_event',
      data: result,
    },
  });

  // init();
};
