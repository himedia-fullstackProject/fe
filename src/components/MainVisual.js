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
      speed={1500}
      modules={[Autoplay]}
    >
      <SwiperSlide className={style.swiper_slide}>
        <img
          src="/main_visual1.png"
          alt="첫 번째 슬라이드"
          style={{ width: "100%", height: "100%" }}
        />
        <p className={style.title}>
          일본 여행, 요즘 핫하게 떠오르고 있는 여행지 TOP5 는?
        </p>
      </SwiperSlide>
      <SwiperSlide className={style.swiper_slide}>
        <img
          src="/main_visual2.png"
          alt="두 번째 슬라이드"
          style={{ width: "100%", height: "100%" }}
        />
        <p className={style.title}>
          올 해 , 가장 많이 사랑받은 뷰티 아이템은 ?
        </p>
      </SwiperSlide>
      <SwiperSlide className={style.swiper_slide}>
        <img
          src="/main_visual3.png"
          alt="세 번째 슬라이드"
          style={{ width: "100%", height: "100%" }}
        />
        <p className={style.title}>인스타 팔로워 8000만 , 로제의 원픽 아이템</p>
      </SwiperSlide>
      <SwiperSlide className={style.swiper_slide}>
        <img
          src="/main_visual4.png"
          alt="네 번째 슬라이드"
          style={{ width: "100%", height: "100%" }}
        />
        <p className={style.title}>
          아이들 미연 , 갑자기 리즈 갱신한 이유 대공개
        </p>
      </SwiperSlide>
    </Swiper>
  );
}
