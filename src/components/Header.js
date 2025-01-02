import React, { useState } from "react";
import style from "../css/header.module.css";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Search from "./Search";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSearchBar, setSearchBar] = useState(false);
  const handleLoginToggle = () => {
    setShowLogin(!showLogin);
  };
  const handleSearchBar = () => {
    setSearchBar(!showSearchBar);
  };
  return (
    <>
      <div className={style.header_container}>
        <NavLink to="/" className={style.logo}>
          <img src="/logo.png" alt="Logo" />
        </NavLink>
        <div className={style.nav_container}>
          <NavLink
            to="/fashion&beauty"
            className={({ isActive }) =>
              isActive ? `${style.navbtn} ${style.active}` : style.navbtn
            }
          >
            Fashion&Beauty
          </NavLink>
          <NavLink
            to="/f&b"
            className={({ isActive }) =>
              isActive
                ? `${style.navshortbtn} ${style.active}`
                : style.navshortbtn
            }
          >
            F&B
          </NavLink>
          <NavLink
            to="/health"
            className={({ isActive }) =>
              isActive
                ? `${style.navshortbtn} ${style.active}`
                : style.navshortbtn
            }
          >
            Health
          </NavLink>
          <NavLink
            to="/entertainment"
            className={({ isActive }) =>
              isActive ? `${style.navbtn} ${style.active}` : style.navbtn
            }
          >
            Entertainment
          </NavLink>
        </div>
        <div className={style.login_container}>
          {/* 검색 버튼 추가 */}
          <div className={style.searchbtn} onClick={handleSearchBar}>
            검색
          </div>
          <div className={style.loginbtn} onClick={handleLoginToggle}>
            LOGIN
          </div>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? `${style.signbtn} ${style.active}` : style.signbtn
            }
          >
            SIGNUP
          </NavLink>
        </div>
      </div>
      {showLogin && <Login onClose={handleLoginToggle} />}
      {showSearchBar && <Search onClose={handleSearchBar} />}
    </>
  );
}
