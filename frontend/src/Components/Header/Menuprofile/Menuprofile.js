import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import styles from "./Menuprofile.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function BasicMenu({ children }) {
  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <Menu
      align="center"
      menuStyle={{
        background: "#D9D9D9",
        borderRadius: "16px",
        minWidth: 200,
      }}
      className={cx("menu-custom")}
      menuButton={
        <MenuButton
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {children}
        </MenuButton>
      }
    >
      <MenuItem
        style={{
          listStyle: "none",
          background: "#176B87",
          borderRadius: "16px",
          maxWidth: 100,
          minHeight: 40,
          margin: "10px auto",
          textAlign: "center",
          color: "white",
        }}
      >
        Change password
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        align="center"
        style={{
          listStyle: "none",
          background: "#176B87",
          borderRadius: "16px",
          maxWidth: 100,
          minHeight: 40,
          margin: "10px auto",
          textAlign: "center",
          color: "white",
        }}
      >
        Logout account
      </MenuItem>
    </Menu>
  );
}
