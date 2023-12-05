import React from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SliderImage from "../assets/SliderImage1.jpg";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Slider = () => {
  return (
    <div className="flex justify-center">
      <div className="h-[70vh] w-[100%]">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                src="https://images.bewakoof.com/uploads/grid/app/DOTW-Split-banner-Desktop-Men--15--1701671265.jpg"
                alt=""
                className="object-contain w-1/2 bg-black"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full bg-black">
              <img src={SliderImage} alt=""  className="object-contain w-1/2 bg-black"/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="w-full h-full bg-black">
              <img src={SliderImage} alt=""  className="object-contain w-1/2 bg-black"/>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
