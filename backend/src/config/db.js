const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(
      "MONGO_URI EXISTS:",
      !!process.env.MONGO_URI
    );

    console.log(
      "MONGO_URI STARTS WITH:",
      process.env.MONGO_URI?.slice(0, 20)
    );

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "✅ MongoDB Connected"
    );

  } catch (error) {

    console.error(
      "❌ Mongo Error:"
    );

    console.error(error);

    process.exit(1);
  }
};

module.exports = connectDB;