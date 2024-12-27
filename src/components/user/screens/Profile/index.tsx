import React from 'react';
import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  return (
    <section className="container">
      <div className="flex items-center gap-3 pb-7">
        <Link to="/">Главная</Link>
        <span className="border border-black rounded-sm">
          <GoArrowRight />
        </span>
        <p>Профиль</p>
      </div>
    </section>
  );
};

export { Profile };
