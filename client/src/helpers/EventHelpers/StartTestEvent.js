export const onStartTestEvent = (event_id, id, sendEvent) => {
  sendEvent({
    event_id,
    data: {
      event_type: 'start_test_event',
      data: id,
    },
  });
};
