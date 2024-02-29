import mongoose from "mongoose";
const TripSchema = new mongoose.Schema({
  STT: Number,
  datestart: Date,
  dateexpected: Date,
  status: {
    type: String,
    default: "not begin",
  },
  distance: Number,
  cost: Number,
  revenue: Number,
  profit: Number,
  idsdriver: Number,
  idscar: Number,
});
export const Trip = mongoose.model("Trip", TripSchema);
