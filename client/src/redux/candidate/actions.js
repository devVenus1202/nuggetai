const actions = {
  CREATE_CANDIDATE_REQUEST: 'CREATE_CANDIDATE_REQUEST',
  CREATE_CANDIDATE_SUCCESS: 'CREATE_CANDIDATE_SUCCESS',
  CREATE_CANDIDATE_FAILED: 'CREATE_CANDIDATE_FAILED',
  
  GET_CANDIDATE_REQUEST: 'GET_CANDIDATE_REQUEST',
  GET_CANDIDATE_SUCCESS: 'GET_CANDIDATE_SUCCESS',
  GET_CANDIDATE_FAILED: 'GET_CANDIDATE_FAILED',
  
  SET_CANDIDATE_REQUEST: 'SET_CANDIDATE_REQUEST',
  STORE_CANDIDATE_REQUEST: 'STORE_CANDIDATE_REQUEST',

  UPDATE_CANDIDATE_REQUEST: 'UPDATE_CANDIDATE_REQUEST',
  UPDATE_CANDIDATE_SUCCESS: 'UPDATE_CANDIDATE_SUCCESS',
  UPDATE_CANDIDATE_FAILED: 'UPDATE_CANDIDATE_FAILED',

  createCandidate: payload => ({ type: actions.CREATE_CANDIDATE_REQUEST, payload }),
  createCandidateSuccess: payload => ({ type: actions.CREATE_CANDIDATE_SUCCESS, payload }),
  createCandidateFailed: payload => ({ type: actions.CREATE_CANDIDATE_FAILED, payload }),
    
  updateCandidate: payload => ({ type: actions.UPDATE_CANDIDATE_REQUEST, payload }),
  updateCandidateSuccess: payload => ({ type: actions.UPDATE_CANDIDATE_SUCCESS, payload }),
  updateCandidateFailed: payload => ({ type: actions.UPDATE_CANDIDATE_FAILED, payload }),
    
  getCandidate: payload => ({ type: actions.GET_CANDIDATE_REQUEST, payload }),
  getCandidateSuccess: payload => ({ type: actions.GET_CANDIDATE_SUCCESS, payload }),
  getCandidateFailed: payload => ({ type: actions.GET_CANDIDATE_FAILED, payload }),
  
  setCandidate: payload => ({ type: actions.SET_CANDIDATE_REQUEST, payload }),
  storeCandidate: payload => ({ type: actions.STORE_CANDIDATE_REQUEST, payload }),
};

export default actions;
