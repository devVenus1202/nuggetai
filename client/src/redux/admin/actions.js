const actions = {
  GET_ALL_USERS_REQUEST: 'GET_ALL_USERS_REQUEST',
  GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FAILED: 'GET_ALL_USERS_FAILED',

  GET_USER_CHALLENGES_REQUEST: 'GET_USER_CHALLENGES_REQUEST',
  GET_USER_CHALLENGES_SUCCESS: 'GET_USER_CHALLENGES_SUCCESS',
  GET_USER_CHALLENGES_FAILED: 'GET_USER_CHALLENGES_FAILED',

  GET_PIPELINES_REQUEST: 'GET_PIPELINES_REQUEST',
  GET_PIPELINES_SUCCESS: 'GET_PIPELINES_SUCCESS',
  GET_PIPELINES_FAILED: 'GET_PIPELINES_FAILED',

  getAllUsersRequest: payload => ({ type: actions.GET_ALL_USERS_REQUEST, payload }),
  getAllUsersSuccess: payload => ({ type: actions.GET_ALL_USERS_SUCCESS, payload }),
  getAllUsersFailed: payload => ({ type: actions.GET_ALL_USERS_FAILED, payload }),

  getUserChallengesRequest: payload => ({ type: actions.GET_USER_CHALLENGES_REQUEST, payload }),
  getUserChallengesSuccess: payload => ({ type: actions.GET_USER_CHALLENGES_SUCCESS, payload }),
  getUserChallengesFailed: payload => ({ type: actions.GET_USER_CHALLENGES_FAILED, payload }),

  getPipelinesRequest: payload => ({ type: actions.GET_PIPELINES_REQUEST, payload }),
  getPipelinesSuccess: payload => ({ type: actions.GET_PIPELINES_SUCCESS, payload }),
  getPipelinesFailed: payload => ({ type: actions.GET_PIPELINES_FAILED, payload }),
};

export default actions;
