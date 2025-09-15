import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    console.log("DB ...");
    await mongoose.connect(`${process.env.MONGO_URI}/db`);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB ;