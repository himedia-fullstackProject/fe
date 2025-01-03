import React from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/home.module.css";
import MainVisual from "../../components/MainVisual";
import BurgerMenu from "../../components/BurgerMenu";

export default function Home() {
  return (
    <div className={style.home_container}>
      <MainVisual />
      <BurgerMenu />
      <div className={style.box_container}>
        <ThBox />
      </div>
    </div>
  );
}
