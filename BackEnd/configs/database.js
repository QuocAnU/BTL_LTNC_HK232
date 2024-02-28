//connect to mongo db
import mongoose from "mongoose";
import { db } from "../env.js";

function Database() {
  this.connect = connect;
}
async function connect() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to database successfully");
  } catch (err) {
    console.log("Connect to database failed");
  }
}
export default Database;
