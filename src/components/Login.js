import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api";
import errorDisplay from "../api/errorDisplay";
import style from "../css/login.module.css";
import { login, saveJwtToken, setRole } from "../redux/userSlice";

export default function Login() {
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
      await dispatch(login(email));
      console.log("토큰:" + token);
      await dispatch(saveJwtToken(token));
      await dispatch(setRole(response.data));
      alert("로그인 성공!!");
      nav("/");
    } catch (error) {
      errorDisplay(error);
    }
  };

  return (
    <div className={style.login_modal}>
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
  );
}
