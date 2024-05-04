import * as React from "react";
import Card from "@mui/material/Card";
import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import EditModalDriver from "../Modal/editModalDriver";
import Modal from "@mui/material/Modal";
import styles from "./driverCard.module.scss";
import classNames from "classnames/bind";
import DeletedModalDriver from "../Modal/deletedModalDriver";

const cx = classNames.bind(styles);

const DriverCard = ({ driverData, setDriverData, setSelectedDriver, modalOpen, setModalOpen }) => {
    let statusClass = "";
    if (driverData.status === "on") {
        statusClass = cx("header-card-status-on");
    }
    if (driverData.status === "off") {
        statusClass = cx("header-driver-status-off");
    }
    if (driverData.status === "free") {
        statusClass = cx("header-driver-status-free");
    }
    if (driverData.urlimage === "") {
        driverData.urlimage =
            "https://res.cloudinary.com/dsvirmefr/image/upload/v1713114619/mybkar/mercedes_d9vkwx.jpg";
    }


    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deletedModalOpen, setDeletedModalOpen] = useState(false);

    const handleDeletedModal = (driver) => {
        setDeletedModalOpen(true)
    }

    const handleCloseDeletedModal = () => {
        setDeletedModalOpen(false)
    }

    const handleEditModalOpen = (driver) => {
        console.log("Handle driver click", driver)
        setEditModalOpen(true); // Open modal
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };
    return (
        <div>
            <Card
                sx={{
                    minWidth: 230,
                    maxWidth: 300,
                    background: "#176B87",
                    color: "white",
                    borderRadius: 5,
                    margin: 2,
                }}
            >
                {modalOpen && <div className={cx("style-icon")}>
                    <Button
                        // variant="contained"
                        onClick={() => handleEditModalOpen(driverData)}
                    >
                        <EditIcon style={{
                            color: "black",
                            width: 25,
                            height: 25,
                            borderRadius: 50,
                            background: "#FFFFFF",
                            padding: 5
                        }} />
                    </Button>
                    <Button
                        // variant="contained"

                        onClick={() => handleDeletedModal(driverData)}
                    >
                        <DeleteIcon style={{
                            width: 25,
                            color: "black",
                            height: 25,
                            borderRadius: 50,
                            background: "#FFFFFF",
                            padding: 5
                        }} />
                    </Button>
                </div>}
                {
                    !modalOpen && <div className={cx("header-card")}>
                        <div className={statusClass}></div>
                        <div className={cx("header-card-name")}> {driverData.name}</div>
                    </div>
                }


                <CardMedia style={{ width: "100%", height: 150, marginTop: 20, display: "flex", justifyContent: "center" }}>
                    <img
                        src={driverData.urlimage}
                        alt="driver"
                        style={{ maxWidth: "150px", height: "150px", borderRadius: "10px" }}
                    />
                </CardMedia>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {modalOpen && <Typography variant="body2" color="text.white" >
                        Full name:{driverData.name}

                    </Typography>}
                    {modalOpen && <Typography variant="body2" color="text.white" marginTop="5px">
                        Exprience:{driverData.exp}

                    </Typography>}
                    {modalOpen && <Typography variant="body2" color="text.white" marginTop="5px">
                        Gender:{driverData.gender}
                    </Typography>}
                    <Typography variant="body2" color="text.white" marginTop="5px">
                        ID:{driverData.STT}
                    </Typography>
                    <Typography variant="body2" color="text.white" marginTop="5px">
                        Phone:{driverData.phone}
                    </Typography>
                    {modalOpen && <Typography variant="body2" color="text.white" marginTop="5px">
                        License:{driverData.license}
                    </Typography>}
                    {modalOpen && <Typography variant="body2" color="text.white" marginTop="5px"  >
                        Status:{driverData.status}
                    </Typography>}
                    {<Typography variant="body2" color="text.white" marginTop="5px">
                        Current car ID:{driverData.ids_car}
                    </Typography>}

                    <Typography variant="body2" color="text.white" marginTop="5px">
                        Car:{driverData.vehicleType}
                    </Typography>
                </CardContent>
            </Card >
            <Modal open={editModalOpen} onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                <>
                    < EditModalDriver driverData={driverData} setDriverData={setDriverData} setSelectedDriver={setSelectedDriver} editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} /> </>

            </Modal>

            <Modal open={deletedModalOpen} onClose={handleCloseDeletedModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                <>
                    <DeletedModalDriver driverData={driverData} setDeletedModalOpen={setDeletedModalOpen} />
                </>

            </Modal>


        </div>


    );
}
export default DriverCard;
