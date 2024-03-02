import styles from "./Listcar.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Card from "../../../Components/Card/Card";
import { Button } from "@mui/material";
const cx = classNames.bind(styles);
function Listcar() {
  const [vehicle, setVehicle] = useState([]);
  const [end, setEnd] = useState(8);
  const handleShowMore = () => {
    setEnd((prev) => prev + 8);
  };
  const fetchVehicle = async () => {
    try {
      const response = await fetch("http://localhost:3001/vehicle/getall");
      const data = await response.json();
      console.log(data);
      setVehicle(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, []);
  let start = 0;
  let newVehicle = vehicle.slice(start, end);
  return (
    <div className={cx("listcar")}>
      {newVehicle.map((item) => {
        return (
          <Card
            key={item._id}
            ids={item.ids}
            type={item.type}
            size={item.size}
            weight={item.weight}
            fuel={item.fuel}
            status={item.status}
          />
        );
      })}
      <Button onClick={handleShowMore} variant="contained">
        More vehicle
      </Button>
    </div>
  );
}

export default Listcar;
