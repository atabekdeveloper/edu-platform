import { Button, Skeleton } from 'antd';
import React from 'react';
import { IoBookmarkOutline } from 'react-icons/io5';
import { Img } from 'react-image';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'src/hooks';
import { useCreateUserBookMutation, useGetBooksQuery } from 'src/services/index.api';
import { useAuthPersistStore, useFilterBookStore } from 'src/store';

import notBook from 'src/assets/images/not-book.png';

interface IBook {
  id: string;
  title: string;
}

const Book: React.FC<IBook> = ({ title: bookTitle, id }) => {
  const [limit, setLimit] = React.useState(10);
  const { title, categoryId } = useFilterBookStore();
  const debounceTitle = useDebounce(title);

  const { mutate: createUserBook } = useCreateUserBookMutation();

  const token = useAuthPersistStore((state) => state.accessToken);

  const navigate = useNavigate();

  const {
    data: books,
    isLoading,
    isSuccess,
  } = useGetBooksQuery({
    page: 1,
    count: limit,
    tagIds: [id],
    categoryId,
    title: debounceTitle,
  });
  return (
    <article className="pb-5">
      <h2 className="title" hidden={!(isSuccess && books.data.length)}>
        {bookTitle}
      </h2>
      <ul className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-9">
        {books?.data.map((el) => (
          <li className="px-4 py-5 rounded-md shadow" key={el._id}>
            <div className="px-2 mb-4">
              <Img
                className="object-cover w-full h-full md:h-[300px] lg:h-[300px] xl:h-[200px] rounded-md"
                src={el.imageUrl}
                alt={el.title}
                unloader={
                  <img
                    className="object-contain w-full h-full md:h-[300px] lg:h-[300px] xl:h-[200px] rounded-md"
                    src={notBook}
                    alt={el.title}
                  />
                }
              />
            </div>
            <h3 className="pb-1 text-lg text-primary">{el.title}</h3>
            <h4 className="text-[#8d8d8d] pb-3">{el.author}</h4>
            <div className="flex items-center gap-3">
              <Button
                block
                type="primary"
                onClick={() => (token ? navigate(el._id) : navigate('/login'))}
              >
                Подробно
              </Button>
              <button onClick={() => createUserBook({ bookId: el._id })}>
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
      <div className="flex justify-center" hidden={!(isSuccess && books.data.length)}>
        <button
          className="p-2 rounded-md bg-[#ececec] w-full max-w-[200px]"
          onClick={() => setLimit((prev) => prev + 10)}
        >
          Развернуть
        </button>
      </div>
    </article>
  );
};

export { Book };
