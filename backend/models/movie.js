import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("movie", movieSchema, "movies");