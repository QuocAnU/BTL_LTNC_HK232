import { Router } from "express";
import {
  getAllVehicles,
  getCarByParam,
  addVehicle,
  showAddVehicle,
  deleteVehicle,
  updateVehicle,
} from "../controllers/vehicle.controller.js";
const router = Router();

router.route("/add").get(showAddVehicle);
router.route("/add").post(addVehicle);
router.route("/delete").post(deleteVehicle);
router.route("/update").post(updateVehicle);
router.route("/getall").get(getAllVehicles);
router.route("/getcar").get(getCarByParam);
export const vehicleRouter = router;
