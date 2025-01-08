import { TBookItem } from '../book/book.types';

export type TUserBookItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  bookCount: number;
  bookId: TBookItem;
};
export type TUserBookChange = {
  _id: string;
  name: string;
};
