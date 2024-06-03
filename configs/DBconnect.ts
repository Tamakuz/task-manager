import mongoose from "mongoose";
// track the connection
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "task-manager",
    });
    console.log("DB connected already");
  } catch (error) {
    console.log(error);
  }
};