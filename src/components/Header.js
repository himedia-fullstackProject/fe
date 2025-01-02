import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../css/header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import { logout } from "../redux/userSlice";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLoginToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    nav("/");
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
          {isLoggedIn ? (
            <>
              <button className={style.loginbtn} onClick={() => nav("/mypage")}>
                MY PAGE
              </button>
              <button className={style.loginbtn} onClick={handleLogout}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button className={style.loginbtn} onClick={handleLoginToggle}>
                LOGIN
              </button>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? `${style.signbtn} ${style.active}` : style.signbtn
                }
              >
                SIGNUP
              </NavLink>
            </>
          )}
        </div>
      </div>
      {showLogin && <Login onClose={handleLoginToggle} />}
    </>
  );
}
