
import Header from "../../Components/Header/Header";
import styles from "./CarManage.module.scss";
import classNames from "classnames/bind";
import Listcar from "./Listcar/Listcar";

const cx = classNames.bind(styles);

function CarManage() {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <h3>List Of Car Available</h3>
      <Listcar />
    </div>
  );
}

export default CarManage;
