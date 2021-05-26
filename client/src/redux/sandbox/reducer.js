import actions from './actions';

const initState = {
  challenges: [],
  curChallenge: null,
  isLoading: false,
  errorMsg: null,
};

export default function challengeReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_CHALLENGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.GET_ALL_CHALLENGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        challenges: payload,
        curChallenge: null,
      };

    case actions.GET_ALL_CHALLENGE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.GET_CHALLENGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.GET_CHALLENGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        curChallenge: payload,
      };

    case actions.GET_CHALLENGE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };
    default:
      return state;
  }
}
