import * as React from "react";
import styles from "./CarManage.module.scss";
import classNames from "classnames/bind";
import Listcar from "./Listcar/Listcar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import axios from "axios";

const cx = classNames.bind(styles);

function CarManage() {
  const notify = () => toast.success("Edit successfully");
  const notifyDelete = () => toast.error("Delete successfully");
  const [vehicleOfCar, setVehicleOfCar] = React.useState([]);
  const [tempVehicle, setTempVehicle] = React.useState([]);
  const fetchVehicle = async () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      try {
        const response = await axios.get(
          "http://localhost:3001/vehicle/getall",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVehicleOfCar(response.data);
        setTempVehicle(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    fetchVehicle();
  }, []);
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

      <h3
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        List Of Car Available
      </h3>
      <SearchInput
        setVehicleOfCar={setVehicleOfCar}
        vehicleOfCar={vehicleOfCar}
        tempVehicle={tempVehicle}
        setTempVehicle={setTempVehicle}
      />
      <Listcar
        notify={notify}
        notifyDelete={notifyDelete}
        vehicleOfCar={vehicleOfCar}
      />
    </div>
  );
}

export default CarManage;
