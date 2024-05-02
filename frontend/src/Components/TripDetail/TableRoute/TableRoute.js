import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function TableRoute(ids) {
  const [rows, setRows] = React.useState([]);
  const fetchTrip = async () => {
    const listTrip = await axios.post(
      "http://localhost:3001/vehicle/getTripByCar",
      { ids },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRows(listTrip.data);
  };
  React.useEffect(() => {
    fetchTrip();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "#EEF5FF" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
              }}
            >
              Date
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
              }}
            >
              Route ID
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
              }}
            >
              Length&nbsp;(km)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.STT}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.date_start}</TableCell>
              <TableCell align="center">{row.STT}</TableCell>
              <TableCell align="center">{row.distance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
