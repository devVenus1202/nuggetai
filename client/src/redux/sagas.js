import { all } from 'redux-saga/effects';
import adminSagas from './admin/saga';
import authSagas from './auth/saga';
import challengeSagas from './challenge/saga';
import pipelineSagas from './pipeline/saga';
import candidateSagas from './candidate/saga';
import resultSagas from './result/saga';
import sandboxSagas from './sandbox/saga';

export default function* rootSaga(getState) {
  yield all([
    adminSagas(),
    authSagas(),
    challengeSagas(),
    pipelineSagas(),
    candidateSagas(),
    resultSagas(),
    sandboxSagas(),
  ]);
}
