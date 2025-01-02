// SearchResult.js
import React from "react";
import style from "../../css/searchResult.module.css";

export default function SearchResult({ searchTerm }) {
  return (
    <div className={style.result_container}>
      <h1 className={style.result_title}>
        <span className={style.keyword}>{searchTerm}</span> 검색결과
      </h1>

      <div className={style.posts_grid}>
        {/* 여기는 나중에 API로 받아온 데이터를 map으로 렌더링 */}
        {/* 예시를 위한 더미 데이터 */}
        <div className={style.post_card}>
          <img
            src="/dummy1.jpg"
            alt="post thumbnail"
            className={style.post_image}
          />
          <div className={style.post_info}>
            <h2 className={style.post_title}>
              올해, 가장 많이 사랑받은 뷰티 아이템은?
            </h2>
            <span className={style.post_author}>by 대한민국사람들</span>
          </div>
        </div>
      </div>

      <div className={style.pagination}>
        <button className={`${style.page_button} ${style.active}`}>1</button>
        <button className={style.page_button}>2</button>
        <button className={style.page_button}>3</button>
        <button className={style.page_button}>4</button>
        <button className={style.page_button}>5</button>
        <button className={style.page_button}>6</button>
      </div>
    </div>
  );
}
