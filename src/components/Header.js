import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../css/header.module.css";
import Login from "./Login";
import { FiSearch } from "react-icons/fi";
import { clearUserInfo, logout } from "../redux/userSlice";
import apiClient from "../api/api";
import errorDisplay from "../api/errorDisplay";
import Search from "./Search";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLoginToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleLogout = async () => {
    try {
      await apiClient.post("/logout", null, { withCredentials: true });
    } catch (error) {
      errorDisplay(error);
    }
    dispatch(logout());
    dispatch(clearUserInfo());
    alert("로그아웃 되었습니다.");
    nav("/");
  };

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <div className={style.header_container}>
        <NavLink to="/" className={style.logo}>
          <img src="/logo.png" alt="Logo" />
        </NavLink>
        <div className={style.nav_container}>
          <NavLink
            to="/category/1"
            className={({ isActive }) =>
              isActive ? `${style.navbtn} ${style.active}` : style.navbtn
            }
          >
            Fashion&Beauty
          </NavLink>
          <NavLink
            to="/category/2"
            className={({ isActive }) =>
              isActive
                ? `${style.navshortbtn} ${style.active}`
                : style.navshortbtn
            }
          >
            F&B
          </NavLink>
          <NavLink
            to="/category/3"
            className={({ isActive }) =>
              isActive
                ? `${style.navshortbtn} ${style.active}`
                : style.navshortbtn
            }
          >
            Health
          </NavLink>
          <NavLink
            to="/category/4"
            className={({ isActive }) =>
              isActive ? `${style.navbtn} ${style.active}` : style.navbtn
            }
          >
            Entertainment
          </NavLink>
        </div>
        <div className={style.login_container}>
          <div className={style.search_icon} onClick={setShowSearchBar}>
            <FiSearch size={24} />
          </div>
          {isLoggedIn ? (
            <>
              <button
                className={`${style.signbtn} ${style.menu_button}`}
                onClick={() => nav("/mypage")}
              >
                MY PAGE
              </button>
              <button
                className={`${style.loginbtn} ${style.menu_button}`}
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
                className={`${style.loginbtn} ${style.menu_button}`}
                onClick={handleLoginToggle}
              >
                LOGIN
              </button>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? `${style.signbtn} ${style.active} ${style.menu_button}`
                    : `${style.signbtn} ${style.menu_button}`
                }
              >
                SIGNUP
              </NavLink>
            </>
          )}
        </div>
      </div>
      {showLogin && <Login onClose={handleLoginToggle} />}
      {showSearchBar && <Search onClose={handleSearchBar} />}
    </>
  );
}
