import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CardDetail from "./CardDetail/CardDetail";
import TableRoute from "./TableRoute/TableRoute";
import classNames from "classnames/bind";
import styles from "./TripDetail.module.scss";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFFFFF",
  borderRadius: 5,
  border: "2px solid #333",
  boxShadow: 24,
  p: 4,
};

export default function TripDetail({
  openDetailTrip,
  setOpenDetailTrip,
  ids,
  type,
  size,
  weight,
  fuel,
  status,
  urlimage,
}) {
  const handleClose = () => setOpenDetailTrip(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDetailTrip}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDetailTrip}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Trip Detail
            </Typography>
            <div className={cx("content")}>
              <CardDetail
                ids={ids}
                type={type}
                size={size}
                weight={weight}
                fuel={fuel}
                status={status}
                urlimage={urlimage}
              />
              <div>
                <div>Route History</div>
                <TableRoute ids={ids} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
