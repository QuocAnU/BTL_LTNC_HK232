import { Router } from "express";
import { getAllDrivers, addDrivers, updatedDrivers, deletedDrivers, getHistoryDrivers } from "../controllers/drivers.controller.js";

const router = Router()

router
    .route("/")
    .get(getAllDrivers)
router.route("/create").post(addDrivers)
router.route("/update/:id").put(updatedDrivers)
router.route("/delete/:id").delete(deletedDrivers)
router.route("/history/:id").get(getHistoryDrivers);

export const driverRouter = router;