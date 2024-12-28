import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/api";
import errorDisplay from "../../api/errorDisplay";
import { addUserInfo } from "../../redux/userSlice";

export default function Join() {
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

  const handleChange = (e) => {
    setInputValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const [isChecked, setIsChecked] = useState(false);
  const checkUsername = async () => {
    if (!inputValue.username) {
      alert("이메일을 입력해주세요");
      return;
    }

    try {
      const response = await apiClient.get(
        `/api/users/check?username=${inputValue.username}`
      );
      if (response.data) {
        alert("이미 사용중인 이메일입니다.");
        setIsChecked(false);
      } else {
        alert("사용 가능한 이메일입니다.");
        setIsChecked(true);
      }
    } catch (error) {
      errorDisplay(error);
      setIsChecked(false);
    }
  };

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("이메일 중복체크를 해주세요.");
      return;
    }
    if (inputValue.password !== inputValue.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }
    const { username, password, nickname, phoneNumber, birthday } = inputValue;

    try {
      const data = {
        id: null,
        username: username,
        password: password,
        nickname: nickname,
        phoneNumber: phoneNumber,
        birthday: birthday,
      };
      const response = await apiClient.post("/api/users/join", data);
      if (response.data) {
        dispatch(addUserInfo(response.data));
        alert("가입에 성공하였습니다.");
        nav("/");
      } else {
        alert("가입에 실패하였습니다. 다시 확인해주세요.");
        return;
      }
    } catch (error) {
      errorDisplay(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitAdd}>
        <h2>회원가입</h2>

        <div>
          <label htmlFor="username">
            아이디 : <span>(필수!!)</span>
          </label>
          <input
            type="username"
            name="username"
            value={inputValue.username}
            onChange={(e) => {
              handleChange(e);
              setIsChecked(false);
            }}
            placeholder="이메일을 입력하세요"
            required
          />
          <button type="button" onClick={checkUsername}>
            {isChecked ? "확인완료" : "중복확인"}
          </button>
        </div>

        <label htmlFor="password">
          비밀번호 : <span>(필수!!)</span>
        </label>
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          required
        />

        <label htmlFor="confirmPassword">
          비밀번호 확인 : <span>(필수!!)</span>
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={inputValue.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />

        <label htmlFor="nickname">닉네임 :</label>
        <input
          type="text"
          name="nickname"
          value={inputValue.nickname}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          required
        />

        <label htmlFor="phoneNumber">전화번호 :</label>
        <input
          type="text"
          name="phoneNumber"
          value={inputValue.phoneNumber}
          onChange={handleChange}
          placeholder="전화번호를 입력하세요"
          required
        />

        <label htmlFor="birthday">생년월일 :</label>
        <input
          type="text"
          name="birthday"
          value={inputValue.birthday}
          onChange={handleChange}
          placeholder="생년월일을 입력하세요 ex) 1998-04-07"
          required
        />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
