import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Category, HomeBanner } from 'src/components/user/blocks';
import { useGetTagsQuery } from 'src/services/index.api';
import { useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const lang = useLangPersistStore((state) => state.lang);
  const { data: tags } = useGetTagsQuery({ page: 1, count: 100 });
  return (
    <section className="container">
      <HomeBanner />
      <Category title={t('category')} />
      {tags?.data.map((tag: any) => (
        <Book key={tag._id} id={tag._id} title={tag[`name${capitalizeFirstLetter(lang)}`]} />
      ))}
    </section>
  );
};

export { Home };
