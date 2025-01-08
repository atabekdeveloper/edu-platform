import { api } from 'src/api';

import { SR, SRO, TGetParamsChange, TMessage } from 'src/services/index.types';
import { removeProperties } from 'src/utils';
import { TUserChange, TUserEditChange, TUserItem } from './user.types';

export const fetchGetUsers = async (params: TGetParamsChange): Promise<SR<TUserItem>> => {
  const res = await api.get('/user/user', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchGetAdmins = async (params: TGetParamsChange): Promise<SR<TUserItem>> => {
  const res = await api.get('/user/admin', {
    params: { count: 10, page: params.page },
  });
  return res.data;
};
export const fetchCreateAdmin = async (values: TUserChange): Promise<SRO<TUserItem>> => {
  const res = await api.post('/user/create-admin', values);
  return res.data;
};
export const fetchEditUser = async (values: TUserEditChange): Promise<SRO<TUserItem>> => {
  const res = await api.put('/user', values);
  return res.data;
};
export const fetchUpdateActive = async (values: {
  id: string;
  isActive: boolean;
}): Promise<SRO<TUserItem>> => {
  const res = await api.patch(`/user/active/${values.id}`, removeProperties(values, [], ['id']));
  return res.data;
};
export const fetchUpdatePasswordUserAdmin = async (
  values: TUserChange,
): Promise<SRO<TUserItem>> => {
  const res = await api.patch('/user/update-password', values);
  return res.data;
};
export const fetchDeleteUserAdmin = async (id: string): Promise<TMessage> => {
  const res = await api.delete(`/user/${id}`);
  return res.data;
};
