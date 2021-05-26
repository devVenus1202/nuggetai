import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export function* createCandidate() {
  yield takeEvery(actions.CREATE_CANDIDATE_REQUEST, function*({ payload }) {
    const { challengeId, pipelineId, data } = payload;
    const params = {
      url: getEndpoint(`challenge/${challengeId}/${pipelineId}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    try {
      const res = yield call(axios.request, params);
      yield put(actions.createCandidateSuccess(res.data));
    } catch (err) {
      yield put(actions.createCandidateFailed(err));
    }
  });
}

export function* updateCandidate() {
  yield takeEvery(actions.UPDATE_CANDIDATE_REQUEST, function*({ payload }) {
    const { challengeId, pipelineId, userId, data } = payload;
    console.log(payload);
    const params = {
      url: getEndpoint(`challenge/${challengeId}/${pipelineId}/${userId}`),
      method: 'put',
      headers: getHeaders(),
      data,
    };

    try {
      const res = yield call(axios.request, params);
      console.log('res', res);
      yield put(actions.updateCandidateSuccess(data));
    } catch (err) {
      yield put(actions.updateCandidateFailed(err));
    }
  });
}

export function* storeCandidate() {
  yield takeEvery(actions.STORE_CANDIDATE_REQUEST, function*({ payload }) {
    const { data } = payload;
    yield put(actions.setCandidate(data));
  });
}

export function* getCandidate() {
  yield takeEvery(actions.GET_CANDIDATE_REQUEST, function*({ payload }) {
    const { challengeId, pipelineId, userEmail } = payload;
    const params = {
      url: getEndpoint(`challenge/${challengeId}/${pipelineId}/${userEmail}`),
      method: 'get',
      headers: getHeaders(),
    };

    try {
      const res = yield call(axios.request, params);
      yield put(actions.getCandidateSuccess(res.data.candidate));
    } catch (err) {
      yield put(actions.getCandidateFailed(err));
    }
  });
}

export default function* candidateSagas() {
  yield all([
    fork(createCandidate),
    fork(updateCandidate),
    fork(getCandidate),
    fork(storeCandidate),
  ]);
}
