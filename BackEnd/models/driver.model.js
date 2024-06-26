import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    STT: {
      type: Number,
      required: true,
      unique: true,
    },
  
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totaldistance: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    }, 
    status: {
      type: String,
      required: true,
    },
    ids_car: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      required: true,
    },
    urlimage: {
      type: String,
      default: "",
    },
    exp: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Drivers = mongoose.model("Drivers", driverSchema);

class DriversManager {
  static async addDriver(driverdata) {
    try {
      const driver = new Drivers(driverdata);
      await driver.save();
      console.log("New driver saved:");
      return driver;
    } catch (error) {
      console.error(error.message);
      throw new Error("Failed to add driver");
    }
  }
  static async updatedDriver(id, driverdata) {
    try {
      const updated = await Drivers.findByIdAndUpdate(id, driverdata, {
        new: true,
      });
      if (!updated) {
        return res.status(404).send({ message: "Driver not found" });
      }
      console.log("Driver updated:");
      return updated;
    } catch (error) {
      console.error(error.message);
      throw new Error("Failed to update driver");
    }
  }
  static async deletedDriver(id) {
    try {
      console.log("DL: ", id);
      // Find and update the driver by ID
      const driver = await Drivers.findOneAndUpdate(
        { _id: id }, // Filter for finding the driver
        { $set: { deleted: true } }, // Update to mark as deleted
        { new: true } // Return the updated document
      );
      if (!driver) {

        throw new Error("Driver not found");
      }

      return { message: "Driver deleted successfully", driver };
    } catch (error) {

      console.error(error.message);

      throw new Error("Failed to delete driver");
    }
  }
}



export { Drivers, DriversManager };
