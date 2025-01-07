import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/search.module.css";
import { fetchSearchPosts, fetchSearchTagPosts } from "../api/postapi";

export default function Search({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("검색어:", searchTerm);

    if (searchTerm.trim()) {
      try {
        setLoading(true);
        const response = await fetchSearchPosts(searchTerm);
        console.log("검색 결과:", response); // 디버깅용

        nav(`/search/result?searchTerms=${encodeURIComponent(searchTerm)}`, {
          state: {
            searchResults: response, // 전체 응답을 그대로 전달
          },
        });
        onClose();
      } catch (error) {
        console.error("검색 실패:", error);
        alert("검색 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTagClick = async (tag) => {
    try {
      setLoading(true);
      const response = await fetchSearchTagPosts(tag);
      console.log("태그 검색 결과:", response);

      nav(`/search/tag?tag=${encodeURIComponent(tag)}`, {
        state: {
          searchResults: response,
          searchTag: tag,
        },
      });
      onClose();
    } catch (error) {
      console.error("태그 검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.search_modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.close_button} onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSearch}>
          <div className={style.search_container}>
            <h2 className={style.title}>LET'S SEARCH</h2>
            <div className={style.search_bar}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요"
                className={style.search_input}
                disabled={loading}
              />
              <button
                type="submit"
                className={style.search_button}
                disabled={loading}
              >
                {loading ? "검색 중..." : "검색하기"}
              </button>
            </div>
          </div>
          <div className={style.tag_section}>
            <h3 className={style.tag_title}>#요즘 떠오르는 TAG는?</h3>
            <div className={style.tag_list}>
              {["서울", "개인", "맛집", "운동", "공부"].map((tag) => (
                <span
                  key={tag}
                  className={style.tag}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
