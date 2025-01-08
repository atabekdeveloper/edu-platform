import { message } from 'antd';
import { TGetParamsChange } from 'src/services/index.types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleError } from 'src/utils';
import {
  fetchCreateAdmin,
  fetchDeleteUserAdmin,
  fetchEditUser,
  fetchGetAdmins,
  fetchGetUsers,
  fetchUpdateActive,
  fetchUpdatePasswordUserAdmin,
} from './user.services';

const useGetUsersQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetUsers(params),
    queryKey: ['user', ...Object.values(params)],
    onError: handleError,
  });
const useGetAdminsQuery = (params: TGetParamsChange) =>
  useQuery({
    queryFn: () => fetchGetAdmins(params),
    queryKey: ['user-admin', ...Object.values(params)],
    onError: handleError,
  });

const useCreateAdminMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateAdmin,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user-admin'] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};

const useEditUserMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchEditUser,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: [''] });
      message.success(res.meta.message);
    },
    onError: handleError,
  });
};
const useUpdateActiveMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdateActive,
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: ['user'] });
      message.success(res.meta.message);
    },
    onError: handleError,
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
    onError: handleError,
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
    onError: handleError,
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
    onError: handleError,
  });
};

export {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAdminsQuery,
  useGetUsersQuery,
  useUpdateActiveMutation,
  useUpdateUserAdminPasswordMutation,
};
