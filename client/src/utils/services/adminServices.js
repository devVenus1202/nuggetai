import axios from 'axios';
import { getHeaders } from '../authUtil';
import { getEndpoint } from '../urlHelper';

export const getWastonCSV = (eventId, wastonType) => {
  const params = {
    url: getEndpoint(`admin/waston_csv/${eventId}/${wastonType}`),
    method: 'get',
    headers: getHeaders(),
  };

  return axios.request(params);
};
