import { TRoleItemTypes } from '../index.types';

export type TUserItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  login: string;
  password: string;
  fullName: string;
  phone: string;
  age: string;
  step: number;
  isVerify: boolean;
  role: TRoleItemTypes;
  __v: number;
};
export type TUserChange = {
  phone: string;
  password: string;
  passwordConfirm: string;
};
export type TUserEditChange = {
  fullName: string;
  phone: string;
  role: TRoleItemTypes;
};
