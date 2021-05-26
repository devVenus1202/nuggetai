

export const getServerURL = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : 'https://nuggetai.com';
};

export const getEndpoint = URL => `/api/v1/${URL}`;
