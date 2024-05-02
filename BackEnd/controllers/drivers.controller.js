import { verifyToken } from "../middleware/jwtAuthentication.js";
import { Trip } from "../models/Trip.js";
import { Vehicle } from "../models/Vehicle.js";
import { Drivers, DriversManager } from "../models/driver.model.js";

export const getAllDrivers = async (req, res) => {
    try {
        verifyToken(req, res, async () => {
            const allDrivers = await Drivers.find();
            // const driversWithVehicles = [];
            // for (const driver of allDrivers) {
            //     const vehicle = await Vehicle.findOne({ ids_car: driver.car_id });
            //     if (vehicle) {
            //         driversWithVehicles.push({ driver, vehicle });
            //     }
            // }
            const driversWithVehicles = await Promise.all(allDrivers.map(async (driver) => {
                const vehicle = await Vehicle.findOne({ ids_car: driver.car_id });
                if (vehicle) {
                    const driverWithVehicle = { ...driver.toObject(), vehicleType: vehicle.type };
                    return driverWithVehicle;
                }
                return null;
            }));

            const validDriversWithVehicles = driversWithVehicles.filter((item) => item !== null);

            return res.status(200).send(validDriversWithVehicles);
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const addDrivers = async (req, res) => {
    console.log(req.body)
    try {
        verifyToken(req, res, async () => {
            let driverData = req.body;
            console.log(driverData)
            const requiredFields = ['name', 'gender', 'phone', 'address', 'license', 'totaldistance', 'status', 'ids_car', 'vehicleType', 'deleted', 'urlimage', 'exp'];
            const missingFields = requiredFields.filter(field => !(field in driverData));
            if (missingFields.length > 0) {
                return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
            }
            let lastDriver = await Drivers.findOne({}, {}, { sort: { 'STT': -1 } });
            let STT = (lastDriver.STT) + 1;
            driverData = { ...driverData, STT: STT };
            const driver = await DriversManager.addDriver(driverData);
            if (req.body.ids_car) {
                await Vehicle.updateMany({ ids: { $in: req.body.ids_car } }, { $set: { status: "on" } });
            }
            console.log("Updated status vihicle successfully");
            return res.status(201).send({
                driver: driver,
                message: "Created driver successfully"
            });
        })


    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

export const updatedDrivers = async (req, res) => {
    try {
        verifyToken(req, res, async () => {
            const { id } = req.params;
            console.log("Updated", req.body)
            const updatedData = req.body;
            console.log("OP", updatedData)
            const requiredFields = ['name', 'status', 'address', 'gender', 'phone', 'license', 'vehicleType', 'ids_car', 'urlimage'];
            const missingFields = requiredFields.filter(field => !(field in updatedData));
            if (missingFields.length > 0) {
                return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
            }
            const oldDriver = await Drivers.findById(id);
            const updatedDriver = await DriversManager.updatedDriver(id, updatedData);

            if (oldDriver.ids_car !== updatedDriver.ids_car) {
                // Cập nhật trạng thái của các xe trong ids_car cũ thành "maintain" hoặc "off"
                await Vehicle.updateMany({ ids: { $in: oldDriver.ids_car } }, { $set: { status: status } });
                console.log("Updated status old vihicle successfully");
                // Cập nhật trạng thái của các xe mới trong ids_car thành "on"
                await Vehicle.updateMany({ ids: { $in: updatedDriver.ids_car } }, { $set: { status: "on" } });
                console.log("Updated status new vihicle successfully");
            }

            return res.status(201).send({
                updatedDriver: updatedDriver,
                message: "Driver updated successfully"
            }
            );
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

export const deletedDrivers = async (req, res) => {
    try {
        verifyToken(req, res, async () => {
            const { id } = req.params;
            console.log("IDs: ", id)
            const deleted = await DriversManager.deletedDriver(id);

            console.log("Driver deleted:");
            await Vehicle.updateMany({ ids: { $in: deleted.ids_car } }, { $set: { status: "off" } });
            console.log("Updated status vihicle successfully");

            return res.status(200).send({
                deleted: deleted,
                message: "Driver deleted successfully"
            });
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const getHistoryDrivers = async (req, res) => {
    try {
        verifyToken(req, res, async () => {
            const { id } = req.params;
            console.log(id);
            const driversById = await Drivers.findById(id);
            const historyDrivers = await Trip.find({ ids_driver: driversById.STT })
            // console.log(historyDrivers.length);
            // if (historyDrivers.length === 0) {
            //     return res.status(404).send({ message: "No data" });
            // }
            return res.status(200).send(historyDrivers);
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};