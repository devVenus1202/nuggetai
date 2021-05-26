import { ms2s } from '../dataHelper';

export let result = {};
let initResult = {};
let prev = null;
let last = null;

export const onFocusAccordion = key => {
  const now = Date.now();
  if (key === prev) {
    return;
  }
  if (prev != null) {
    const interval = Date.now() - result[prev].startedAt;
    const duration = result[prev].duration
      ? result[prev].duration + Number(interval)
      : Number(interval);
    result[prev] = { duration: duration };
  }
  prev = key;
  result[key] = { ...result[key], startedAt: Date.now() };
};

export const getResult = () => {
  for (const key in result) {
    if (result[key].startedAt) {
      const duration = Number(
        Date.now() - result[key].startedAt + result[key].duration || 0 
      );
      result[key] = ms2s(duration);
      last = key;
      continue;
    }
    result[key] = ms2s(result[key].duration);
  }
};

export const init = () => {
  result = {};
  if (last) {
    result[last] = { startedAt: Date.now() };
  }
  prev = last;
};

const isActive = () => {
  return Object.keys(result).length !== 0;
};

export const onSendTimeSpent = (event_id, sendEvent) => {
  if (!isActive()) {
    return;
  }

  getResult();
  console.log('cardtimer result ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'card_timer_event',
      data: result,
    },
  });

  // init();
};
