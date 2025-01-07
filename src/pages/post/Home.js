// src/pages/Home.js
import React from "react";
import ThBox from "../../components/ThBox";
import MainVisual from "../../components/MainVisual";
import BurgerMenu from "../../components/BurgerMenu";

export default function Home() {
  return (
    <div>
      <MainVisual />
      <div className={style.box_container}>
        <ThBox />
      </div>
    </div>
  );
}
