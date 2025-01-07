import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/api";
import errorDisplay from "../../api/errorDisplay";
import { addUserInfo } from "../../redux/userSlice";
import style from "../../css/signup.module.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [inputValue, setInputValue] = useState({
    id: null,
    username: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    birthday: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setInputValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "username") {
      setIsChecked(false);
    }
  };

  const checkUsername = async () => {
    if (!inputValue.username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.get(
        `/api/users/check?username=${inputValue.username}`
      );
      if (response.data === false) {
        alert("사용 가능한 아이디입니다.");
        setIsChecked(true);
      } else {
        alert("이미 사용 중인 아이디입니다.");
        setIsChecked(false);
      }
    } catch (error) {
      errorDisplay(error);
    }
  };

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("아이디 중복 체크를 해주세요.");
      return;
    }
    e.preventDefault();
    if (inputValue.password !== inputValue.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }
    const { username, password, nickname, phoneNumber, birthday } = inputValue;

    try {
      const data = {
        id: null,
        username,
        password,
        nickname,
        phoneNumber,
        birthday,
      };
      const response = await apiClient.post("/api/users/join", data);
      if (response.data) {
        dispatch(addUserInfo(response.data));
        alert("가입에 성공하였습니다.");
        nav("/");
      } else {
        alert("가입에 실패하였습니다. 다시 확인해주세요.");
      }
    } catch (error) {
      errorDisplay(error);
    }
  };

  return (
    <div className={style.signup_container}>
      <h2 className={style.signup_title}>SIGNUP</h2>
      <form onSubmit={onSubmitAdd} className={style.input_container}>
        <label htmlFor="username" className={style.input_label}>
          아이디
        </label>
        <div className={style.username_container}>
          <input
            type="text"
            name="username"
            value={inputValue.username}
            onChange={handleChange}
            className={style.input_box}
            placeholder="이메일 아이디 입력"
            required
          />
          <button
            type="button"
            onClick={checkUsername}
            className={style.check_button}
          >
            중복 체크
          </button>
        </div>

        <label htmlFor="password" className={style.input_label}>
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
          className={style.input_box}
          placeholder="비밀번호 입력"
          required
        />

        <label htmlFor="confirmPassword" className={style.input_label}>
          비밀번호 확인
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={inputValue.confirmPassword}
          onChange={handleChange}
          className={style.input_box}
          placeholder="비밀번호 입력"
          required
        />

        <label htmlFor="nickname" className={style.input_label}>
          이름
        </label>
        <input
          type="text"
          name="nickname"
          value={inputValue.nickname}
          onChange={handleChange}
          className={style.input_box}
          placeholder="이름 입력"
          required
        />

        <label htmlFor="phoneNumber" className={style.input_label}>
          전화번호
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={inputValue.phoneNumber}
          onChange={handleChange}
          className={style.input_box}
          placeholder="전화번호 입력"
          required
        />

        <label htmlFor="birthday" className={style.input_label}>
          생년월일
        </label>
        <input
          type="text"
          name="birthday"
          value={inputValue.birthday}
          onChange={handleChange}
          className={style.input_box}
          placeholder="yyyy-mm-dd"
          required
        />

        <button type="submit" className={style.button}>
          SIGNUP
        </button>
      </form>
    </div>
  );
}
