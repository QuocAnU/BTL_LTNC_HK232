import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import styles from "./ModalEdit.module.scss";
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

export default function TransitionsModal({
  open,
  onClose,
  newids,
  newtype,
  newsize,
  newweight,
  newfuel,
  newstatus,
  newurlimage,
  notify,
  fetchVehicle,
}) {
  const [display, setDisplay] = React.useState("none");
  const [display2, setDisplay2] = React.useState("block");
  const [species, setSpecies] = React.useState("truck");
  const [fuel, setFuel] = React.useState("diesel");
  const [weight, setWeight] = React.useState(0);
  const [status, setStatus] = React.useState("on");
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
  const handleEditVehicle = async () => {
    let result;
    if (file) result = await fetchImage(file);
    else result = { data: newurlimage };
    const formData = new FormData();
    //set copy value for each field
    let speciesCopy = species;
    if (!speciesCopy) speciesCopy = newtype;
    setSpecies(speciesCopy);
    let sizeCopy = size;
    if (!sizeCopy) sizeCopy = newsize;
    setSize(sizeCopy);
    let weightCopy = weight;
    if (!weightCopy) weightCopy = newweight;
    setWeight(weightCopy);
    let fuelCopy = fuel;
    if (!fuelCopy) fuelCopy = newfuel;
    setFuel(fuelCopy);
    let statusCopy = status;
    if (!statusCopy) statusCopy = newstatus;
    setStatus(statusCopy);
    if (!result.data) result.data = newurlimage;
    // end set copy value for each field
    formData.append("ids", newids);
    formData.append("type", species);
    formData.append("fuel", fuel);
    formData.append("weight", weight);
    formData.append("status", status);
    formData.append("size", size);
    formData.append("file", result.data);
    await axios
      .post("http://localhost:3001/vehicle/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          await onClose();
          await notify();
          await fetchVehicle();
        } else alert("failed");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
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
              <h3 style={{ alignSelf: "center" }}>Edit an item</h3>
              <form
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
                      display: newurlimage ? "none" : display2,
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
                      display: newurlimage ? "block" : display,
                      objectFit: "fit",
                      borderRadius: 30,
                    }}
                    src={newurlimage}
                  />
                </label>
                <div className={cx("form-group1")}>
                  <h3 className={cx("title-name")}>Ids: </h3>
                  <input
                    type="text"
                    defaultValue={newids}
                    disabled={true}
                    style={{
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
                    defaultValue={newtype}
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
                    defaultValue={newfuel}
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
                    defaultValue={newweight}
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
                    defaultValue={newstatus}
                    style={{
                      width: 100,
                      borderRadius: 5,
                      height: 47,
                      border: "none",
                      background: "#d9d9d9",
                    }}
                  >
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className={cx("form-group4")}>
                  <h3 className={cx("title-size")}>Size: </h3>
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    name="size"
                    defaultValue={newsize}
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
                  onClick={handleEditVehicle}
                  variant="contained"
                  style={{
                    backgroundColor: "#B1CCFF",
                    color: "black",
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                >
                  Done
                </Button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
