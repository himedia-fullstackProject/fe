import React from "react";
import ThBox from "../../components/ThBox";
import style from "../../css/home.module.css";
import MainVisual from "../../components/MainVisual";
import { NavLink } from "react-router-dom";
import BurgerMenu from "../../components/BurgerMenu";

export default function Home() {
  return (
    <div>
      <MainVisual />
      <BurgerMenu />
      <div className={style.box_container}>
        <ThBox />
      </div>
    </div>
  );
}
