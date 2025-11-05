import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();
const app = express();

app.use("/api/movies", movieRoutes);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LMS Server is running");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {console.log("Connected to MongoDB")})
  .catch((err) => {console.error("MongoDB connection error:", err)});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });


