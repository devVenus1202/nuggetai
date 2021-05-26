const actions = {
  CREATE_CHALLENGE_REQUEST: 'CREATE_CHALLENGE_REQUEST',
  CREATE_CHALLENGE_SUCCESS: 'CREATE_CHALLENGE_SUCCESS',
  CREATE_CHALLENGE_FAILED: 'CREATE_CHALLENGE_FAILED',

  GET_ALL_CHALLENGE_REQUEST: 'GET_ALL_CHALLENGE_REQUEST',
  GET_ALL_CHALLENGE_SUCCESS: 'GET_ALL_CHALLENGE_SUCCESS',
  GET_ALL_CHALLENGE_FAILED: 'GET_ALL_CHALLENGE_FAILED',

  GET_CHALLENGE_REQUEST: 'GET_CHALLENGE_REQUEST',
  GET_CHALLENGE_SUCCESS: 'GET_CHALLENGE_SUCCESS',
  GET_CHALLENGE_FAILED: 'GET_CHALLENGE_FAILED',

  UPDATE_CHALLENGE_REQUEST: 'UPDATE_CHALLENGE_REQUEST',
  UPDATE_CHALLENGE_SUCCESS: 'UPDATE_CHALLENGE_SUCCESS',
  UPDATE_CHALLENGE_FAILED: 'UPDATE_CHALLENGE_FAILED',

  DELETE_CHALLENGE_REQUEST: 'DELETE_CHALLENGE_REQUEST',
  DELETE_CHALLENGE_SUCCESS: 'DELETE_CHALLENGE_SUCCESS',
  DELETE_CHALLENGE_FAILED: 'DELETE_CHALLENGE_FAILED',

  createChallenge: payload => ({ type: actions.CREATE_CHALLENGE_REQUEST, payload }),
  createChallengeSuccess: payload => ({ type: actions.CREATE_CHALLENGE_SUCCESS, payload }),
  createChallengeFailed: payload => ({ type: actions.CREATE_CHALLENGE_FAILED, payload }),
  
  getAllChallenge: payload => ({ type: actions.GET_ALL_CHALLENGE_REQUEST, payload }),
  getAllChallengeSuccess: payload => ({ type: actions.GET_ALL_CHALLENGE_SUCCESS, payload }),
  getAllChallengeFailed: payload => ({ type: actions.GET_ALL_CHALLENGE_FAILED, payload }),

  getChallenge: payload => ({ type: actions.GET_CHALLENGE_REQUEST, payload }),
  getChallengeSuccess: payload => ({ type: actions.GET_CHALLENGE_SUCCESS, payload }),
  getChallengeFailed: payload => ({ type: actions.GET_CHALLENGE_FAILED, payload }),

  updateChallenge: payload => ({ type: actions.UPDATE_CHALLENGE_REQUEST, payload }),
  updateChallengeSuccess: payload => ({ type: actions.UPDATE_CHALLENGE_SUCCESS, payload }),
  updateChallengeFailed: payload => ({ type: actions.UPDATE_CHALLENGE_FAILED, payload }),

  deleteChallenge: payload => ({ type: actions.DELETE_CHALLENGE_REQUEST, payload }),
  deleteChallengeSuccess: payload => ({ type: actions.DELETE_CHALLENGE_SUCCESS, payload }),
  deleteChallengeFailed: payload => ({ type: actions.DELETE_CHALLENGE_FAILED, payload }),
};

export default actions;
