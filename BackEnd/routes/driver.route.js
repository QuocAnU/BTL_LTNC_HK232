import { Router } from "express";
import { getAllDrivers } from "../controllers/drivers.controller.js";

const router = Router()

router
    .route("/").get(getAllDrivers)

export const driverRouter = router;