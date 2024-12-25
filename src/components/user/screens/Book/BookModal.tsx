import WebViewer from '@pdftron/webviewer';
import { Modal, Skeleton, Splitter } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookItemQuery } from 'src/services/index.api';

interface IBookModal {
  bookModal: boolean;
  setBookModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookModal: React.FC<IBookModal> = ({ bookModal, setBookModal }) => {
  const { id } = useParams();
  const workBookRef = React.useRef<HTMLDivElement>(null);
  const studentBookRef = React.useRef<HTMLDivElement>(null);
  const { data: book, isLoading, isSuccess } = useGetBookItemQuery({ id: `${id}` });
  React.useEffect(() => {
    WebViewer(
      { path: 'lib', initialDoc: book?.data.pdfUrl },
      workBookRef.current as HTMLDivElement,
    );
    WebViewer(
      { path: 'lib', initialDoc: book?.data.workBookPdfUrl },
      studentBookRef.current as HTMLDivElement,
    );
  }, [bookModal]);
  return (
    <Modal
      open={bookModal}
      onCancel={() => setBookModal(false)}
      footer={false}
      width="100%"
      centered
    >
      {isSuccess && (
        <Splitter className="h-[90vh]">
          <Splitter.Panel collapsible>
            <div ref={workBookRef} className="w-full h-[90vh] overflow-hidden"></div>
          </Splitter.Panel>
          {book.data?.workBookPdfUrl && (
            <Splitter.Panel collapsible>
              <div ref={studentBookRef} className="w-full h-[90vh] overflow-hidden"></div>
            </Splitter.Panel>
          )}
        </Splitter>
      )}
      {isLoading && <Skeleton />}
    </Modal>
  );
};

export { BookModal };
