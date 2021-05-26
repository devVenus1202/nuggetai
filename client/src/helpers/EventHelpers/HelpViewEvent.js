export let viewCount = 0;

export const onViewHelp = () => {
  viewCount ++;
};

export const sendHelpViewEvent = (event_id, sendEvent) => {
  console.log('help view count : ', viewCount);

  return sendEvent({
    event_id,
    data: {
      event_type: 'help_view_count_event',
      data: viewCount,
    },
  });
};
