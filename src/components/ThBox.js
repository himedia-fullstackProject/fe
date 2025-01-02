import React from "react";
import style from "../css/thbox.module.css";

export default function ThBox() {
  return (
    <div className={style.box_container}>
      <img
        className={style.img}
        alt="img"
        src={"https://via.placeholder.com/150x150/000080"}
      />

      <p className={style.title}>
        아이들 미연 , 갑자기 리즈 갱신한 이유 대공개
      </p>

      <div className={style.author}>by 옷깃허브</div>
    </div>
  );
}
