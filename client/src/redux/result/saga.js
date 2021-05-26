import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export function* addResult() {
  yield takeEvery(actions.ADD_RESULT_REQUEST, function*({ payload }) {
    const { challengeId, pipelineId, user_email, data } = payload;
    const params = {
      url: getEndpoint(`challenge/${challengeId}/${pipelineId}/${user_email}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    try {
      const res = yield call(axios.request, params);
      const { challengeResult } = res.data;
      yield put(actions.addResultSuccess(challengeResult));
    } catch (err) {
      yield put(actions.addResultFailed(err));
    }
  });
}

export function* sendEvent() {
  yield takeEvery(actions.SEND_EVENT_REQUEST, function*({ payload }) {
    const { event_id, data } = payload;
    const params = {
      url: getEndpoint(`event/${event_id}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    try {
      yield call(axios.request, params);
      yield put(actions.sendEventSuccess());
    } catch (err) {
      yield put(actions.sendEventFailed(err));
    }
  });
}


export function* sendAllEvents() {
  yield takeEvery(actions.SEND_ALL_EVENTS_REQUEST, function*({ payload }) {
    const { event_id, data } = payload;
    const params = {
      url: getEndpoint(`event/${event_id}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    try {
      yield call(axios.request, params);
      yield put(actions.sendEventSuccess());
    } catch (err) {
      yield put(actions.sendEventFailed(err));
    }
  });
}

export default function* resultSagas() {
  yield all([
    fork(addResult),
    fork(sendEvent),
  ]);
}
