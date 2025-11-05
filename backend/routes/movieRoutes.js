import express from 'express';
import { Query } from 'mongoose';
import movie from '../models/Movie.js';

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const movies = await movie.find({}, { title: 1 }).limit(5);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all movies" });
  }
});


// GET /movies - Retrieve all movies
router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const movies = await movie.find(
            {title: { $regex: query, $options: "i" }},
            {title: 1, year: 1, plot: 1}
        ).limit(10);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

export default router;