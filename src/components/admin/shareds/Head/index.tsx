import React from 'react';

interface IGlobalHead {
  title: string;
  filterChilds?: React.ReactNode[];
  childs?: React.ReactNode[];
}

const GlobalHead: React.FC<IGlobalHead> = ({ title, childs, filterChilds }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-5">
      <h3 className="text-xl font-medium">{title}</h3>
      <ul className="flex items-center gap-3">
        {childs?.map((el, i) => (
          <li key={i}>{el}</li>
        ))}
      </ul>
    </div>
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {filterChilds?.map((el, i) => (
        <li className="w-full" key={i}>
          {el}
        </li>
      ))}
    </ul>
  </div>
);

export { GlobalHead };
