import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import logo from 'src/assets/images/white_logo.svg';

const HomeBanner: React.FC = () => {
  const { t } = useTranslation();
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {[...Array(1)].map((_, i) => (
          <SwiperSlide
            key={i}
            className="relative bg-[#B9E6FF] py-14 md:py-20 px-11 rounded-3xl flex items-center justify-center md:justify-between gap-5 flex-col md:flex-row"
          >
            <div className="relative z-20 flex flex-col gap-16 max-w-[500px]">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl lg:text-3xl">{t('bannerTitle')}</h2>
                <p className="font-light">
                  <span>{t('bannerDesc1')}</span>
                  <br />
                  <span>{t('bannerDesc2')}</span>
                  <br />
                  <span>{t('bannerDesc3')}</span>
                </p>
              </div>
            </div>
            <img className="max-w-[250px] md:max-w-[300px]" src={logo} alt="Logo" />
          </SwiperSlide>
        ))}
      </Swiper>
      <ul className="absolute z-20 flex items-end gap-2 -translate-x-1/2 bottom-3 left-1/2">
        {/* {[...Array(3)].map((_, i) => (
          <li
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              activeIndex === i ? 'bg-primary' : 'bg-white'
            }`}
            onClick={() => setActiveIndex(i)}
          ></li>
        ))} */}
      </ul>
    </article>
  );
};

export { HomeBanner };
