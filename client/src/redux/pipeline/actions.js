const actions = {
  CREATE_PIPELINE_REQUEST: 'CREATE_PIPELINE_REQUEST',
  CREATE_PIPELINE_SUCCESS: 'CREATE_PIPELINE_SUCCESS',
  CREATE_PIPELINE_FAILED: 'CREATE_PIPELINE_FAILED',

  DELETE_PIPELINE_REQUEST: 'DELETE_PIPELINE_REQUEST',
  DELETE_PIPELINE_SUCCESS: 'DELETE_PIPELINE_SUCCESS',
  DELETE_PIPELINE_FAILED: 'DELETE_PIPELINE_FAILED',

  UPDATE_PIPELINE_REQUEST: 'UPDATE_PIPELINE_REQUEST',
  UPDATE_PIPELINE_SUCCESS: 'UPDATE_PIPELINE_SUCCESS',
  UPDATE_PIPELINE_FAILED: 'UPDATE_PIPELINE_FAILED',

  BENCHMARK_PIPELINE_REQUEST: 'BENCHMARK_PIPELINE_REQUEST',
  BENCHMARK_PIPELINE_SUCCESS: 'BENCHMARK_PIPELINE_SUCCESS',
  BENCHMARK_PIPELINE_FAILED: 'BENCHMARK_PIPELINE_FAILED',

  createPipeline: payload => ({
    type: actions.CREATE_PIPELINE_REQUEST,
    payload,
  }),
  createPipelineSuccess: payload => ({
    type: actions.CREATE_PIPELINE_SUCCESS,
    payload,
  }),
  createPipelineFailed: payload => ({
    type: actions.CREATE_PIPELINE_FAILED,
    payload,
  }),

  deletePipeline: payload => ({
    type: actions.DELETE_PIPELINE_REQUEST,
    payload,
  }),
  deletePipelineSuccess: () => ({ type: actions.DELETE_PIPELINE_SUCCESS }),
  deletePipelineFailed: payload => ({
    type: actions.DELETE_PIPELINE_FAILED,
    payload,
  }),

  updatePipeline: payload => ({
    type: actions.UPDATE_PIPELINE_REQUEST,
    payload,
  }),
  updatePipelineSuccess: () => ({ type: actions.UPDATE_PIPELINE_SUCCESS }),
  updatePipelineFailed: payload => ({
    type: actions.UPDATE_PIPELINE_FAILED,
    payload,
  }),

  benchmarkPipeline: payload => ({
    type: actions.BENCHMARK_PIPELINE_REQUEST,
    payload,
  }),
  benchmarkPipelineSuccess: () => ({
    type: actions.BENCHMARK_PIPELINE_SUCCESS,
  }),
  benchmarkPipelineFailed: payload => ({
    type: actions.BENCHMARK_PIPELINE_FAILED,
    payload,
  }),
};

export default actions;
