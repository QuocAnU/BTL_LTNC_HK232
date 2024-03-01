import { Router } from "express";
import {
  getAllTrips,
  getTrip,
  showCreateTripPage,
  createTrip,
} from "../controllers/trip.controller.js";
const router = Router();
router.route("/").get(getAllTrips);
router.route("/gettrip").get(getTrip);
router.route("/create").get(showCreateTripPage);
router.route("/create").post(createTrip);
export const tripRouter = router;
