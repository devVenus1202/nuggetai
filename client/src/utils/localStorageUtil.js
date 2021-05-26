export const NUGGET_TOKEN = 'NUGGET_TOKEN';
export const NUGGET_USER = 'NUGGET_USER';
export const NUGGET_CANDIDATE = 'NUGGET_CANDIDATE';

export const saveToken = token => {
  localStorage.setItem(NUGGET_TOKEN, token);
};

export const getToken = () => {
  const token = localStorage.getItem(NUGGET_TOKEN);
  return token;
};

export const removeToken = () => {
  localStorage.removeItem(NUGGET_TOKEN);
};

export const saveUser = user => {
  localStorage.setItem(NUGGET_USER, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(NUGGET_USER);
  return user ? JSON.parse(user) : null;
};

export const existUser = () => {
  const user = localStorage.getItem(NUGGET_USER);
  return user ? true : false;
};

export const removeUser = () => {
  removeToken();
  localStorage.removeItem(NUGGET_USER);
};
