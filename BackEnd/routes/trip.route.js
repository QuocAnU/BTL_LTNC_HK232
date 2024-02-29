import { Router } from "express";
import { getAllTrips } from "../controllers/trip.controller.js";
const router = Router();
router.route("/").get(getAllTrips);
export const tripRouter = router;
