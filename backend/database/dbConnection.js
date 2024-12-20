import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    // MONGO_URI = mongodb+srv://vedanshtyagibrd19:JB1qwJRbSlXQUf3e@cluster0.41htz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    // MONGO_URI = mongodb://localhost:27017/
    const connection = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/", {
      dbName: "FoodApp",
    });
    console.log(`Connected to database: ${connection.connection.name}`);
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
    process.exit(1); // Exit the process if the database connection fails
  }
};
