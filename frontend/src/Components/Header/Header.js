import React from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/MyKar 2.svg";
import title from "../../assets/MybKar.svg";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import AirlineSeatReclineExtraSharpIcon from "@mui/icons-material/AirlineSeatReclineExtraSharp";
import SupportAgentIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const cx = classNames.bind(styles);
function Header() {
  const handleBackHome = () => {
    window.location.href = "/";
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header1")} onClick={handleBackHome}>
        {}
        <img src={title} alt="title" className={cx("title")}></img>
      </div>
      {}
    </div>
  );
}

export default Header;
