import actions from './actions';

const initState = {
  users: [],
  challenges: [],
  pipelines: [],
};

export default function AdminReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
        errorMsg: null,
      };

    case actions.GET_ALL_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.GET_USER_CHALLENGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.GET_USER_CHALLENGES_SUCCESS:
      return {
        ...state,
        challenges: payload,
        isLoading: false,
        errorMsg: null,
      };

    case actions.GET_USER_CHALLENGES_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.GET_PIPELINES_REQUEST:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
      };
    
    case actions.GET_PIPELINES_SUCCESS:
      return {
        ...state,
        pipelines: payload,
        errorMsg: null,
      };

    case actions.GET_PIPELINES_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };
    default:
      return state;
  }
}
