import actions from './actions';

const initState = {
  candidateAuth: false,
  candidate: null,
  curCandidate: null,
  isLoading: false,
  errorMsg: null,
};

export default function candidateReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.CREATE_CANDIDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.CREATE_CANDIDATE_SUCCESS:
      console.log('payload.cid', payload.cid);
      return {
        ...state,
        isLoading: false,
        candidateAuth: true,
        curCandidate: { ...state.curCandidate, _id: payload.cid },
      };

    case actions.CREATE_CANDIDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.GET_CANDIDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        candidate: payload,
      };

    case actions.GET_CANDIDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.SET_CANDIDATE_REQUEST:
      return {
        ...state,
        curCandidate: payload,
        errorMsg: null,
      };

    case actions.STORE_CANDIDATE_REQUEST:
      return {
        ...state,
        errorMsg: null,
      };
    case actions.UPDATE_CANDIDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case actions.UPDATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        curCandidate: payload,
      };

    case actions.UPDATE_CANDIDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    default:
      return state;
  }
}
