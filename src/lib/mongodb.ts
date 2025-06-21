import mongoose from "mongoose";

const connectToDatabase = async () => {
  const mongoURL = process.env.MONGODB_URL;

  if (!mongoURL) {
    throw new Error("MongoURL is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
