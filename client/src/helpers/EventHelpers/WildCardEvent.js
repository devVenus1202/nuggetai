export let value = {};

export const onResultHelp = (result) => {
  value = result;
};

export const sendResultEvent = (event_id, sendEvent) => {
  const result = value;

  return sendEvent({
    event_id,
    data: {
      event_type: 'wild_card_event',
      data: result,
    },
  });
};