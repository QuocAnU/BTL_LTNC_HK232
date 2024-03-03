import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import styles from "./driverCard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DriverCard = ({ driverData, modalOpen }) => {
    let statusClass = "";
    if (driverData.statusD === "working") {
        statusClass = cx("header-card-status-on");
    }
    if (driverData.statusD === "off") {
        statusClass = cx("header-driver-status-off");
    }
    if (driverData.statusD === "free") {
        statusClass = cx("header-driver-status-free");
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
            }}
        >
            {!modalOpen && <div className={cx("header-card")}>
                <div className={statusClass}></div>
                <div className={cx("header-card-name")}> {driverData.name}</div>
            </div>}

            <CardMedia
                sx={{ height: 120 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {modalOpen && <Typography variant="body2" color="text.white">
                    Full name:{driverData.name}
                </Typography>}
                {modalOpen && <Typography variant="body2" color="text.white">
                    Gender:{driverData.name}
                </Typography>}
                <Typography variant="body2" color="text.white">
                    ID:{driverData.STT}
                </Typography>
                <Typography variant="body2" color="text.white">
                    Phone:{driverData.phone}
                </Typography>
                {modalOpen && <Typography variant="body2" color="text.white">
                    License:{driverData.license}
                </Typography>}
                {modalOpen && <Typography variant="body2" color="text.white">
                    Status:{driverData.statusD}
                </Typography>}
                {modalOpen && <Typography variant="body2" color="text.white">
                    Current car ID:{driverData.ids_car}
                </Typography>}

                <Typography variant="body2" color="text.white">
                    Car:{driverData.vehicleType}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default DriverCard;
