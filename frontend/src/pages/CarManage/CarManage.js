import Header from "../../components/Header/Header";
import styles from "./CarManage.module.scss";
import classNames from "classnames/bind";
import Listcar from "./Listcar/Listcar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);

function CarManage() {
  const notify = () => toast.success("Edit successfully");
  const notifyDelete = () => toast.error("Delete successfully");
  return (
    <div className={cx("wrapper")}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h3>List Of Car Available</h3>
      <Listcar notify={notify} notifyDelete={notifyDelete} />
    </div>
  );
}

export default CarManage;
