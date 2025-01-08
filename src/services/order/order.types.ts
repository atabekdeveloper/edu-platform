import { TBookItem } from '../book/book.types';

export type TOrderItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  bookCount: number;
  bookId: TBookItem;
};
export type TOrderChange = {
  _id: string;
  name: string;
};
