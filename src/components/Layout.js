import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import style from "../css/layout.module.css";

export default function Layout() {
  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
    </>
  );
}
