import { Router } from "express";
import { getAllDrivers, addDrivers, updateDrivers, deleteDrivers } from "../controllers/drivers.controller.js";

const router = Router()

router
    .route("/")
    .get(getAllDrivers)
    .post(addDrivers)
router.route("/:id").put(updateDrivers).delete(deleteDrivers)

export const driverRouter = router;