import Axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../environment';
import { AccessToken } from './access-token';

export const axiosInstance = Axios.create({
  baseURL: Environment.backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHeaders = () => {
  const headers: AxiosRequestConfig['headers'] = {};
  const token = AccessToken.get();
  if (token) {
    headers.Authorization = `Bearer ${AccessToken.get()}`;
  }
  return headers;
};
