import actions from './actions';
import { getUser, existUser } from '../../utils/localStorageUtil';

const initState = {
  user: getUser(),
  isLoggedIn: existUser(),
  registerStatus: false,
  errorMsg: null,
  sucessMsg: null,
  loading: false
};

export default function AuthReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.REGISTER_REQUEST:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        registerStatus: false,
        errorMsg: null
      };

    case actions.REGISTER_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        registerStatus: payload,
        errorMsg: null
      };

    case actions.REGISTER_FAILED:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        registerStatus: false,
        errorMsg: payload
      };

    case actions.VERIFY_MAIL_SUCCESS:
      return {
        ...state,
        sucessMsg: payload,
        errorMsg: null
      };

    case actions.VERIFY_MAIL_FAILED:
      return {
        ...state,
        registerStatus: false,
        sucessMsg: null,
        errorMsg: payload
      };
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        errorMsg: null
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
        errorMsg: null
      };

    case actions.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
        errorMsg: payload
      };

    case actions.LOGOUT_REQUEST:
      return {
        ...state,
        errorMsg: null
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        errorMsg: null
      };

    case actions.LOGOUT_FAILED:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        errorMsg: null
      };

    case actions.GET_PROFILE_REQUEST:
      return {
        ...state,
        errorMsg: null
      };

    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload,
        errorMsg: null
      };

    case actions.GET_PROFILE_FAILED:
      return {
        ...state,
        errorMsg: payload
      };

    case actions.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        errorMsg: null
      };

    case actions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        errorMsg: null
      };

    case actions.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        errorMsg: payload
      };

    case actions.DELETE_PROFILE_REQUEST:
      return {
        ...state,
        errorMsg: null
      };

    case actions.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        errorMsg: null
      };

    case actions.DELETE_PROFILE_FAILED:
      return {
        ...state,
        errorMsg: payload
      };
    case actions.PASSWORD_RESET_EMAIL:
      return {
        ...state,
        loading: true,
        errorMsg: null
      };
    case actions.PASSWORD_RESET_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: null
      };
    case actions.PASSWORD_RESET_EMAIL_FAILED:
      console.log(payload);
      return {
        ...state,
        loading: false,
        errorMsg: payload
      };
    case actions.CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
        errorMsg: null
      };
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: null
      };
    case actions.VALIDATE_USER:
      return {
        ...state,
        loading: true,
        errorMsg: null
      };
    default:
      return state;
  }
}
