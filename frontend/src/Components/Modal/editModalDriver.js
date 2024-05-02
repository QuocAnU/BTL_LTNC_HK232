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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
};

export default function EditModalDriver({
    driverData, setDriverData, setSelectedDriver, setEditModalOpen
}) {
    const [display, setDisplay] = React.useState("none");
    const [display2, setDisplay2] = React.useState("block");
    const [file, setFile] = React.useState("");

    const [name, setName] = React.useState("")
    const [status, setStatus] = React.useState("on")
    const [gender, setGender] = React.useState("male")
    const [vihicleType, setVihicleType] = React.useState("Truck")

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setDisplay("block");
            setDisplay2("none");
            setFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImage = document.getElementById("previewImage");
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    const fetchImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const result = await axios.post(
            "http://localhost:3001/images/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return result;
    };
    const handleEditVehicle = async () => {
        let result;
        if (file) result = await fetchImage(file);
        else result = { data: driverData.urlimage };
        console.log(result.data);

        if (!gender) setGender(driverData.gender)

        if (!status) setStatus(driverData.status)

        if (!vihicleType) setVihicleType(driverData.vihicleType)

        const formData = new FormData();


        // formData.append("STT", driverData.STT)
        formData.append("name", name)
        formData.append("status", status)
        formData.append("address", driverData.address)
        formData.append("gender", gender)
        formData.append("phone", driverData.phone)
        formData.append("license", driverData.license)
        formData.append("vehicleType", vihicleType)
        formData.append("ids_car", driverData.ids_car)
        // formData.append("deleted", false)
        // formData.append("totaldistance", 0)
        formData.append("urlimage", result.data)
        // formData.append("exp",0)

        console.log("data", ...formData);
        await axios
            .put(`http://localhost:3001/drivers/update/${driverData._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(async (response) => {
                console.log(response.data.updatedDriver);
                if (response.status === 201) {
                    alert("Updated successfully")
                    setEditModalOpen(false)
                    setSelectedDriver(response.data.updatedDriver)
                } else alert("failed");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <div>
            <Box className={cx("wrapper")}>
                <div className={cx("edit-driver")}>
                    <h3 style={{ alignSelf: "center" }}>Edit Driver</h3>
                    <form
                        action="http://localhost:3001/vehicle/add"
                        method="POST"
                        encType="multipart/form-data"
                        id="form"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            title="Choose an image"
                            hidden={true}
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="file"
                            style={{
                                cursor: "pointer",
                                maxWidth: 300,
                                minWidth: 250,
                                maxHeight: 300,
                                height: 200,
                                border: "none",
                                background: "#d9d9d9",
                                borderRadius: 30,
                                padding: "none",
                            }}
                        >
                            <h3
                                style={{
                                    textAlign: "center",
                                    color: "rgba(0, 0, 0, 0.28)",
                                    display: driverData.urlimage ? "none" : display2,
                                }}
                            >
                                Choose an image
                            </h3>
                            <img
                                id="previewImage"
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    // marginTop: "10px",
                                    display: driverData.urlimage ? "block" : display,
                                    objectFit: "fit",
                                    borderRadius: 30,
                                }}
                                src={driverData.urlimage}
                            />
                        </label>
                        <div className={cx("form-group1")}>
                            <h3 className={cx("title-name")}>Full Name : </h3>
                            <input
                                type="text"
                                defaultValue={driverData.name}
                                // disabled={true}
                                // value={driverData.name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    marginLeft: "33px",
                                    paddingLeft: "20px",

                                }}
                            />
                            <h3 className={cx("title-status")}>Status: </h3>
                            <select
                                onChange={(e) => setStatus(e.target.value)}
                                name="status"
                                defaultValue={driverData.status}
                                style={{
                                    width: 100,
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    marginRight: "30px",
                                    paddingLeft: "20px",
                                }}
                            >
                                <option value="on">On</option>
                                <option value="free">Free</option>
                                <option value="off">Off</option>
                            </select>
                        </div>
                        <div className={cx("form-group2")}>
                            <h3 className={cx("title-name")}> Current car ID : </h3>
                            <input
                                type="text"
                                defaultValue={driverData.ids_car}
                                // disabled={true}
                                style={{
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",

                                    paddingLeft: "20px",

                                }}
                            />
                            <h3 className={cx("title-name")}>License : </h3>
                            <input
                                type="text"
                                defaultValue={driverData.license}
                                // disabled={true}
                                style={{
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    marginRight: "30px",
                                    paddingLeft: "20px",

                                }}
                            />
                        </div>
                        <div className={cx("form-group3")}>
                            <h3 className={cx("title-name")}>Phone : </h3>
                            <input
                                type="text"
                                defaultValue={driverData.phone}
                                // disabled={true}
                                style={{
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    marginLeft: "55px",
                                    paddingLeft: "20px",

                                }}
                            />
                            <h3 className={cx("title-fuel")}>Gender: </h3>
                            <select
                                onChange={(e) => setGender(e.target.value)}
                                name="gender"
                                defaultValue={driverData.gender}
                                style={{
                                    width: 100,
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    paddingLeft: 20,
                                    marginLeft: 30
                                }}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <h3 className={cx("title-size")}>Car: </h3>
                            <select
                                onChange={(e) => setVihicleType(e.target.value)}
                                name=""
                                defaultValue={driverData.vehicleType}
                                style={{
                                    width: 100,
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    paddingLeft: "20px",
                                    background: "#d9d9d9",
                                    marginRight: "30px"
                                }}
                            >
                                <option value="truck">Truck</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div className={cx("form-group4")}>

                        </div>
                        <div style={{ display: 'felx' }}>

                            <Button
                                onClick={handleEditVehicle}
                                variant="contained"
                                style={{
                                    backgroundColor: "#B1CCFF",
                                    color: "black",
                                    marginTop: 20,
                                    fontWeight: "bold",
                                    marginBottom: 50,
                                    // marginLeft: 30,
                                }}
                            >
                                Done
                            </Button>
                        </div>

                    </form>
                </div>
            </Box>
        </div>

    )
}
