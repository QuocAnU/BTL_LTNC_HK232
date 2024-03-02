import React from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/MyKar 2.svg";
import title from "../../assets/MybKar.svg";
import HomeIcon from "@mui/icons-material/Home";
import ListSharpIcon from "@mui/icons-material/ListSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import AirlineSeatReclineExtraSharpIcon from "@mui/icons-material/AirlineSeatReclineExtraSharp";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const cx = classNames.bind(styles);
function Header() {
  const handleBackHome = () => {
    window.location.href = "/";
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header1")} onClick={handleBackHome}>
        <img src={logo} alt="logo" className={cx("logo")}></img>
        <img src={title} alt="title" className={cx("title")}></img>
      </div>
      <div className={cx("action")}>
        <div>
          <HomeIcon className={cx("action-icon")} sx={{ fontSize: 40 }} />
          <div className={cx("active")}></div>
        </div>
        <div>
          <LocalShippingSharpIcon
            className={cx("action-icon")}
            sx={{ fontSize: 40 }}
          />
          <div className={cx("active")}></div>
        </div>
        <div>
          <AirlineSeatReclineExtraSharpIcon
            className={cx("action-icon")}
            sx={{ fontSize: 40 }}
          />
          <div className={cx("active")}></div>
        </div>
        <div>
          <ListSharpIcon className={cx("action-icon")} sx={{ fontSize: 40 }} />
          <div className={cx("active")}></div>
        </div>
      </div>
      <div className={cx("search")}>
        <PhoneIcon className={cx("search-icon1")} sx={{ fontSize: 40 }} />
        <h3 className={cx("search-icon1")}>Hotline: 0842870089</h3>
        <AccountCircleIcon
          className={cx("search-icon2")}
          sx={{ fontSize: 40 }}
        />
      </div>
    </div>
  );
}

export default Header;
