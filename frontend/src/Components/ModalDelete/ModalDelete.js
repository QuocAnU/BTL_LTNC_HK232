import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#176B87",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  color: "white",
  p: 4,
};

export default function ModalDelete({
  openDelete,
  setOpenDelete,
  ids,
  notifyDelete,
  fetchVehicle,
}) {
  const handleClose = () => setOpenDelete(false);
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("ids", ids);
    try {
      const response = await axios.post(
        "http://localhost:3001/vehicle/delete",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        notifyDelete();
        setOpenDelete(false);
        fetchVehicle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete this vehicle?
          </Typography>
          <Button
            onClick={handleDelete}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "black",
              margin: 1,
              borderRadius: 5,
              width: 100,
              border: "1px solid black",
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "black",
              margin: 1,
              borderRadius: 5,
              width: 100,
              border: "1px solid black",
            }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
