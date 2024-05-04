import styles from "./Trip.module.scss";
import classNames from "classnames/bind";
import TableTrip from "../../Components/TableTrip/TableTrip";
const cx = classNames.bind(styles);

function CarManage() {
  return (
    <div className={cx("wrapper")}>
      <h3
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Trip Management
      </h3>
      <TableTrip />
    </div>
  );
}

export default CarManage;
