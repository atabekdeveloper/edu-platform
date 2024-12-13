export type TTagItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  nameUz: string;
  nameRu: string;
  nameEng: string;
  bookCount: number;
};
export type TTagChange = {
  _id?: string;
  nameUz: string;
  nameRu: string;
  nameEng: string;
};
