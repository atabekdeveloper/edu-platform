export type TCategoryItem = {
  _id: string;
  createdAt: string;
  lastUpdatedAt: string;
  nameUz: string;
  nameRu: string;
  nameEng: string;
  bookCount: number;
};
export type TCategoryChange = {
  _id?: string;
  nameUz: string;
  nameRu: string;
  nameEng: string;
};
