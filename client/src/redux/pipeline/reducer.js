import actions from './actions';

const initState = {
  pipeline: null,
  isLoading: false,
  errorMsg: null,
};

export default function pipelineReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.CREATE_PIPELINE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.CREATE_PIPELINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pipeline: payload,
      };

    case actions.CREATE_PIPELINE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.DELETE_PIPELINE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.DELETE_PIPELINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actions.DELETE_PIPELINE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.UPDATE_PIPELINE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.UPDATE_PIPELINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actions.UPDATE_PIPELINE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case actions.BENCHMARK_PIPELINE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };

    case actions.BENCHMARK_PIPELINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actions.BENCHMARK_PIPELINE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };
    default:
      return state;
  }
}
