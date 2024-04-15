import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import image from "../../assets/alt.avif";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const cx = classNames.bind(styles);
export default function MediaCard({
  ids,
  type,
  size,
  weight,
  fuel,
  status,
  urlimage,
}) {
  let statusClass = "";
  if (status === "on") {
    statusClass = cx("header-card-status-on");
  }
  if (status === "off") {
    statusClass = cx("header-card-status-off");
  }
  if (status === "maintain") {
    statusClass = cx("header-card-status-maintain");
  }
  if (urlimage === "") {
    urlimage = image;
  }
  return (
    <Card
      sx={{
        minWidth: 230,
        maxWidth: 300,
        background: "#176B87",
        color: "white",
        borderRadius: 5,
        margin: 5,
        cursor: "pointer",
      }}
    >
      <div className={cx("header-card")}>
        <div className={statusClass}></div>
        <div className={cx("header-card-name")}>Type: {type}</div>
      </div>
      <CardMedia style={{ width: "100%", height: 150, marginTop: 20 }}>
        <img
          src={urlimage}
          alt="vehicle"
          style={{ width: "70%", height: "150px", borderRadius: "10px" }}
        />
      </CardMedia>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          Information
        </Typography>
        <Typography variant="body2" color="text.white">
          IDS:{ids}
        </Typography>
        <Typography variant="body2" color="text.white">
          Size:{size}
        </Typography>
        <Typography variant="body2" color="text.white">
          Weight:{weight}
        </Typography>
        <Typography variant="body2" color="text.white">
          Fuel:{fuel}
        </Typography>
        <CardContent>
          <Button
            variant="contained"
            style={{
              background: "#FFFFFF",
              color: "black",
            }}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            style={{ background: "#FFFFFF", color: "black" }}
          >
            <DeleteIcon />
          </Button>
        </CardContent>
      </CardContent>
    </Card>
  );
}
