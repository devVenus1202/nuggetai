export let transition = {};

export const onFocusSection = sectionId => {
  if (transition[sectionId] === undefined) {transition[sectionId] = 0;}
  transition[sectionId]++;
};

const isActive = () => {
  return Object.keys(transition).length !== 0;
};

export const onTransitionEvent = (event_id, sendEvent) => {
  if (!isActive()) {return;}
  console.log('transition count : ', transition);

  return sendEvent({
    event_id,
    data: {
      event_type: 'transition_event',
      data: transition,
    },
  });

  // transition = {};
};
