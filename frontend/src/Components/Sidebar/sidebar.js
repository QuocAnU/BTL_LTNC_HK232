import styles from "./sidebar.scss";
import classNames from "classnames/bind";
import { useState } from "react";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("drivermanage");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className={cx("menu")}>
      <div className={cx("logo")}>
        <h2></h2>
      </div>
      <div className={cx("menu-list")}>
        <Link
          to="/admin/drivermanage"
          className={cx("item", {
            "item-selected": activeItem === "drivermanage",
          })}
          onClick={() => handleItemClick("drivermanage")}
        >
          Manager Drivers
        </Link>
        <Link
          to="/admin/carmanage"
          className={cx("item", {
            "item-selected": activeItem === "carmanage",
          })}
          onClick={() => handleItemClick("carmanage")}
        >
          Manager Vehicles
        </Link>
        <a href="/admin/trip" className={cx("item")}>
          Manager Trips
        </a>
      </div>
      <div className={cx("log")}>
        <a href="/" className={cx("logout")}>
          Log out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
