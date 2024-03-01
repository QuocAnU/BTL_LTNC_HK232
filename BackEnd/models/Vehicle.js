import mongoose from "mongoose";
const VehicleSchema = new mongoose.Schema({
  ids: Number,
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
  deleted: {
    type: Boolean,
    default: false,
  },
});

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
