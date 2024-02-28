//connect to mongo db
import mongoose from "mongoose";
import { db } from "../env.js";

class Database {
  constructor() {
    this.connect = this.connect.bind(this);
    this.connect();
  }

  async connect() {
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
}
export default Database;
