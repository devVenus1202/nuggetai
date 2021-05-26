import { ms2s } from '../dataHelper';

export let data = {};
export let result = {};

export const onFocusSection = (sectionId, startedAt) => {
  data[sectionId] = { ...data[sectionId], startedAt: startedAt };
};

export const onBlurSection = (sectionId, endedAt) => {
  if (data[sectionId]) {
    const started = new Date(data[sectionId].startedAt);
    const ended = new Date(endedAt);
    const duration = data[sectionId].duration
      ? data[sectionId].duration + Number(ended - started)
      : Number(ended - started);
    data[sectionId] = { duration: duration };
    result[sectionId] = duration;
  }
};

export const getResult = () => {
  for (const key in data) {
    if (data[key].startedAt) {
      const duration = Number(Date.now() - data[key].startedAt);
      result[key] = ms2s(duration);
      continue;
    }
    result[key] = ms2s(result[key]);
  }
};

export const init = () => {
  result = {};
  data = {};
};

const isActive = () => {
  return Object.keys(result).length !== 0;
};

export const onSendTimeSpent = (event_id, sendEvent) => {
  if (!isActive()) {
    return;
  }
  getResult();

  console.log('timespent result: ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'time_spent_event',
      data: result,
    },
  });

  // init();
};
