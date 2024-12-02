import { TRoleItemTypes } from '../index.types';

export type TAuthLogin = {
  phone: string;
  password: string;
};
export type TAuthRegister = {
  fullName: string;
  phone: string;
  role: TRoleItemTypes;
  password: string;
  passwordConfirm: string;
};
export type TAuthLoginGet = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  idNumber: number;
  fullName: string;
  phone: string;
  password: string;
  role: TRoleItemTypes;
  __v: 0;
};
export type TAuthUserItem = {
  id: number;
  name: string;
  phone: string;
  role_id: number;
  role_name: TRoleItemTypes;
};
