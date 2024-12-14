import React from 'react';

interface IGlobalHead {
  title: string;
  childs?: React.ReactNode[];
}

const GlobalHead: React.FC<IGlobalHead> = ({ title, childs }) => (
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-medium">{title}</h3>
    <ul className="flex items-center gap-3">
      {childs?.map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </ul>
  </div>
);

export { GlobalHead };
