import React from "react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SliderImage1 from "../assets/SliderImage1.jpg";
import SliderImage2 from "../assets/SliderImage2.jpg";
import SliderImage3 from "../assets/SliderImage3.jpg";
import { Autoplay, Pagination } from "swiper/modules";
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
                src={SliderImage1}
                alt=""
                className="w-1/2 bg-black object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full bg-black">
              <img
                src={SliderImage2}
                alt=""
                className="object-cover w-1/2 bg-black"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full bg-black">
              <img
                src={SliderImage3}
                alt=""
                className="object-cover w-1/2 bg-black"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
