
import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    STT: {
        type: Number,
        required: true,
        unique: true
    },
    names: {
        type: String,
        required: true,
    },
    phone: {
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
    totaldistance: {
        type: Number,
        required: true,
    },
    statusD: {
        type: String,
        required: true,
    },
    ids_car: {
        type: String,
        required: true,
    },
    deletes: {
        type: Boolean,
        required: true,
    }
});

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
            const updated = await Drivers.findByIdAndUpdate(id, driverdata, { new: true });
            if (!updated) {
                return res.status(404).send({ message: "Driver not found" });
            }
            console.log("Driver updated:");
            return updated;
        }
        catch (error) {
            console.error(error.message);
            throw new Error("Failed to update driver");
        }
    }
    static async deletedDriver(id) {
        const driver = await Drivers.findById(id);
        if (!driver) {
            return res.status(404).send({ message: "Driver not found" });
        }
        driver.deletes = true;
        await driver.save();
        return driver;
    }
}
export { Drivers, DriversManager };

