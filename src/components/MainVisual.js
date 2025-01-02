import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import style from "../css/mainvisual.module.css";

export default function MainVisual() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <img
          src="/main_visual.png"
          alt="일본 여행, 요즘 핫하게 떠오르고 있는 여행지 TOP5"
          style={{ width: "100%", height: "auto" }}
        />
        <p className={style.title}>
          일본 여행, 요즘 핫하게 떠오르고 있는 여행지 TOP5
        </p>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/main_visual.png"
          alt="두 번째 슬라이드"
          style={{ width: "100%", height: "auto" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/main_visual.png"
          alt="세 번째 슬라이드"
          style={{ width: "100%", height: "auto" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/main_visual.png"
          alt="네 번째 슬라이드"
          style={{ width: "100%", height: "auto" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
