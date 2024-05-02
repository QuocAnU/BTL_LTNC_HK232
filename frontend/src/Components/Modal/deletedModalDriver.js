
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import styles from "./modalDriver.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect } from "react";

const cx = classNames.bind(styles);


export default function DeletedModalDriver({ driverData, setDeletedModalOpen }) {

    const handleUndo = () => {
        setDeletedModalOpen(false);
    };

    const handleDeleted = async () => {
        console.log(driverData._id)
        await axios
            .delete(`http://localhost:3001/drivers/delete/${driverData._id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(async (response) => {
                console.log(response.data.updatedDriver);
                if (response.status === 200) {
                    alert("Deleted driver successfully")
                    setDeletedModalOpen(false)
                    window.location.reload()
                } else alert("failed");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    return (
        // <div className={cx("deleted")}>2</div>

        <Box className={cx("modal-content-d")}>
            <h2 style={{ textAlign: 'center' }} >Driver Deleted</h2>
            <p style={{ marginBottom: '30px' }}>
                {/* You can customize this message with the driver's name or any relevant information */}
                Driver {driverData.name} has been deleted.
            </p>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Button
                    onClick={handleUndo}
                    style={{ marginRight: '30px' }}
                    variant="contained" color="primary" >

                    Undo
                </Button>
                <Button
                    onClick={handleDeleted}
                    variant="contained" color="error">
                    Delete
                </Button>
            </div>

        </Box>
    )

}