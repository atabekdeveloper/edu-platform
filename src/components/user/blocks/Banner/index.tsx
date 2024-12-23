import { Button } from 'antd';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import banner1 from 'src/assets/images/banner/banner-1.png';

const HomeBanner: React.FC = () => {
  const swiperRef = React.useRef<any>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex); // Устанавливаем слайд при изменении activeIndex
    }
  }, [activeIndex]);
  return (
    <article className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {[...Array(3)].map((_, i) => (
          <SwiperSlide key={i} className="relative bg-[#B9E6FF] py-14 px-11 rounded-3xl">
            <div className="relative z-20 flex flex-col gap-16 max-w-[500px]">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl lg:text-3xl">Описание для баннера</h2>
                <p className="font-light">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam cupiditate
                </p>
              </div>
              <Button className="w-full max-w-44" type="primary" size="large">
                Получить доступ
              </Button>
            </div>
            <img className="absolute bottom-0 right-0 z-10" src={banner1} alt="Banner 1" />
          </SwiperSlide>
        ))}
      </Swiper>
      <ul className="absolute z-20 flex items-end gap-2 -translate-x-1/2 bottom-3 left-1/2">
        {[...Array(3)].map((_, i) => (
          <li
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              activeIndex === i ? 'bg-primary' : 'bg-white'
            }`}
            onClick={() => setActiveIndex(i)}
          ></li>
        ))}
      </ul>
    </article>
  );
};

export { HomeBanner };
