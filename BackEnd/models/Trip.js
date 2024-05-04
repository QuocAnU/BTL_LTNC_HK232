import mongoose from "mongoose";
const TripSchema = new mongoose.Schema(
  {
    STT: Number,
    date_start: {
      type: String,
      default: "",
    },
    date_expected: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Unfinished",
    },
    start_location: {
      type: String,
      default: "",
    },
    end_location: {
      type: String,
      default: "",
    },
    distance: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    ids_driver: { type: Number, default: 0 },
    ids_car: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
export const Trip = mongoose.model("Trip", TripSchema);
