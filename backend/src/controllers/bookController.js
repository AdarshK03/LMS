import { Op } from "sequelize";
import Book from "../models/Book.js";

export const searchBooks = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
          { publisher: { [Op.iLike]: `%${query}%` } },
        ],
      },
      limit: 20,
      order: [["title", "ASC"]],
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
