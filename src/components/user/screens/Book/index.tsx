import { Button, Skeleton } from 'antd';
import React from 'react';
import { CiBookmark } from 'react-icons/ci';
import { GoArrowRight } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import { useGetBookItemQuery } from 'src/services/index.api';
import { useLangPersistStore } from 'src/store';
import { capitalizeFirstLetter } from 'src/utils';
import { BookModal } from './BookModal';

const Book: React.FC = () => {
  const { id } = useParams();
  const [bookModal, setBookModal] = React.useState(false);
  const { data: book, isLoading } = useGetBookItemQuery({ id: `${id}` });

  const lang = useLangPersistStore((state) => state.lang);
  return (
    <section className="container">
      <BookModal bookModal={bookModal} setBookModal={setBookModal} />
      <div className="flex items-center gap-3 pb-7">
        <Link to="/">Главная</Link>
        <span className="border border-black rounded-sm">
          <GoArrowRight />
        </span>
        <p>{book?.data.title}</p>
      </div>
      <div className="p-10 mb-10 rounded-md shadow">
        <div className="flex flex-col gap-10" hidden={isLoading}>
          <div className="flex gap-10">
            <div className="flex-[0_1_30%]">
              <img className="rounded-md" src={book?.data.imageUrl} alt={book?.data.title} />
            </div>
            <div className="flex-[0_1_70%] flex flex-col gap-4">
              <h2 className="pb-0 title">{book?.data.title}</h2>
              <ul>
                {book?.data.tags?.map((el: any) => (
                  <li key={el._id}>{el[`name${capitalizeFirstLetter(lang)}`]}</li>
                ))}
              </ul>
              <ul className="flex flex-col gap-1">
                <li className="flex gap-1">
                  <span>Автор</span>
                  <span className="block w-full border-b border-dashed"></span>
                  <span>{book?.data.author}</span>
                </li>
                <li className="flex gap-1">
                  <span>ISBN</span>
                  <span className="block w-full border-b border-dashed"></span>
                  <span>54654544</span>
                </li>
              </ul>
              <div className="flex gap-5">
                <Button
                  className="w-[240px]"
                  type="primary"
                  size="large"
                  onClick={() => setBookModal(true)}
                >
                  Начать задание
                </Button>
                <button>
                  <CiBookmark size={24} />
                </button>
              </div>
            </div>
          </div>
          <p>{book?.data.description}</p>
        </div>
        {isLoading && <Skeleton />}
      </div>
    </section>
  );
};

export { Book };
