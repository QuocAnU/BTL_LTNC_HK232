import mongoose from "mongoose";
const VehicleSchema = new mongoose.Schema({
  ids: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
  weight: Number,
  fuel: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "on",
  },
});

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
