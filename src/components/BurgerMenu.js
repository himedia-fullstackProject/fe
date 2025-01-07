import React, { useState } from "react";
import style from "../css/burgermenu.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // useSelector 추가

export default function BurgerMenu() {
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // 로그인 상태 가져오기

  const handleGoToWrite = () => {
    nav("/write");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 로그인 상태에 따라 메뉴 렌더링
  if (!isLoggedIn) {
    return null; // 로그인되지 않은 경우 메뉴를 렌더링하지 않음
  }

  return (
    <div className={style.burger_menu_container}>
      <div
        className={`${style.burger_button} ${isMenuOpen ? style.open : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${style.menu} ${isMenuOpen ? style.menu_open : ""}`}>
        <button className={style.menu_item} onClick={handleGoToWrite}>
          글 작성하기
        </button>
      </div>
    </div>
  );
}
