import { Router } from "express";
import {
  getAllVehicles,
  getCarByParam,
} from "../controllers/vehicle.controller.js";
const router = Router();
router.route("/getall").get(getAllVehicles);
router.route("/getcar/:param").get(getCarByParam);
export const vehicleRouter = router;
