import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function SearchTrip(props) {
  const { fetchTrips, rows, setRows, tempRows } = props;
  const [isFocus, setIsFocus] = React.useState(false);

  const handleSearch = (searchValue) => {
    let newTrips = tempRows.filter((item) => {
      return item.STT.toString().includes(searchValue);
    });
    setRows(newTrips);
    if (newTrips.length === 0) {
      fetchTrips();
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
        options={rows.map((option) => option.STT)}
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
