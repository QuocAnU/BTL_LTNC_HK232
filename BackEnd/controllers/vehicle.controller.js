import { Vehicle } from "../models/Vehicle.js";
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCarByParam = async (req, res) => {
  try {
    res.send(req.params.param);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
