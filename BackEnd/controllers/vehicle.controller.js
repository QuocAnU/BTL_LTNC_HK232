import { Vehicle } from "../models/Vehicle.js";
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
      const maxVehicle = await Vehicle.findOne().sort({ ids: -1 });
      let maxIds = maxVehicle.ids + 1;
      const vehicle = new Vehicle({
        ids: maxIds,
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
      const ids = parseInt(req.body.ids);
      const vehicle = await Vehicle.findOne({ ids: ids });
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      } else {
        await Vehicle.findOneAndUpdate({ ids: ids }, { deleted: true });
        res.redirect("/vehicle/getall");
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
      if (!deleted) {
        deleted = vehicle.delete;
      }
      await Vehicle.findOneAndUpdate(
        { ids: parseInt(ids) },
        {
          type: type,
          size: size,
          weight: weight,
          fuel: fuel,
          status: status,
          deleted: deleted,
          urlimage: urlimage,
        }
      );
      res.status(200).json({ message: "Update success" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
