import React from "react";
import MainVisual from "../../components/MainVisual";
import ThBox from "../../components/ThBox";
import style from "../../css/home.module.css";

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
