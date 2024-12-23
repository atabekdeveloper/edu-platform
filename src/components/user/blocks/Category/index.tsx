import { Skeleton } from 'antd';
import React from 'react';
import { useGetCategoriesQuery } from 'src/services/index.api';
import { useFilterBookStore, useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

const Category: React.FC<{ title?: string }> = ({ title }) => {
  const { categoryId, setCategoryId } = useFilterBookStore();
  const lang = useLangPersistStore((state) => state.lang);
  const { data: category, isLoading } = useGetCategoriesQuery({ page: 1, count: 100 });
  return (
    <article className={`my-10 ${title ? 'shadow py-6 px-7' : 'p-0'} rounded-3xl`}>
      <h2 className="title" hidden={!title}>
        {title}
      </h2>
      <div className="max900:overflow-auto">
        <ul className="flex flex-wrap gap-3 py-4 max900:flex-nowrap">
          {category?.data.map((el: any) => (
            <li
              className={`w-auto px-8 py-2 text-xl rounded-lg shadow cursor-pointer text-nowrap ${
                el._id === categoryId && 'bg-primary text-white'
              }`}
              onClick={() => setCategoryId(el._id)}
              key={el._id}
            >
              {el['name' + capitalizeFirstLetter(lang)]}
            </li>
          ))}
          {isLoading && (
            <div className="flex flex-wrap gap-3 max900:flex-nowrap">
              {[...Array(10)].map((_, i) => (
                <Skeleton.Input key={i} />
              ))}
            </div>
          )}
        </ul>
      </div>
    </article>
  );
};

export { Category };
