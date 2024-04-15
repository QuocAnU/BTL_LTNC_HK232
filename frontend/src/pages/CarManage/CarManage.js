import Header from "../../components/Header/Header";
import styles from "./CarManage.module.scss";
import classNames from "classnames/bind";
import Listcar from "./Listcar/Listcar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);

function CarManage() {
  const notify = () => toast("Edit successfully");
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
      <Header />
      <h3>List Of Car Available</h3>
      <Listcar notify={notify} />
    </div>
  );
}

export default CarManage;
