
import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import actions from './actions';
import { getHeaders, getFormHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';
import { saveUser, removeUser, saveToken } from '../../utils/localStorageUtil';
import authAction from '../../redux/auth/actions';

export function* register() {
  yield takeEvery(actions.REGISTER_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/signup'),
      method: 'post',
      headers: getHeaders(),
      data: payload
    };

    try {
      const res = yield call(axios.request, params);
      yield put(actions.registerSuccess(true));

      //Auto login immediately
      const userInfo = res.data.user;
      const token = res.data.token;
      saveUser(userInfo);
      saveToken(token);
      yield put(actions.loginSuccess(userInfo));
      yield put(push('/'));
    } catch (err) {
      yield put(actions.registerFailed(err.response.data.error));
    }
  });
}

export function* login() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/signin'),
      method: 'post',
      headers: getHeaders(),
      data: payload
    };

    try {
      const res = yield call(axios.request, params);
      const userInfo = res.data.user;
      const token = res.data.token;
      saveUser(userInfo);
      saveToken(token);
      yield put(actions.loginSuccess(userInfo));
    } catch (err) {
      yield put(actions.loginFailed(err.response.data.error));
    }
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT_REQUEST, function*() {
    const params = {
      url: getEndpoint('auth/signout'),
      method: 'post',
      headers: getHeaders()
    };

    try {
      yield call(axios.request, params);
      removeUser();
      yield put(actions.logoutSuccess());
    } catch (err) {
      removeUser();
      yield put(actions.logoutFailed());
    }
  });
}

export function* getProfile() {
  yield takeEvery(actions.GET_PROFILE_REQUEST, function*() {
    const params = {
      url: getEndpoint('auth/user'),
      method: 'get',
      headers: getHeaders()
    };

    try {
      const res = yield call(axios.request, params);
      const user = res.data.user;
      saveUser(user);
      yield put(actions.getProfileSuccess(user));
    } catch (err) {
      yield put(actions.getProfileFailed(err));
    }
  });
}

export function* updateProfile() {
  yield takeEvery(actions.UPDATE_PROFILE_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/user'),
      method: 'put',
      headers: getFormHeaders(),
      data: payload
    };

    try {
      yield call(axios.request, params);
      yield put(actions.updateProfileSuccess());
      yield put(actions.getProfileRequest());
    } catch (err) {
      yield put(actions.updateProfileFailed(err));
    }
  });
}

export function* deleteProfile() {
  yield takeEvery(actions.DELETE_PROFILE_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/user'),
      method: 'delete',
      headers: getHeaders()
    };

    try {
      yield call(axios.request, params);
      yield put(actions.deleteProfileSuccess());
      removeUser();
      yield put(push('/login'));
    } catch (err) {
      yield put(actions.deleteProfileFailed(err));
    }
  });
}

export function* sendPasswordReseteEmail() {
  yield takeEvery(actions.PASSWORD_RESET_EMAIL, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/send-password-reset'),
      method: 'post',
      data: payload
    };

    try {
      yield call(axios.request, params);
      yield put(authAction.sendPasswordResetSuccess());
      yield put(push('/login'));
    } catch (err) {
      console.log(err.response.data.error);
      yield put(actions.sendPasswordResetFailed(err.response.data.error));
    }
  });
}

export function* changePassword() {
  yield takeEvery(actions.CHANGE_PASSWORD, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/change-password'),
      method: 'post',
      data: payload.data,
      headers: getHeaders()
    };

    try {
      yield call(axios.request, params);
      yield put(authAction.changePasswordSuccess());
    } catch (err) {
      yield put(actions.loginFailed(err.response.data.message));
    }
  });
}

export function* validateUser() {
  yield takeEvery(actions.VALIDATE_USER, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/validateUser'),
      method: 'post',
      headers: {
        Authorization: payload.token
      }
    };

    try {
      const res = yield call(axios.request, params);
      const userInfo = res.data.user;
      const token = res.data.token;
      saveUser(userInfo);
      saveToken(token);
      yield put(actions.loginSuccess(userInfo));
      yield put(push('/dashboard'));
    } catch (err) {
      yield put(actions.loginFailed(err.response.data.error));
    }
  });
}

export function* verifyMailRequest() {
  yield takeEvery(actions.VERIFY_MAIL_REQUEST, function*({ payload }) {
    const params = {
      url: getEndpoint('auth/sendverifymailagain'),
      method: 'post',
      headers: getHeaders(),
      data: payload
    };
    console.log('params==', params);
    try {
      const res = yield call(axios.request, params);
      console.log('Saga', res);
      yield put(actions.sendVerifySuccess(res.data.message));
    } catch (err) {
      console.log('err===', err);
      yield put(actions.sendVerifyFailed(err.response.data.error));
    }
  });
}

export default function* authSagas() {
  yield all([
    fork(register),
    fork(login),
    fork(logout),
    fork(getProfile),
    fork(updateProfile),
    fork(deleteProfile),
    fork(sendPasswordReseteEmail),
    fork(changePassword),
    fork(validateUser),
    fork(verifyMailRequest)
  ]);
}
