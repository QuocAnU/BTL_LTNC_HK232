//connect to mongo db
import mongoose from "mongoose";

class Database {
  constructor() {
    this.connect = this.connect.bind(this);
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(process.env.db, {
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


