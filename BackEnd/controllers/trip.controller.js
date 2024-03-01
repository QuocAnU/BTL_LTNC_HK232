import { Trip } from "../models/Trip.js";
import { verifyToken } from "../middleware/jwtAuthentication.js";
export const getAllTrips = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const trips = await Trip.find();
      res.send(trips);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTrip = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const trip = await Trip.findOne({ _id: req.body._id });
      res.status(200).send(trip);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const showCreateTripPage = (req, res) => {
  try {
    verifyToken(req, res, async () => {
      res.send("Create Trip Page");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createTrip = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const maxTripSTT = await Trip.find().sort({ STT: -1 }).limit(1);
      const maxSTT = maxTripSTT[0].STT;
      const STT = maxSTT + 1;
      let {
        date_start,
        date_expected,
        status,
        start_location,
        end_location,
        distance,
        cost,
        revenue,
        ids_driver,
        ids_car,
      } = req.body;
      const profit = revenue - cost;
      console.log(date_start);
      const trip = new Trip({
        STT,
        date_start,
        date_expected,
        status,
        start_location,
        end_location,
        distance,
        cost,
        revenue,
        profit,
        ids_driver,
        ids_car,
      });
      const newTrip = await trip.save();
      res.status(201).json(newTrip);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateTrip = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      let {
        _id,
        date_start,
        date_expected,
        status,
        start_location,
        end_location,
        distance,
        cost,
        revenue,
        ids_driver,
        ids_car,
      } = req.body;
      const oldTrip = await Trip.findOne({ _id });
      if (!date_start) date_start = oldTrip.date_start;
      if (!date_expected) date_expected = oldTrip.date_expected;
      if (!status) status = oldTrip.status;
      if (!start_location) start_location = oldTrip.start_location;
      if (!end_location) end_location = oldTrip.end_location;
      if (!distance) distance = oldTrip.distance;
      if (!cost) cost = oldTrip.cost;
      if (!revenue) revenue = oldTrip.revenue;
      if (!ids_driver) ids_driver = oldTrip.ids_driver;
      if (!ids_car) ids_car = oldTrip.ids_car;
      const profit = revenue - cost;
      const trip = {
        date_start,
        date_expected,
        status,
        start_location,
        end_location,
        distance,
        cost,
        revenue,
        profit,
        ids_driver,
        ids_car,
      };
      const updatedTrip = await Trip.findOneAndUpdate({ _id }, trip, {
        new: true,
      });
      res.status(200).send(updatedTrip);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteTrip = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { _id } = req.body;
      const trip = await Trip.findOneAndUpdate({ _id }, { deleted: true });
      res.status(200).send(trip);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
