import { Button, Skeleton } from 'antd';
import React from 'react';
import { IoBookmarkOutline } from 'react-icons/io5';
import { useGetBooksQuery } from 'src/services/index.api';

interface IBook {
  title: string;
}

const Book: React.FC<IBook> = ({ title }) => {
  const { data: books, isLoading } = useGetBooksQuery({ page: 1, count: 10 });
  return (
    <article>
      <h2 className="title">{title}</h2>
      <ul className="grid grid-cols-5 pb-10 gap-9">
        {books?.data.map((el) => (
          <li className="px-4 py-5 rounded-md shadow" key={el._id}>
            <div className="px-2 mb-4">
              <img
                className="object-cover w-full h-[200px] rounded-md"
                src={el.imageUrl}
                alt={el.title}
              />
            </div>
            <h3 className="pb-1 text-lg text-primary">{el.title}</h3>
            <h4 className="text-[#8d8d8d] pb-3">{el.author}</h4>
            <div className="flex items-center gap-3">
              <Button block type="primary">
                Смотреть
              </Button>
              <button>
                <IoBookmarkOutline size={24} />
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
      <div className="flex justify-center">
        <button className="p-2 rounded-md bg-[#ececec] w-full max-w-[200px]">Развернуть</button>
      </div>
    </article>
  );
};

export { Book };
