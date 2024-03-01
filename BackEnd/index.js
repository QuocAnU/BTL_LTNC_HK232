import express from "express";
import { json } from "express";
import { PORT } from "./env.js";
import multer from "multer";
import cors from "cors";
import Database from "./configs/database.js";

import { vehicleRouter } from "./routes/vehicle.route.js";

import { tripRouter } from "./routes/trip.route.js";

import { driverRouter } from "./routes/driver.route.js";

const db = new Database();
db.connect();

const app = express();
app.use(json());
app.use(cors());
const upload = multer();

app.use(upload.any());

app.get("/", (req, res) => {
  res.send("Trang chu");
});
app.use("/vehicle", vehicleRouter);
app.use("/trip", tripRouter);

app.use("/drivers", driverRouter);

app.listen(PORT, () => {
  console.log(`App is running in PORT ${PORT}`);
});
