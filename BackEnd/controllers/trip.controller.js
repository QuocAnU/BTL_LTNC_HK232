import { Trip } from "../models/Trip.js";
export const getAllTrips = async (req, res) => {
  const trips = await Trip.find();
  res.send(trips);
};
