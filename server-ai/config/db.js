import mongoose from "mongoose";

const mongoDbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default mongoDbConnect;
