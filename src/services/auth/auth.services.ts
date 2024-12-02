import { api } from 'src/api';
import { SRO, TMessage } from 'src/services/index.types';

import { TAuthLogin, TAuthLoginGet, TAuthUserItem } from './auth.types';

export const fetchGetAuth = async (): Promise<SRO<TAuthUserItem>> => {
  const res = await api.get('/auth/user');
  return res.data;
};
export const fetchAuthLogin = async (values: TAuthLogin): Promise<SRO<TAuthLoginGet>> => {
  const res = await api.post('/auth/login', values);
  return res.data;
};
export const fetchAuthRegister = async (values: TAuthLogin): Promise<SRO<TAuthLoginGet>> => {
  const res = await api.post('/auth/register', values);
  return res.data;
};
export const fetchAuthLogout = async (): Promise<TMessage> => {
  const res = await api.delete('/auth/logout');
  return res.data;
};
