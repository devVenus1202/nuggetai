import actions from './actions';

const initState = {
  result: null,
  isLoading: false,
  errorMsg: null,
  testData: {},
};

export default function resultReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.ADD_RESULT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.ADD_RESULT_SUCCESS:
      return {
        ...state,
        result: payload,
        isLoading: false,
      };

    case actions.ADD_RESULT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.SEND_EVENT_REQUEST:
      return {
        ...state,
        errorMsg: null,
      };

    case actions.SEND_EVENT_SUCCESS:
      return {
        ...state,
      };

    case actions.SEND_EVENT_FAILED:
      return {
        ...state,
        errorMsg: payload,
      };
    case actions.SEND_ALL_EVENTS_REQUEST:
      return {
        ...state,
      };

    case actions.STORE_TEST_DATA:
      return {
        ...state,
        testData: payload,
      };
    default:
      return state;
  }
}
