import React from 'react';
import { Book, Category, HomeBanner } from 'src/components/user/blocks';
import { useGetTagsQuery } from 'src/services/index.api';
import { useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

const Home: React.FC = () => {
  const lang = useLangPersistStore((state) => state.lang);
  const { data: tags } = useGetTagsQuery({ page: 1, count: 100 });
  return (
    <section className="container">
      <HomeBanner />
      <Category title="Категорий" />
      {tags?.data.map((tag: any) => (
        <Book key={tag._id} id={tag._id} title={tag[`name${capitalizeFirstLetter(lang)}`]} />
      ))}
    </section>
  );
};

export { Home };
