import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Post from "./Post";
import style from "../../css/searchResult.module.css";
import { fetchSearchPosts } from "../../api/postApi";

export default function SearchResult() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerms");
  const [resultPosts, setResultPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);

  useEffect(() => {
    console.log("location state:", location.state); // 디버깅용
    if (location.state?.searchResults) {
      // 응답 데이터 구조에 맞게 수정
      const { content, totalPosts, totalPages, firstPage, lastPage, nowPage } =
        location.state.searchResults;
      console.log("content:", content); // 디버깅용
      setResultPosts(content);
      setTotalPosts(totalPosts);
      setTotalPages(totalPages);
      setCurrentPage(nowPage);
      setIsFirstPage(firstPage);
      setIsLastPage(lastPage);
    }
  }, [location.state]);

  console.log("resultPosts:", resultPosts); // 디버깅용

  const handlePageChange = async (newPage) => {
    try {
      const response = await fetchSearchPosts(searchTerm, newPage);
      setResultPosts(response.content);
      setTotalPages(response.totalPages);
      setCurrentPage(response.nowPage);
      setIsFirstPage(response.firstPage);
      setIsLastPage(response.lastPage);
    } catch (error) {
      console.error("페이지 로딩 실패:", error);
    }
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 5; // 한 번에 보여줄 페이지 번호 개수
    let startPage = Math.max(0, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(0, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={style.searchResultContainer}>
      <div className={style.searchHeader}>
        <h2 className={style.searchTerm}>'{searchTerm}' 검색결과</h2>
        <p className={style.totalCount}>총 {totalPosts}개의 게시글</p>
      </div>
      <div className={style.resultGrid}>
        {resultPosts && resultPosts.length > 0 ? (
          resultPosts.map((post) => (
            <Link
              to={`/detail/${post.id}`}
              key={post.id}
              className={style.postCard}
            >
              <div className={style.postImage}>
                <img src={post.image} alt={post.title} />
              </div>
              <div className={style.postContent}>
                <h3 className={style.postTitle}>{post.title}</h3>
                <p className={style.postAuthor}>by {post.username}</p>
                <div className={style.postTags}>
                  {post.tag1 && <span className={style.tag}>#{post.tag1}</span>}
                  {post.tag2 && <span className={style.tag}>#{post.tag2}</span>}
                  {post.tag3 && <span className={style.tag}>#{post.tag3}</span>}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={style.noResults}>검색 결과가 없습니다.</p>
        )}
      </div>
      {totalPages > 0 && (
        <div className={style.pagination}>
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`${style.page_button} ${
                currentPage === pageNum ? style.active : ""
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
