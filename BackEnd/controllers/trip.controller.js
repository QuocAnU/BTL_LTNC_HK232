import { Trip } from "../models/Trip.js";
import moment from "moment";
import format from "date-fns/format";
export const getAllTrips = async (req, res) => {
  const trips = await Trip.find();
  res.send(trips);
};
export const getTrip = async (req, res) => {
  const trip = await Trip.findOne({ _id: req.body._id });
  res.status(200).send(trip);
};
export const showCreateTripPage = (req, res) => {
  res.send("Create Trip Page");
};
export const createTrip = async (req, res) => {
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

  let newDateStart = format(new Date(date_start), "yyyy-MM-dd");
  let newDateExpect = format(new Date(date_expected), "yyyy-MM-dd");
  const trip = new Trip({
    STT,
    date_start: newDateStart,
    date_expected: newDateExpect,
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
  console.log(trip);
  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
