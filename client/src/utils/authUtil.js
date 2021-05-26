import { getToken } from './localStorageUtil';

export const getHeaders = () => {
  const auth = getToken();
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (auth) {
    headers['Authorization'] = auth;
  }
  return headers;
};

export const getFormHeaders = () => {
  const auth = getToken();
  let headers = {
  };
  if (auth) {
    headers['Authorization'] = auth;
  }
  return headers;
};
