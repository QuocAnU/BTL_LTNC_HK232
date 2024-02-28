
import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    STT: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    license: {
        type: String,
        required: true,
    }
});

export const drivers = mongoose.model("Drivers", driverSchema);




