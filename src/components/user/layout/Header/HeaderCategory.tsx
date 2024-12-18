import { Skeleton } from 'antd';
import React from 'react';
import { useGetCategoriesQuery } from 'src/services/index.api';
import { useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

const HeaderCategory: React.FC = () => {
  const lang = useLangPersistStore((state) => state.lang);
  const { data: category, isLoading } = useGetCategoriesQuery({ page: 1, count: 100 });
  return (
    <ul className="flex flex-col gap-1">
      {category?.data.map((el: any) => (
        <li key={el._id} className="py-3 px-5 cursor-pointer hover:bg-[#dae5ff]">
          {el['name' + capitalizeFirstLetter(lang)]}
        </li>
      ))}
      {isLoading && <Skeleton className="p-5" />}
    </ul>
  );
};

export { HeaderCategory };
