import { Trip } from "../models/Trip.js";
import { Drivers } from "../models/driver.model.js";
import { verifyToken } from "../middleware/jwtAuthentication.js";
export const getAllTrips = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const trips = await Trip.find();
      res.status(200).send(trips);
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
        start_location,
        end_location,
        distance,
        cost,
        revenue,
        ids_driver,
      } = req.body;
      const profit = revenue - cost;
      const driver = await Drivers.findOne({ STT: ids_driver });
      console.log(driver);
      const ids_car = driver.ids_car;
      const trip = new Trip({
        STT,
        date_start,
        date_expected,
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
      res.status(200).json(newTrip);
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
      //req.body.id is an array of STT of trips
      const { id } = req.body;
      const trip = await Trip.updateMany(
        { STT: { $in: id } },
        { deleted: true }
      );
      res.status(200).send(trip);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDriverByEx = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const drivers = await Drivers.find();
      //sort by experience
      const newDrivers = drivers.sort((a, b) => a.ex - b.ex);
      res.status(200).send(newDrivers);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const doneTrip = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { id } = req.body;
      //id is an array of STT of trips
      const trip = await Trip.updateMany(
        { STT: { $in: id } },
        { status: "Success" }
      );
      // update driver's experience after done trip, new experience = old experience + (distance/10)
      const trips = await Trip.find({ STT: { $in: id } });
      trips.forEach(async (trip) => {
        const driver = await Drivers.findOne({ STT: trip.ids_driver });
        const newEx = driver.exp + trip.distance / 10;
        const updatedDriver = await Drivers.findOneAndUpdate(
          { STT: trip.ids_driver },
          { exp: newEx },
          { new: true }
        );
      });
      res.status(200).send(trip);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
