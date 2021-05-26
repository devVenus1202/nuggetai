const actions = {
  GET_ALL_CHALLENGE_REQUEST: '@SANDBOX_GET_ALL_CHALLENGE_REQUEST',
  GET_ALL_CHALLENGE_SUCCESS: '@SANDBOX_GET_ALL_CHALLENGE_SUCCESS',
  GET_ALL_CHALLENGE_FAILED: '@SANDBOX_GET_ALL_CHALLENGE_FAILED',

  GET_CHALLENGE_REQUEST: '@SANDBOX_GET_CHALLENGE_REQUEST',
  GET_CHALLENGE_SUCCESS: '@SANDBOX_GET_CHALLENGE_SUCCESS',
  GET_CHALLENGE_FAILED: '@SANDBOX_GET_CHALLENGE_FAILED',
  
  getAllChallenge: payload => ({ type: actions.GET_ALL_CHALLENGE_REQUEST, payload }),
  getAllChallengeSuccess: payload => ({ type: actions.GET_ALL_CHALLENGE_SUCCESS, payload }),
  getAllChallengeFailed: payload => ({ type: actions.GET_ALL_CHALLENGE_FAILED, payload }),

  getChallenge: payload => ({ type: actions.GET_CHALLENGE_REQUEST, payload }),
  getChallengeSuccess: payload => ({ type: actions.GET_CHALLENGE_SUCCESS, payload }),
  getChallengeFailed: payload => ({ type: actions.GET_CHALLENGE_FAILED, payload }),
};

export default actions;
