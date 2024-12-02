export type TMessage = {
  meta: {
    message: string;
  };
  data: string;
};
export interface SR<T> {
  data: T[];
  meta: {
    message: string;
    statusCode: number;
    currentPage: number;
    count: number;
    total: number;
    totalPages: number;
    token?: {
      access: string;
      refresh: string;
    };
  };
}
export interface SRO<T> {
  data: T;
  meta: {
    message: string;
    statusCode: number;
    currentPage: number;
    count: number;
    total: number;
    totalPages: number;
    token?: {
      access: string;
      refresh: string;
    };
  };
}
export type TGetParamItem = {
  id: number;
  name: string;
};
export type TGetParamsChange = {
  count?: number;
  page?: number;
};
export type TRoleItemTypes = 'admin' | 'parent' | 'student' | 'teacher';
