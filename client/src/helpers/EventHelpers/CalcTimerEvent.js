export const sendCalcEvent = (event_id, data, sendEvent) => {
  const result = data ? 'Yes' : 'No';

  return sendEvent({
    event_id,
    data: {
      event_type: 'calc_timer_event',
      data: result,
    },
  });
};
