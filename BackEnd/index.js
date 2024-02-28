import express from "express";
import { json } from "express";
import { PORT } from "./env.js";
import cors from "cors";
import Database from "./configs/database.js";

import { driverRouter } from "./routes/driver.route.js";

const db = new Database();
db.connect();

const app = express();
app.use(json());
app.use(cors());



app.use("/drivers", driverRouter);

app.listen(PORT, () => {
    console.log(`App is running in PORT ${PORT}`);
});
