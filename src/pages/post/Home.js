// src/pages/Home.js
import React from "react";
import ThBox from "../../components/ThBox";
import MainVisual from "../../components/MainVisual";
import BurgerMenu from "../../components/BurgerMenu";

export default function Home() {
  return (
    <div>
      <MainVisual />
      <BurgerMenu />
      <ThBox /> {/* 전체 포스트를 나열하는 ThBox 컴포넌트 */}
    </div>
  );
}
