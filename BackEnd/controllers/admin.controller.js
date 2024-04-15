import { hashPassword } from "../middleware/jwtAuthentication.js";
import { Admins } from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getAdminById = async (req, res) => {
    const { id } = req.params;
    const admin = await Admins.findById(id);
    return res.status(200).send(admin);

}

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body)
        const adminFound = await Admins.findOne({ email: email });
        console.log(adminFound);
        if (!adminFound.email) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const hashedPassword = await bcrypt.compare(password, adminFound.password);
        console.log(hashedPassword);

        if (!hashedPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ email: adminFound.email }, "ManDan", {
            expiresIn: "5h",
        })
        res.json({ token: token, message: "Login successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const addAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Pls send all required fields!" });
        }
        const adminFound = await Admins.findOne({ email: email });
        if (adminFound) {
            return res.status(400).send({ message: "Email is already in use!" });
        }
        const hashedPassword = await hashPassword(password);
        const admin = new Admins({
            name: name,
            email: email,
            password: hashedPassword
        })
        await admin.save();
        console.log("Create new manager");
        return res.status(201).send(admin);

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export const updatedAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Pls send all required fields!" });
        }
        const adminFound = await Admins.findOne({ email: email });
        if (adminFound) {
            return res.status(400).send({ message: "Email is already in use!" });
        }
        const hashedPassword = await hashPassword(password);
        const admin = new Admins({
            name: name,
            email: email,
            password: hashedPassword
        })
        const updated = await Admins.findByIdAndUpdate(id, admin, { new: true });
        if (!updated) {
            return res.status(404).send({ message: "Email not found" });
        }
        console.log("Driver updated:");
        return res.status(201).send({
            updatedDriver: updated,
            message: "Admin updated successfully"
        }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}