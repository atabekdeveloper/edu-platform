import { TCategoryItem } from '../category/category.types';
import { TTagItem } from '../tag/tag.types';

export type TBookItem = {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  imageUrl: string;
  pdfUrl: string;
  category: TCategoryItem;
  tags: TTagItem[];
};
export type TBookChange = {
  _id: string;
  title: string;
  description?: string;
  author: string;
  isbn: string;
  categoryId: number;
  book: any;
  videos: string[];
  workBook?: any;
  image: any;
  tagIds?: number[];
};
export type TBookItemParams = {
  title?: string;
  author?: string;
  categoryId?: string | null;
  tagIds?: string[];
};
