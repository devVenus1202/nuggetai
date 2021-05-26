import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export function* getAllChallenge() {
  yield takeEvery(actions.GET_ALL_CHALLENGE_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('challenge/sandbox'),
      method: 'get',
      headers: getHeaders(),
    };

    try {
      const res = yield call(axios.request, params);
      const { challenges } = res.data;
      yield put(actions.getAllChallengeSuccess(challenges));
    } catch (err) {
      yield put(actions.getAllChallengeFailed(err));
    }
  });
}

export function* getChallenge() {
  yield takeEvery(actions.GET_CHALLENGE_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint(`challenge/${payload}`),
      method: 'get',
      headers: getHeaders(),
    };

    try {
      const res = yield call(axios.request, params);
      const { challenge } = res.data;
      yield put(actions.getChallengeSuccess(challenge));
    } catch (err) {
      yield put(actions.getChallengeFailed(err));
    }
  });
}


export default function* challengeSagas() {
  yield all([    
    fork(getAllChallenge),
    fork(getChallenge),    
  ]);
}
