import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import actions from './actions';
import challengeActions from '../challenge/actions';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export function* createPipeline() {
  yield takeEvery(actions.CREATE_PIPELINE_REQUEST, function*({ payload }) {
    const { challenge_id, data } = payload;
    const params = {
      url: getEndpoint(`challenge/${challenge_id}`),
      method: 'post',
      headers: getHeaders(),
      data,
    };

    try {
      const res = yield call(axios.request, params);
      const { pipeline } = res.data;
      yield put(actions.createPipelineSuccess(pipeline));
      yield put(challengeActions.getChallenge(challenge_id));
    } catch (err) {
      yield put(actions.createPipelineFailed(err));
    }
  });
}

export function* deletePipeline() {
  yield takeEvery(actions.DELETE_PIPELINE_REQUEST, function*({ payload }) {
    const { challenge_id, pipeline_id } = payload;
    const params = {
      url: getEndpoint(`challenge/${challenge_id}/${pipeline_id}`),
      method: 'delete',
      headers: getHeaders(),
    };

    try {
      yield call(axios.request, params);
      yield put(actions.deletePipelineSuccess());
      yield put(challengeActions.getChallenge(challenge_id));
    } catch (err) {
      yield put(actions.deletePipelineFaileds(err));
    }
  });
}

export function* updatePipeline() {
  yield takeEvery(actions.UPDATE_PIPELINE_REQUEST, function*({ payload }) {
    const { challenge_id, pipeline_id, data } = payload;
    const params = {
      url: getEndpoint(`challenge/${challenge_id}/${pipeline_id}`),
      method: 'put',
      headers: getHeaders(),
      data,
    };

    try {
      yield call(axios.request, params);
      yield put(actions.updatePipelineSuccess());
      yield put(challengeActions.getChallenge(challenge_id));
    } catch (err) {
      yield put(actions.updatePipelineFaileds(err));
    }
  });
}

export function* benchmarkPipeline() {
  yield takeEvery(actions.BENCHMARK_PIPELINE_REQUEST, function*({ payload }) {
    const { challenge_id, pipeline_id, data } = payload;
    const params = {
      url: getEndpoint(`challenge/benchmark/${challenge_id}/${pipeline_id}`),
      method: 'put',
      headers: getHeaders(),
      data,
    };

    try {
      yield call(axios.request, params);
      yield put(actions.updatePipelineSuccess());
      yield put(challengeActions.getChallenge(challenge_id));
    } catch (err) {
      yield put(actions.updatePipelineFaileds(err));
    }
  });
}

export default function* pipelineSagas() {
  yield all([
    fork(createPipeline),
    fork(deletePipeline),
    fork(updatePipeline),
    fork(benchmarkPipeline),
  ]);
}
