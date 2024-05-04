import styles from "./Listcar.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { Button } from "@mui/material";
import TransitionsModal from "../Modal/Modal";
import axios from "axios";

const cx = classNames.bind(styles);
function Listcar({ notify, notifyDelete, vehicleOfCar }) {
  const [vehicle, setVehicle] = useState([]);

  const [end, setEnd] = useState(8);
  const handleShowMore = () => {
    setEnd((prev) => prev + 8);
  };
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
        setVehicle(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, []);
  let start = 0;
  let newVehicle = vehicleOfCar.slice(start, end);

  return (
    <div className={cx("listcar")}>
      {newVehicle.map((item) => {
        if (!item.deleted) {
          return (
            <Card
              key={item._id}
              ids={item.ids}
              type={item.type}
              size={item.size}
              weight={item.weight}
              fuel={item.fuel}
              status={item.status}
              urlimage={item.urlimage}
              notify={notify}
              notifyDelete={notifyDelete}
              fetchVehicle={fetchVehicle}
            />
          );
        }
      })}
      <div className={cx("listcar-button")}>
        <div></div>
        <Button onClick={handleShowMore} variant="contained">
          More vehicle
        </Button>
        <TransitionsModal>
          <Button variant="contained" className={cx("custom-button")}>
            Add vehicle
          </Button>
        </TransitionsModal>
      </div>
    </div>
  );
}

export default Listcar;
