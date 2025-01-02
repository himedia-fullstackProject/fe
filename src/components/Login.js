import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";
import errorDisplay from "../api/errorDisplay";
import { login, saveJwtToken, setRole } from "../redux/userSlice";
import style from "../css/login.module.css";

export default function Login({ onClose }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        "/login",
        { username: email, password: password }, // JSON 형식으로 요청
        {
          withCredentials: true,
        }
      );

      const token = response.headers["authorization"];
      dispatch(saveJwtToken(token)); // 토큰 저장
      dispatch(login(email)); // 로그인 상태 업데이트
      dispatch(setRole(response.data.role)); // 역할 설정 (response.data.role이 역할 정보라고 가정)

      alert("로그인 성공!!");
      onClose();
      nav("/");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error); // 에러 콘솔 출력
      errorDisplay(error); // 사용자에게 에러 표시
    }
  };

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.login_modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.close_button} onClick={onClose}>
          X
        </button>
        <form onSubmit={handleLogin} className={style.login_container}>
          <h1 className={style.title}>LOGIN</h1>
          <div className={style.input_container}>
            <label htmlFor="email" className={style.email_label}>
              아이디
            </label>
            <input
              type="text"
              name="email"
              placeholder="아이디 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.input_box}
            />
          </div>
          <div className={style.input_container}>
            <label htmlFor="password" className={style.password_label}>
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={style.input_box}
            />
          </div>
          <button type="submit" className={style.login_button}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
