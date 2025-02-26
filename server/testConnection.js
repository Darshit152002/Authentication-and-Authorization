const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://darshit2002shah:T8TZmlupcLNwQ8GU@authentication.khtoo.mongodb.net/?retryWrites=true&w=majority&appName=Authentication";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
};

connectDB();
