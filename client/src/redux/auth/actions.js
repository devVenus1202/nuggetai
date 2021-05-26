const actions = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILED: 'REGISTER_FAILED',

  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',

  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILED: 'LOGOUT_FAILED',

  GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILED: 'GET_PROFILE_FAILED',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILED: 'UPDATE_PROFILE_FAILED',

  DELETE_PROFILE_REQUEST: 'DELETE_PROFILE_REQUEST',
  DELETE_PROFILE_SUCCESS: 'DELETE_PROFILE_SUCCESS',
  DELETE_PROFILE_FAILED: 'DELETE_PROFILE_FAILED',

  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',

  PASSWORD_RESET_EMAIL: 'PASSWORD_RESET_EMAIL',
  PASSWORD_RESET_EMAIL_SUCCESS: 'PASSWORD_RESET_SUCCESS',
  PASSWORD_RESET_EMAIL_FAILED: 'PASSWORD_RESET_FAILED',

  VALIDATE_USER: 'VALIDATE_USER',
  VALIDATE_USER_SUCCESS: 'VALIDATE_USER_SUCCESS',

  VERIFY_MAIL_REQUEST: 'VERIFY_MAIL_REQUEST',
  VERIFY_MAIL_SUCCESS: 'VERIFY_MAIL_SUCCESS',
  VERIFY_MAIL_FAILED: 'VERIFY_MAIL_FAILED',

  registerRequest: (payload) => ({ type: actions.REGISTER_REQUEST, payload }),
  registerSuccess: (payload) => ({ type: actions.REGISTER_SUCCESS, payload }),
  registerFailed: (payload) => ({ type: actions.REGISTER_FAILED, payload }),

  sendVerifyRequest: (payload) => ({ type: actions.VERIFY_MAIL_REQUEST, payload }),
  sendVerifySuccess: (payload) => ({ type: actions.VERIFY_MAIL_SUCCESS, payload }),
  sendVerifyFailed: (payload) => ({ type: actions.VERIFY_MAIL_FAILED, payload }),

  loginRequest: (payload) => ({ type: actions.LOGIN_REQUEST, payload }),
  loginSuccess: (payload) => ({ type: actions.LOGIN_SUCCESS, payload }),
  loginFailed: (payload) => ({ type: actions.LOGIN_FAILED, payload }),

  logoutRequest: () => ({ type: actions.LOGOUT_REQUEST }),
  logoutSuccess: () => ({ type: actions.LOGOUT_SUCCESS }),
  logoutFailed: () => ({ type: actions.LOGOUT_FAILED }),

  getProfileRequest: () => ({ type: actions.GET_PROFILE_REQUEST }),
  getProfileSuccess: (payload) => ({
    type: actions.GET_PROFILE_SUCCESS,
    payload
  }),
  getProfileFailed: (payload) => ({ type: actions.GET_PROFILE_FAILED, payload }),

  updateProfile: (payload) => ({ type: actions.UPDATE_PROFILE_REQUEST, payload }),
  updateProfileSuccess: (payload) => ({
    type: actions.UPDATE_PROFILE_SUCCESS,
    payload
  }),
  updateProfileFailed: (payload) => ({
    type: actions.UPDATE_PROFILE_FAILED,
    payload
  }),

  deleteProfile: () => ({ type: actions.DELETE_PROFILE_REQUEST }),
  deleteProfileSuccess: () => ({ type: actions.DELETE_PROFILE_SUCCESS }),
  deleteProfileFailed: (payload) => ({
    type: actions.DELETE_PROFILE_FAILED,
    payload
  }),

  sendPasswordReset: (payload) => ({
    type: actions.PASSWORD_RESET_EMAIL,
    payload
  }),
  sendPasswordResetSuccess: () => ({
    type: actions.PASSWORD_RESET_EMAIL_SUCCESS
  }),
  sendPasswordResetFailed: (payload) => ({
    type: actions.PASSWORD_RESET_EMAIL_FAILED,
    payload
  }),
  changePassword: (payload) => ({ type: actions.CHANGE_PASSWORD, payload }),
  changePasswordSuccess: () => ({ type: actions.CHANGE_PASSWORD_SUCCESS }),

  validateUser: (payload) => ({ type: actions.VALIDATE_USER, payload }),
  validateUserSuccess: (payload) => ({
    type: actions.VALIDATE_USER_SUCCESS,
    payload
  })
};

export default actions;
