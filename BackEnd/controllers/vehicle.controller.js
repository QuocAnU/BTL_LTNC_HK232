import { Vehicle } from "../models/Vehicle.js";
import { Trip } from "../models/Trip.js";
import { verifyToken } from "../middleware/jwtAuthentication.js";
export const getAllVehicles = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const vehicles = await Vehicle.find();
      res.send(vehicles);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCarByParam = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { type, size, weight, fuel, status } = req.query;
      const filter = {};
      if (type) filter.type = type;
      if (size) filter.size = size;
      if (weight) filter.weight = weight;
      if (fuel) filter.fuel = fuel;
      if (status) filter.status = status;
      const vehicles = await Vehicle.find(filter);
      res.send(vehicles);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const showAddVehicle = (req, res) => {
  try {
    verifyToken(req, res, async () => {
      res.send("Add Vehicle");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addVehicle = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const vehicle = new Vehicle({
        ids: req.body.ids,
        type: req.body.type,
        size: req.body.size,
        weight: req.body.weight,
        fuel: req.body.fuel,
        status: req.body.status,
        urlimage: req.body.file,
      });
      const newVehicle = await vehicle.save();
      res.status(201).send(newVehicle);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteVehicle = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const ids = req.body.ids;
      const vehicle = await Vehicle.findOne({ ids: ids });
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      } else {
        await Vehicle.findOneAndUpdate({ ids: ids }, { deleted: true });
        res.status(200).json({ message: "Delete success" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateVehicle = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      let { ids, type, size, weight, fuel, status, deleted } = req.body;
      let urlimage = req.body.file;
      const vehicle = await Vehicle.findOne({ ids: parseInt(ids) });
      if (!urlimage) {
        urlimage = vehicle.urlimage;
      }
      if (!type) {
        type = vehicle.type;
      }
      if (!size) {
        size = vehicle.size;
      }
      if (!weight) {
        weight = vehicle.weight;
      }
      if (!fuel) {
        fuel = vehicle.fuel;
      }
      if (!status) {
        status = vehicle.status;
      }
      await Vehicle.findOneAndUpdate(
        { ids: ids },
        {
          type: type,
          size: size,
          weight: weight,
          fuel: fuel,
          status: status,
          urlimage: urlimage,
        }
      );
      res.status(200).json({ message: "Update success" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTripByCar = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const ids = req.body.ids.ids;
      console.log(typeof ids);
      const trips = await Trip.find({ ids_car: ids });
      console.log(trips);
      res.status(200).json(trips);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
