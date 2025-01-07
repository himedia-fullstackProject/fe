// src/pages/Home.js
import React from "react";
import MainVisual from "../../components/MainVisual";
import ThBox from "../../components/ThBox";
import style from "../../css/home.module.css";
import BurgerMenu from "../../components/BurgerMenu";

export default function Home() {
  return (
    <div>
      <MainVisual />
      <BurgerMenu />
      <ThBox />
    </div>
  );
}
