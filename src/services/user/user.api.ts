import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchCreateAdmin,
  fetchDeleteUserAdmin,
  fetchGetAdmins,
  fetchGetUsers,
  fetchUpdatePasswordUserAdmin,
} from './user.services';

const useGetUsersQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetUsers(params),
    queryKey: ['user', ...Object.values(params)],
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
const useGetAdminsQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetAdmins(params),
    queryKey: ['user-admin', ...Object.values(params)],
    onError: (err: any) => message.error(err.response.data.meta.message),
  });

const useCreateAdminMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateAdmin,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-admin'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

const useUpdateUserAdminPasswordMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdatePasswordUserAdmin,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: [''] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

const useDeleteUserMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteUserAdmin,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};
const useDeleteAdminMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchDeleteUserAdmin,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-admin'] });
      message.success(res.meta.message);
    },
    onError: (err: any) => message.error(err.response.data.meta.message),
  });
};

export {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useDeleteUserMutation,
  useGetAdminsQuery,
  useGetUsersQuery,
  useUpdateUserAdminPasswordMutation,
};
