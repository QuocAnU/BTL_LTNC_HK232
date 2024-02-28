import { drivers } from "../models/driver.model.js";

export const getAllDrivers = async (req, res) => {
    try {
        const allDrivers = await drivers.find();
        console.log(allDrivers)
        return res.status(200).send(allDrivers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
