import style from "../css/thbox.module.css"
import React from "react"

export default function ThBox({ id, imageUrl, title, author }) {
  return (
    <div className={style.box_container}>
      <img
        className={style.img}
        alt={title}
        src={imageUrl || "https://via.placeholder.com/150x150/000080"} // 이미지가 없을 경우 기본 이미지
      />
      <p className={style.post_title}>{title}</p>
      <div className={style.author}>by {author}</div>
    </div>
  );
}