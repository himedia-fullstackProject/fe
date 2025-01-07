import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../../css/detail.module.css";

export default function Detail() {
  const { id } = useParams();

  return (
    <div className={style.detailContainer}>
      <div className={style.category}>#FASHION</div>

      <div className={style.postHeader}>
        <h1 className={style.title}>
          무해해! 루이 비통 X 무라카미 다카시 리에디션
        </h1>

        <div className={style.postInfo}>
          <span>by 서지원</span>
          <span className={style.date}>2024.12.27</span>
          <div className={style.likes}>
            <span>❤️</span>
            <span>55</span>
          </div>
        </div>

        <div className={style.tags}>
          <span className={style.tag}>#모노그램</span>
          <span className={style.tag}>#루이비통</span>
          <span className={style.tag}>#모노그램</span>
        </div>
      </div>

      <div className={style.postContent}>
        <img
          src="/path-to-image.jpg"
          alt="루이비통 광고"
          className={style.mainImage}
        />

        <div className={style.content}>
          <p>
            흙시 기억하는지? 완록달록한 모노그램이 빛나는 루이 비통의
            가방들을...
          </p>
          <p>그 시절 열리우드 셀럽들의 파파라치 사진에서 반드시 보았을,</p>
          <p>흑은 신곡도 올장 어디가에 꼭이 모서서 있을 그 가방들을.</p>
          <p>바로 루이 비통과 아티스트 무라카미 다사키의 협업 컬렉션이다.</p>
        </div>
      </div>

      <div className={style.actionButtons}>
        <button className={style.editButton}>수정 하기</button>
        <button className={style.deleteButton}>삭제 하기</button>
      </div>
    </div>
  );
}
