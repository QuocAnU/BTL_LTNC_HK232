import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./ModalTrip.module.scss";
import classNames from "classnames/bind";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#b4d4ff",
  border: "2px solid #000",
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
};

export default function ModalTrip(props) {
  const { open, setOpen, fetchTrips } = props;
  const [start_locaction, setStartLocation] = React.useState("");
  const [end_location, setEndLocation] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [date_expected, setDateExpected] = React.useState(new Date());
  const [distance, setDistance] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [revenue, setRevenue] = React.useState("");
  const [listDriver, setListDriver] = React.useState([]);
  const [driver, setDriver] = React.useState({});
  const fetchDriver = async () => {
    const response = await axios.get(
      "http://localhost:3001/trip/getDriverByEx",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setListDriver(response.data);
  };
  const handleCreateTrip = async () => {
    const data = {
      date_start: date,
      date_expected: date_expected,
      status: "not begin",
      start_location: start_locaction,
      end_location: end_location,
      distance: distance,
      cost: cost,
      revenue: revenue,
      ids_driver: driver.STT,
    };
    const response = await axios.post(
      "http://localhost:3001/trip/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      setOpen(false);
      fetchTrips();
      alert("Create trip success");
    }
  };
  React.useEffect(() => {
    fetchDriver();
  }, []);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            sx={{
              fontFamily: "Monteserrat",
              marginBottom: 2,
            }}
          >
            ADD A NEW TRIP
          </Typography>
          <div className={cx("form-trip")}>
            <div className={cx("location_info")}>
              <div>
                <FormControl fullWidth>
                  <InputLabel htmlFor="start_locaction">From</InputLabel>
                  <Select
                    labelId="start_locaction"
                    id="start_locaction"
                    label="From"
                    value={start_locaction}
                    onChange={(e) => setStartLocation(e.target.value)}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      minWidth: 150,
                      marginRight: 5,
                    }}
                  >
                    <MenuItem value={"Hanoi"}>Hanoi</MenuItem>
                    <MenuItem value={"HCM"}>HCM</MenuItem>
                    <MenuItem value={"Danang"}>Danang</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel htmlFor="end_location">To</InputLabel>
                  <Select
                    labelId="end_location"
                    id="end_location"
                    label="end_location"
                    value={end_location}
                    onChange={(e) => setEndLocation(e.target.value)}
                    sx={{
                      backgroundColor: "#D9D9D9",
                      minWidth: 150,
                    }}
                  >
                    <MenuItem value={"Hue"}>Hue</MenuItem>
                    <MenuItem value={"HCM"}>HCM</MenuItem>
                    <MenuItem value={"Danang"}>Danang</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={cx("date-picker")}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{
                    flex: 1,
                  }}
                >
                  <DatePicker
                    label="Date Departure"
                    sx={{
                      backgroundColor: "#D9D9D9",
                      borderRadius: 2,
                    }}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{
                    flex: 1,
                  }}
                >
                  <DatePicker
                    label="Date Expected"
                    sx={{
                      backgroundColor: "#D9D9D9",
                      borderRadius: 2,
                    }}
                    onChange={(newValue) => {
                      setDateExpected(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className={cx("info-cost")}>
              <TextField
                id="distance"
                label="Distance (km)"
                variant="outlined"
                onChange={(e) => setDistance(e.target.value)}
                sx={{
                  marginTop: 4,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 2,
                  width: "50%",
                }}
              />
              <TextField
                id="cost"
                label="Cost(VND)"
                onChange={(e) => setCost(e.target.value)}
                variant="outlined"
                sx={{
                  marginTop: 4,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 2,
                  width: "50%",
                  marginLeft: 7,
                }}
              />
              <TextField
                id="revenue"
                label="Revenue(VND)"
                variant="outlined"
                onChange={(e) => setRevenue(e.target.value)}
                sx={{
                  marginTop: 4,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 2,
                  width: "50%",
                  marginLeft: 7,
                }}
              />
            </div>
            <div>
              <FormControl
                fullWidth
                sx={{
                  marginTop: 5,
                }}
              >
                <InputLabel htmlFor="driver">Select Driver</InputLabel>
                <Select
                  labelId="driver"
                  id="driver"
                  label="driver"
                  onChange={(e) => {
                    for (let i = 0; i < listDriver.length; i++) {
                      if (listDriver[i].name === e.target.value) {
                        setDriver(listDriver[i]);
                      }
                    }
                  }}
                  sx={{
                    backgroundColor: "#D9D9D9",
                    minWidth: 150,
                  }}
                >
                  {listDriver.map((driver) => {
                    if (driver.status === "free") {
                      return (
                        <MenuItem value={driver.name} key={driver.STT}>
                          {driver.name}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={cx("info-car")}>
              <div className={cx("ids-car")}>
                <p>{driver.ids_car ? driver.ids_car : "IDS OF CAR"}</p>
              </div>
              <div className={cx("type-car")}>
                <p>{driver.vehicleType ? driver.vehicleType : "TYPE OF CAR"}</p>
              </div>
            </div>
          </div>
          <div className={cx("submit-button")}>
            <Button
              variant="contained"
              onClick={handleCreateTrip}
              sx={{
                backgroundColor: "#5e9abd",
                marginTop: 2,
              }}
            >
              Add Trip
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
