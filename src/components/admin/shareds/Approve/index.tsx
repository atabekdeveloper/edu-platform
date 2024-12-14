import { Tag } from 'antd';
import React from 'react';
import { BiCheckDouble, BiX } from 'react-icons/bi';

interface IApproveCheck {
  isValue: boolean;
}

const ApproveCheck: React.FC<IApproveCheck> = ({ isValue }) => (
  <Tag icon={isValue ? <BiCheckDouble /> : <BiX />} color={isValue ? 'green' : 'red'} />
);

export { ApproveCheck };
