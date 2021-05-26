const actions = {
  ADD_RESULT_REQUEST: 'ADD_RESULT_REQUEST',
  ADD_RESULT_SUCCESS: 'ADD_RESULT_SUCCESS',
  ADD_RESULT_FAILED: 'ADD_RESULT_FAILED',

  SEND_EVENT_REQUEST: 'SEND_EVENT_REQUEST',
  SEND_EVENT_SUCCESS: 'SEND_EVENT_SUCCESS',
  SEND_EVENT_FAILED: 'SEND_EVENT_FAILED',
  SEND_ALL_EVENTS_REQUEST: 'SEND_ALL_EVENTS_REQUEST',

  STORE_TEST_DATA: 'STORE_TEST_DATA',

  addResult: payload => ({ type: actions.ADD_RESULT_REQUEST, payload }),
  addResultSuccess: payload => ({ type: actions.ADD_RESULT_SUCCESS, payload }),
  addResultFailed: payload => ({ type: actions.ADD_RESULT_FAILED, payload }),

  sendEvent: payload => ({ type: actions.SEND_EVENT_REQUEST, payload }),
  sendEventSuccess: payload => ({ type: actions.SEND_EVENT_SUCCESS, payload }),
  sendEventFailed: payload => ({ type: actions.SEND_EVENT_FAILED, payload }),

  sendAllEventsRequest: payload => ({
    type: actions.SEND_ALL_EVENTS_REQUEST,
    payload,
  }),

  storeTestData: payload => ({ type: actions.STORE_TEST_DATA, payload }),
};

export default actions;
