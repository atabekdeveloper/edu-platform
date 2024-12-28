/* eslint-disable @typescript-eslint/ban-ts-comment */
import WebViewer from '@pdftron/webviewer';
import { Button, Skeleton } from 'antd';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import { Img } from 'react-image';
import { Link, useParams } from 'react-router-dom';
import { useGetBookItemQuery } from 'src/services/index.api';
import { useLangPersistStore, useMyBookPersistStore } from 'src/store';
import { capitalizeFirstLetter, convertToEmbedUrl, isYouTubeVideoUrl } from 'src/utils';
import { BookModal } from './BookModal';

import bookPdf from 'src/assets/Парадокс Шимпанзе. Менеджмент мозга.pdf';

import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import notBook from 'src/assets/images/not-book.png';

const Book: React.FC = () => {
  const { id } = useParams();
  const [bookModal, setBookModal] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { books: localBooks, toggleBookId } = useMyBookPersistStore();

  const { data: book, isLoading } = useGetBookItemQuery({ id: `${id}` });

  const workBookRef = React.useRef<HTMLDivElement>(null);
  const studentBookRef = React.useRef<HTMLDivElement>(null);

  const lang = useLangPersistStore((state) => state.lang);

  React.useEffect(() => {
    if (bookModal && !isInitialized) {
      WebViewer({ path: 'lib', initialDoc: bookPdf }, workBookRef.current as HTMLDivElement);
      WebViewer({ path: 'lib', initialDoc: bookPdf }, studentBookRef.current as HTMLDivElement);
      setIsInitialized(true); // Устанавливаем флаг после выполнения
    }
  }, [bookModal, isInitialized]);

  return (
    <section className="container">
      <BookModal
        workBookRef={workBookRef}
        studentBookRef={studentBookRef}
        bookModal={bookModal}
        setBookModal={setBookModal}
      />
      <div className="flex items-center gap-3 pb-7">
        <Link to="/">Главная</Link>
        <span className="border border-black rounded-sm">
          <GoArrowRight />
        </span>
        <p>{book?.data.title}</p>
      </div>
      <div className="p-10 mb-10 rounded-md shadow">
        <div className="flex flex-col gap-10" hidden={isLoading}>
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex-[0_1_30%]">
              <Img
                className="w-full rounded-md"
                src={`${book?.data.imageUrl}`}
                alt={book?.data.title}
                unloader={
                  <img className="w-full rounded-md" src={notBook} alt={book?.data.title} />
                }
              />
            </div>
            <div className="flex-[0_1_70%] flex flex-col gap-4">
              <h2 className="pb-0 title">{book?.data.title}</h2>
              <ul className="flex flex-wrap gap-2">
                {book?.data.tags?.map((el: any) => (
                  <li
                    className="px-3 py-2 rounded-lg bg-black/5 text-[#5B6871] text-sm"
                    key={el._id}
                  >
                    {el[`name${capitalizeFirstLetter(lang)}`]}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-1">
                  <span>Автор</span>
                  <span className="block w-full border-b border-dashed"></span>
                  <span className="text-nowrap">{book?.data.author}</span>
                </li>
                <li className="flex gap-1">
                  <span>Категория</span>
                  <span className="block w-full border-b border-dashed"></span>
                  <span className="text-nowrap">
                    {/* @ts-ignore */}
                    {book?.data.categoryId[`name${capitalizeFirstLetter(lang)}`]}
                  </span>
                </li>
                <li className="flex gap-1">
                  <span>ISBN</span>
                  <span className="block w-full border-b border-dashed"></span>
                  <span className="text-nowrap">54654544</span>
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
                <button onClick={() => toggleBookId({ id: `${book?.data._id}` })}>
                  {localBooks.includes(`${book?.data._id}`) ? (
                    <IoBookmark className="text-primary" size={24} />
                  ) : (
                    <IoBookmarkOutline size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <p>{book?.data.description}</p>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {book?.data.videos
              .filter((value) => isYouTubeVideoUrl(value))
              .map((link) => (
                <iframe
                  className="w-full h-[200px] md:h-[250px] lg:h-[300px]"
                  src={convertToEmbedUrl(link)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ))}
          </div>
        </div>
        {isLoading && <Skeleton />}
      </div>
    </section>
  );
};

export { Book };
