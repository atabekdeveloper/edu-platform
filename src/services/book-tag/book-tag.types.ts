export type TBookTagItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  bookId: string;
  tagId: string;
  __v: number;
};
export type TBookTagChange = {
  bookId: string;
  tagId: string;
};
