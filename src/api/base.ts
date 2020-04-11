import Axios from 'axios';
import { Environment } from '../environment';
import { AccessToken } from './access-token';

export const axiosInstance = Axios.create({
  baseURL: Environment.backendUrl,
  headers: {
    Authorization: AccessToken.get()
      ? `Bearer ${AccessToken.get()}`
      : undefined,
    'Content-Type': 'application/json',
  },
});
