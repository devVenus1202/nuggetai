import axios from 'axios';
import { getHeaders } from '../../utils/authUtil';
import { getEndpoint } from '../../utils/urlHelper';

export const updateAdvice = ({ challengeId, pipelineId, userId, advice }) => {
  const data = {
    advice,
  };
  const params = {
    url: getEndpoint(`challenge/${challengeId}/${pipelineId}/${userId}`),
    method: 'put',
    headers: getHeaders(),
    data,
  };

  return axios.request(params);
};

export const getWastonKeywords = text => {
  const data = {
    text,
  };

  const params = {
    url: getEndpoint(`challenge/getWastonKeywords`),
    method: 'post',
    headers: getHeaders(),
    data,
  };

  return axios.request(params);
};
