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
    const [status, setStatus] = React.useState(driverData.status)
    const [gender, setGender] = React.useState(driverData.gender)

    const [ids_car, setIdsCar] = React.useState(driverData.ids_car)
    const [vehicleType, setVehicleType] = React.useState(driverData.vehicleType)
    const [vehicleData, setVehicleData] = React.useState([])
    const [selectVehicle, setSelectVehicle] = React.useState(null)



    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("http://localhost:3001/vehicle/getall", {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                // Lọc các xe có trạng thái là "off"
                const offVehicles = response.data.filter(vehicle => vehicle.status === "off");
                setVehicleData(offVehicles);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchVehicles();
    }, []);
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
    const findVehicleById = (id) => {
        setIdsCar(id)
        return vehicleData.find(car => car.ids === id);
    }
    const handleEditVehicle = async () => {
        let result;
        if (file) result = await fetchImage(file);
        else result = { data: driverData.urlimage };
        console.log(result.data);

        if (!gender) setGender(driverData.gender)

        if (!status) setStatus(driverData.status)



        const formData = new FormData();


        formData.append("STT", driverData.STT)
        formData.append("name", driverData.name)
        formData.append("status", status)
        formData.append("address", driverData.address)
        formData.append("gender", driverData.gender)
        formData.append("phone", driverData.phone)
        formData.append("license", driverData.license)
        if (selectVehicle) {
            formData.append("vehicleType", selectVehicle.type)
        }
        else {
            formData.append("vehicleType", vehicleType)
        }
        formData.append("ids_car", ids_car)
        formData.append("deleted", driverData.deleted)
        formData.append("totaldistance", driverData.totaldistance)
        formData.append("urlimage", result.data)
        formData.append("exp", driverData.exp)

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
                    window.location.reload()
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
                            {/* <h3 className={cx("title-name")}>Full Name : </h3>
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
                            /> */}
                            <h3 className={cx("title-status")}>Status: </h3>
                            <select
                                onChange={(e) => setStatus(e.target.value)}
                                name="status"
                                // defaultValue={driverData.status}
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
                                <option value="">{driverData.status}</option>
                                <option value="on">on</option>
                                <option value="free">free</option>
                                <option value="off">off</option>
                            </select>
                        </div>
                        <div className={cx("form-group2")}>
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

                            <h3 className={cx("title-name")}> Current car ID : </h3>
                            <select
                                onChange={(e) => setSelectVehicle(findVehicleById(e.target.value))}
                                name="ids_car"
                                style={{
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    paddingLeft: "20px",

                                }}
                            >
                                <option value="">{driverData.ids_car}</option>
                                {vehicleData.map((car) => (
                                    <option key={car.ids} value={car.ids}>
                                        {car.ids}
                                    </option>
                                ))}
                            </select>
                            {/* <h3 className={cx("title-fuel")}>Gender: </h3>
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
                            </select> */}

                            <h3 className={cx("title-size")}>Car: </h3>
                            <input
                                type="text"
                                name="vehicleType"
                                value={selectVehicle ? selectVehicle.type : driverData.vehicleType}
                                // onChange={(e) => setPhone(e.target.value)}
                                // defaultValue={driverData.phone}
                                disabled={true}
                                style={{
                                    borderRadius: 5,
                                    height: 47,
                                    border: "none",
                                    background: "#d9d9d9",
                                    marginLeft: "55px",
                                    paddingLeft: "20px",
                                    marginRight: "30px"

                                }}
                            />
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
