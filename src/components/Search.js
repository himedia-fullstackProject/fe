import React, { useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/search.module.css";
import SearchResult from "../pages/result/SearchResult";

export default function Search({ onClose }) {
  //검색 + 해쉬태그
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate(); // 검색결과페이지 라우트

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // nav(`/search/result?keyword=${searchTerm}`);받아올 키워드
      nav(`/search/result`);
      onClose();
    }
    try {
    } catch (error) {}
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.search_modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.close_button} onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSearch} className={style.search_container}>
          <h2 className={style.title}>LET'S SEARCH</h2>

          <div className={style.category_wrapper}>
            <select className={style.category_select}>
              <option value="">대분류 카테고리</option>
              {/* 대분류 옵션들 */}
            </select>

            <select className={style.category_select}>
              <option value="">소분류 카테고리</option>
              {/* 소분류 옵션들 */}
            </select>
          </div>

          <div className={style.search_wrapper}>
            <select className={style.search_type}>
              <option value="">선택하세요</option>
              {/* 검색 타입 옵션들 */}
            </select>

            <div className={style.search_bar}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className={style.search_input}
              />
              <button type="submit" className={style.search_button}>
                검색하기
              </button>
            </div>
          </div>

          <div className={style.tag_section}>
            <h3 className={style.tag_title}>#요즘 떠오르는 TAG는?</h3>
            <div className={style.tag_list}>
              <span className={style.tag}>#일상</span>
              <span className={style.tag}>#일상</span>
              <span className={style.tag}>#일상</span>
              <span className={style.tag}>#일상</span>
              <span className={style.tag}>#일상</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
