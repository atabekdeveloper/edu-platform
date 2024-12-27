import { Skeleton } from 'antd';
import React from 'react';
import { Book, Category, HomeBanner } from 'src/components/user/blocks';
import { useGetTagsQuery } from 'src/services/index.api';
import { useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

const Home: React.FC = () => {
  const lang = useLangPersistStore((state) => state.lang);
  const { data: tags, isLoading } = useGetTagsQuery({ page: 1, count: 100 });
  return (
    <section className="container">
      <HomeBanner />
      <Category title="Категорий" />
      {tags?.data.map((tag: any) => (
        <Book key={tag._id} id={tag._id} title={tag[`name${capitalizeFirstLetter(lang)}`]} />
      ))}
      <ul className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-9">
        {isLoading &&
          [...Array(5)].map((_, i) => (
            <li className="px-4 py-5 rounded-md shadow" key={i}>
              <Skeleton.Button style={{ height: '160px', marginBottom: '10px' }} block />
              <Skeleton />
            </li>
          ))}
      </ul>
    </section>
  );
};

export { Home };
