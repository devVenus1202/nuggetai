import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import { getHeaders, getFormHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export function* createChallenge() {
  yield takeEvery(actions.CREATE_CHALLENGE_REQUEST, function*({ payload }) {
    const { challenge, pipeline } = payload;
    const params = {
      url: getEndpoint('challenge'),
      method: 'post',
      headers: getFormHeaders(),
      data: challenge,
    };

    try {
      const res = yield call(axios.request, params);
      const { challenge } = res.data;

      if (pipeline) {
        const pipelineParams = {
          url: getEndpoint(`challenge/${challenge._id}`),
          method: 'post',
          headers: getHeaders(),
          data: pipeline,
        };

        const resPipeline = yield call(axios.request, pipelineParams);
        challenge.pipeline = resPipeline.data.pipeline;
      }

      yield put(actions.createChallengeSuccess(challenge));
    } catch (err) {
      yield put(actions.createChallengeFailed(err));
    }
  });
}

export function* getAllChallenge() {
  yield takeEvery(actions.GET_ALL_CHALLENGE_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('challenge'),
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

export function* updateChallenge() {
  yield takeEvery(actions.UPDATE_CHALLENGE_REQUEST, function*({ payload }) {
    const { challengeId, data } = payload;

    const params = {
      url: getEndpoint(`challenge/${challengeId}`),
      method: 'put',
      headers: getHeaders(),
      data,
    };

    try {
      yield call(axios.request, params);
      yield put(actions.updateChallengeSuccess(data));
      yield put(actions.getAllChallenge());
    } catch (err) {
      yield put(actions.updateChallengeFailed(err));
    }
  });
}

export function* deleteChallenge() {
  yield takeEvery(actions.DELETE_CHALLENGE_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint(`challenge/${payload}`),
      method: 'delete',
      headers: getHeaders(),
    };

    try {
      yield call(axios.request, params);
      yield put(actions.deleteChallengeSuccess());
      yield put(actions.getAllChallenge());
    } catch (err) {
      yield put(actions.deleteChallengeFailed(err));
    }
  });
}

export default function* challengeSagas() {
  yield all([
    fork(createChallenge),
    fork(getAllChallenge),
    fork(getChallenge),
    fork(deleteChallenge),
    fork(updateChallenge),
  ]);
}
