import { Modal, Splitter } from 'antd';
import React from 'react';

interface IBookModal {
  workBookRef: React.RefObject<HTMLDivElement>;
  studentBookRef: React.RefObject<HTMLDivElement>;
  bookModal: boolean;
  setBookModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookModal: React.FC<IBookModal> = ({
  bookModal,
  setBookModal,
  workBookRef,
  studentBookRef,
}) => {
  return (
    <Modal
      open={bookModal}
      onCancel={() => setBookModal(false)}
      footer={false}
      width="100%"
      centered
    >
      <Splitter className="h-[90vh]">
        <Splitter.Panel collapsible>
          <div ref={workBookRef} className="w-full h-[90vh] overflow-hidden"></div>
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          <div ref={studentBookRef} className="w-full h-[90vh] overflow-hidden"></div>
        </Splitter.Panel>
      </Splitter>
    </Modal>
  );
};

export { BookModal };
