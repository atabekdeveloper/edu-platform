import React from 'react';
import { Book, Category, HomeBanner } from 'src/components/user/blocks';

const Home: React.FC = () => {
  return (
    <section className="container">
      <HomeBanner />
      <Category title="Категорий" />
      <Book title="Популярные учебники" />
    </section>
  );
};

export { Home };
