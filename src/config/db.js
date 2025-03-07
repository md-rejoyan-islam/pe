import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
