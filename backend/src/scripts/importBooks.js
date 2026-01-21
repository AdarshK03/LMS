// src/scripts/importBooks.js
import xlsx from "xlsx";
import sequelize from "../config/db.js";
import Book from "../models/Book.js";

// Load Excel file
const workbook = xlsx.readFile("data/books.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert to JSON
const rows = xlsx.utils.sheet_to_json(sheet);

(async () => {
  try {
    console.log("⏳ Connecting to database...");
    await sequelize.authenticate();

    console.log(`📚 Importing ${rows.length} books...`);

    for (const row of rows) {
      await Book.create({
        title: row["Book Title"],
        author: row["Book Authors"],
        publisher: row["Publisher"],
        year: row["Year of Publication"],
        copies: row["Copies"],
        class_number: row["Standard Class Number"],
        location: row["Book Location"],
      });
    }

    console.log("✅ Books imported successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
})();
