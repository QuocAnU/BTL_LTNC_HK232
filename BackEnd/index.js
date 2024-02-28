import express from "express";
import { json } from "express";
import { PORT } from "./env.js";
import cors from "cors";
import Database from "./configs/database.js";
import { vehicleRouter } from "./routes/vehicle.route.js";
const db = new Database();
db.connect();
const app = express();
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello22344");
});
app.use("/vehicle", vehicleRouter);
app.listen(PORT, () => {
  console.log(`App is running in PORT ${PORT}`);
});
