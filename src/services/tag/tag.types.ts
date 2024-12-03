export type TTagItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  bookCount: number;
};
export type TTagChange = {
  _id?: string;
  name: string;
};
