import express from "express";


import multer from "multer";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

import Database from "./configs/database.js";
import { vehicleRouter } from "./routes/vehicle.route.js";
import { tripRouter } from "./routes/trip.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { driverRouter } from "./routes/driver.route.js";
import { uploadRouter } from "./routes/upload.route.js";
dotenv.config()

const db = new Database();
db.connect();

const app = express();
const upload = multer();
const port = process.env.PORT || 3001


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());
app.use("/admin", adminRouter);
app.use("/vehicle", vehicleRouter);
app.use("/trip", tripRouter);
app.use("/drivers", driverRouter);
app.use("/images", uploadRouter);

app.listen(port, () => {
  console.log(`App is running in PORT ${port}`);
});
