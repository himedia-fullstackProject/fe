import React, { useState } from "react";
import style from "../css/burgermenu.module.css";
import { useNavigate } from "react-router-dom";

export default function BurgerMenu() {
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGoToWrite = () => {
    nav("/write");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <button className={style.menu_item}>글 삭제하기</button>
      </div>
    </div>
  );
}
