import { TRoleItemTypes } from '../index.types';

export type TUserItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  login: string;
  password: string;
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
