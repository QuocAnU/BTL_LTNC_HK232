import { Router } from "express";
import {
  getAllTrips,
  getTrip,
  showCreateTripPage,
  createTrip,
  updateTrip,
  deleteTrip,
  getDriverByEx,
  doneTrip,
} from "../controllers/trip.controller.js";
const router = Router();
router.route("/getall").get(getAllTrips);
router.route("/gettrip").get(getTrip);
router.route("/create").get(showCreateTripPage);
router.route("/create").post(createTrip);
router.route("/update").post(updateTrip);
router.route("/delete").post(deleteTrip);
router.route("/doneTrip").post(doneTrip);
router.route("/getDriverByEx").get(getDriverByEx);
export const tripRouter = router;
