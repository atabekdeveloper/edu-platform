import { Button, Skeleton } from 'antd';
import React from 'react';
import { IoBookmark } from 'react-icons/io5';
import { Img } from 'react-image';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteUserBookMutation, useGetUserBooksQuery } from 'src/services/index.api';
import { useAuthPersistStore } from 'src/store';

import { useTranslation } from 'react-i18next';
import { GoArrowRight } from 'react-icons/go';
import notBook from 'src/assets/images/not-book.png';

const MyBook: React.FC = () => {
  const { mutate: deleteUserBook } = useDeleteUserBookMutation();

  const { t } = useTranslation();

  const token = useAuthPersistStore((state) => state.accessToken);
  const userId = useAuthPersistStore((state) => state.id);

  const navigate = useNavigate();

  const { data: books, isLoading } = useGetUserBooksQuery({
    page: 1,
    count: 100,
    _id: `${userId}`,
  });
  return (
    <section className="container">
      <div className="flex items-center gap-3 pb-7">
        <Link to="/">{t('main')}</Link>
        <span className="border border-black rounded-sm">
          <GoArrowRight />
        </span>
        <p>{t('myBook')}</p>
      </div>
      <article className="pb-5">
        <h2 className="title">{t('myBook')}</h2>
        <ul className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-9">
          {books?.data.map((el) => (
            <li className="px-4 py-5 rounded-md shadow" key={el._id}>
              <div className="px-2 mb-4">
                <Img
                  className="object-cover w-full h-full md:h-[300px] lg:h-[300px] xl:h-[200px] rounded-md"
                  src={el.bookId.imageUrl}
                  alt={el.bookId.title}
                  unloader={
                    <img
                      className="object-contain w-full h-full md:h-[300px] lg:h-[300px] xl:h-[200px] rounded-md"
                      src={notBook}
                      alt={el.bookId.title}
                    />
                  }
                />
              </div>
              <h3 className="pb-1 text-lg text-primary">{el.bookId.title}</h3>
              <h4 className="text-[#8d8d8d] pb-3">{el.bookId.author}</h4>
              <div className="flex items-center gap-3">
                <Button
                  block
                  type="primary"
                  onClick={() => (token ? navigate(`/${el.bookId._id}`) : navigate('/login'))}
                >
                  {t('minutely')}
                </Button>
                <button onClick={() => deleteUserBook(el.bookId._id)}>
                  <IoBookmark className="text-primary" size={24} />
                </button>
              </div>
            </li>
          ))}
          {isLoading &&
            [...Array(5)].map((_, i) => (
              <li className="px-4 py-5 rounded-md shadow" key={i}>
                <Skeleton.Button style={{ height: '160px', marginBottom: '10px' }} block />
                <Skeleton />
              </li>
            ))}
        </ul>
      </article>
    </section>
  );
};

export { MyBook };
