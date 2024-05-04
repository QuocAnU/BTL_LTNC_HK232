import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function SearchInput(props) {
  const { vehicleOfCar, setVehicleOfCar, tempVehicle } = props;
  const [isFocus, setIsFocus] = React.useState(false);
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearch = (searchValue) => {
    let newVehicle = tempVehicle.filter((item) => {
      return item.ids.includes(searchValue);
    });
    setVehicleOfCar(newVehicle);
    if (vehicleOfCar.length === 0) {
      fetchVehicle();
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onInputChange={(event, newInputValue) => {
          console.log(newInputValue);
          handleSearch(newInputValue); // Gọi hàm xử lý tìm kiếm khi có thay đổi trong ô input
        }}
        options={vehicleOfCar.map((option) => option.ids)}
        renderInput={(params) => (
          <div
            style={{
              display: "flex",
            }}
          >
            <TextField {...params} label="Search Vehicle " />
            {isFocus == false && (
              <SearchIcon
                sx={{
                  color: "primary",
                  fontSize: 30,
                  marginLeft: "-50px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
        )}
      />
    </Stack>
  );
}
