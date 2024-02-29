import { Vehicle } from "../models/Vehicle.js";
import { Drivers, DriversManager } from "../models/driver.model.js";

export const getAllDrivers = async (req, res) => {
    try {
        const allDrivers = await Drivers.find();
        console.log(allDrivers)
        return res.status(200).send(allDrivers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const addDrivers = async (req, res) => {

    try {
        const driverData = req.body
        const driver = await DriversManager.addDriver(driverData);
        // if (req.body.ids_car) {
        //     await Vehicle.updateMany({ _id: { $in: req.body.ids_car } }, { $set: { status: "on" } });
        // }
        // console.log("Updated status vihicle successfully");
        return res.status(201).send({
            driver: driver,
            message: "Driver deleted successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

export const updateDrivers = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, ...updatedData } = req.body;
        const updatedDriver = await DriversManager.updatedDriver(id, updatedData);

        // if (req.body.ids_car && req.body.ids_car !== updatedDriver.ids_car) {
        //     // Cập nhật trạng thái của các xe trong ids_car cũ thành "maintain" hoặc "off"
        //     await Vehicle.updateMany({ _id: { $in: updatedDriver.ids_car } }, { $set: { status: status } });

        //     // Cập nhật trạng thái của các xe mới trong ids_car thành "on"
        //     await Vehicle.updateMany({ _id: { $in: req.body.ids_car } }, { $set: { status: "on" } });
        // }

        return res.status(201).send({
            updatedDriver: updatedDriver,
            message: "Driver updated successfully"
        }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

export const deleteDrivers = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await DriversManager.deletedDriver(id);

        console.log("Driver deleted:");
        // await Vehicle.updateMany({ _id: { $in: driver.ids_car } }, { $set: { status: "off" } });
        // console.log("Updated status vihicle successfully");

        return res.status(200).send({
            deleted: deleted,
            message: "Driver deleted successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};