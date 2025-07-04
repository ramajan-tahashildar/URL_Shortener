import mongoose from "mongoose";

async function connect(DB_url) {
  try {
    await mongoose.connect(DB_url);
    console.log("Successfully connected to MongoDB database.");
  } catch (err) {
    console.log("Failed to connect to MongoDB database:", err);
  }
}
export default connect;
