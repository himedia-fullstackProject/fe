import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";
import errorDisplay from "../api/errorDisplay";
import { addUserInfo, login, saveJwtToken, setRole } from "../redux/userSlice";
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
        new URLSearchParams({ username: email, password: password }),
        {
          withCredentials: true,
        }
      );
      const token = response.headers["authorization"];
      await dispatch(saveJwtToken(token)); // 토큰 저장
      await dispatch(login(email)); // 로그인 상태 업데이트
      await dispatch(setRole(response.data)); // 역할 설정
      console.log(response.data);
      await dispatch(addUserInfo(response.data));
      alert("로그인 성공!!");
      onClose();
      nav("/");
    } catch (error) {
      errorDisplay(error);
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
