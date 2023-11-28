// connectDB.js
import mongoose from "mongoose";

async function main() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default main;
