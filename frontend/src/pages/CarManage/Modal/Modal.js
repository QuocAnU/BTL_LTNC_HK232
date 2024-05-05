import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
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

export default function TransitionsModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setDisplay("none");
    setDisplay2("block");
  };
  const handleClose = () => {
    setOpen(false);
    setDisplay("none");
    setDisplay2("block");
  };
  const [display, setDisplay] = React.useState("none");
  const [display2, setDisplay2] = React.useState("block");
  const [ids, setIds] = React.useState("");
  const [species, setSpecies] = React.useState("truck");
  const [fuel, setFuel] = React.useState("diesel");
  const [weight, setWeight] = React.useState(0);
  const [status, setStatus] = React.useState("off");
  const [size, setSize] = React.useState("small");
  const [file, setFile] = React.useState("");
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
  const handleAddVehicle = async () => {
    const result = await fetchImage(file);
    const formData = new FormData();
    formData.append("ids", ids);
    formData.append("type", species);
    formData.append("fuel", fuel);
    formData.append("weight", weight);
    formData.append("status", status);
    formData.append("size", size);
    formData.append("file", result.data);
    console.log(formData);
    await axios
      .post("http://localhost:3001/vehicle/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Add vehicle success");
          window.location.reload();
        } else alert("Add vehicle failed");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} className={cx("wrapper")}>
          <Box sx={style}>
            <div className={cx("add-car")}>
              <h3 style={{ alignSelf: "center" }}>Add an item</h3>
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
                  hidden
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
                      display: display2,
                    }}
                  >
                    Choose an image
                  </h3>
                  <img
                    id="previewImage"
                    src=""
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: display,
                      objectFit: "fit",
                      borderRadius: 30,
                    }}
                  />
                </label>

                <div className={cx("form-group1")}>
                  <h3 className={cx("title-name")}>IDS: </h3>
                  <input
                    onChange={(e) => setIds(e.target.value)}
                    type="text"
                    id="ids"
                    placeholder="IDS"
                    style={{
                      width: 300,
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                    }}
                  />
                </div>
                <div className={cx("form-group2")}>
                  <h3 className={cx("title-species")}>Species: </h3>
                  <select
                    onChange={(e) => setSpecies(e.target.value)}
                    name="species"
                    className={cx("species")}
                    style={{
                      width: 100,
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                    }}
                  >
                    <option value="truck">Truck</option>
                    <option value="coach">Coach</option>
                    <option value="container">Container</option>
                  </select>
                  <h3 className={cx("title-fuel")}>Fuel: </h3>
                  <select
                    onChange={(e) => setFuel(e.target.value)}
                    name="fuel"
                    style={{
                      width: 100,
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                    }}
                  >
                    <option value="diesel">Diesel</option>
                    <option value="gasoline">Gasoline</option>
                  </select>
                </div>
                <div className={cx("form-group3")}>
                  <h3 className={cx("title-weight")}>Weight: </h3>
                  <input
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    id="weight"
                    placeholder="Weight"
                    style={{
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                      marginRight: 10,
                    }}
                  />
                  <h3 className={cx("title-status")}>Status: </h3>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    name="status"
                    style={{
                      width: 100,
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                    }}
                  >
                    <option value="on">On</option>
                    <option value="maintain">Maintain</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className={cx("form-group4")}>
                  <h3 className={cx("title-size")}>Size: </h3>
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    name="size"
                    style={{
                      width: 100,
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                    }}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <Button
                  onClick={handleAddVehicle}
                  variant="contained"
                  style={{
                    backgroundColor: "#B1CCFF",
                    color: "black",
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                >
                  Add vehicle
                </Button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
