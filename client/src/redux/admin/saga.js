import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export function* getAllUser() {
  yield takeEvery(actions.GET_ALL_USERS_REQUEST, function*() {
    const params = {
      url: getEndpoint('admin/users'),
      method: 'get',
      headers: getHeaders(),
    };

    try {
      const res = yield call(axios.request, params);
      yield put(actions.getAllUsersSuccess(res.data.users));
    } catch (err) {
      yield put(actions.getAllUsersFailed(err));
    }
  });
}

export function* getUserChallenges() {
  yield takeEvery(actions.GET_USER_CHALLENGES_REQUEST, function*({ payload }) {

    const params = {
      url: getEndpoint(`admin/${payload}/challenges`),
      method: 'get',
      headers: getHeaders(),
    };

    try {
      const res = yield call(axios.request, params);
      yield put(actions.getUserChallengesSuccess(res.data.challenges));
    } catch (err) {
      yield put(actions.getUserChallengesFailed(err));
    }
  });
}

export function* getPipelines() {
  yield takeEvery(actions.GET_PIPELINES_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint(`admin/${payload}/pipelines`),
      method: 'get',
      headers: getHeaders(),
    };

    try {
      const res = yield call(axios.request, params);
      yield put(actions.getPipelinesSuccess(res.data.pipelines));
    } catch (err) {
      yield put(actions.getPipelinesFailed(err));
    }
  });
}

export default function* adminSagas() {
  yield all([
    fork(getAllUser),
    fork(getUserChallenges),
    fork(getPipelines),
  ]);
}
