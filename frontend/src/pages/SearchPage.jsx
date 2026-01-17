import { useState } from "react";
import Navbar from "@/components/Navbar.jsx";

const booksData = [
  { category: "DYSTOPIAN", title: "1984", author: "George Orwell", isbn: "9780451524935", stock: "0 / 8", status: "Issued" },
  { category: "DYSTOPIAN", title: "Brave New World", author: "Aldous Huxley", isbn: "9780060850524", stock: "6 / 6", status: "Available" },
  { category: "ROMANCE", title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", stock: "2 / 7", status: "Available" },
  { category: "ADVENTURE", title: "The Alchemist", author: "Paulo Coelho", isbn: "9780062315007", stock: "10 / 15", status: "Available" },
  { category: "CLASSIC", title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769174", stock: "1 / 4", status: "Available" },
  { category: "FANTASY", title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "9780066238500", stock: "9 / 9", status: "Available" },
  { category: "CLASSIC", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", stock: "3 / 5", status: "Available" },
  { category: "FANTASY", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", stock: "12 / 12", status: "Available" }
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredBooks = booksData.filter((b) => {
    const q = query.toLowerCase();
    return (
      (b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.includes(query)) &&
      (status === "All" || b.status === status) &&
      (category === "All" || b.category === category)
    );
  });

  return (
    
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />
      {/* HEADER */}
      <div className="bg-white my-20 rounded-2xl p-6 flex justify-between items-center shadow">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📚 Library Catalog
          </h1>
          <p className="text-gray-500">
            Search and manage library books with ease.
          </p>
        </div>
        
      </div>

      {/* SEARCH BAR */}
      <div className="mt-6 flex gap-4">
        <input
          className="flex-1 px-4 py-2 rounded-xl border"
          placeholder="Search by title, author, or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-xl border"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>DYSTOPIAN</option>
          <option>ROMANCE</option>
          <option>ADVENTURE</option>
          <option>CLASSIC</option>
          <option>FANTASY</option>
        </select>

        <select
          className="px-4 py-2 rounded-xl border"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Available</option>
          <option>Issued</option>
        </select>
      </div>

      <h3 className="mt-6 font-semibold">
        {filteredBooks.length} Books Found
      </h3>

      {/* GRID */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((b, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 shadow relative"
          >
            <span
              className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${
                b.status === "Available"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {b.status}
            </span>

            <p className="text-xs text-gray-400">{b.category}</p>
            <h2 className="text-lg font-semibold mt-1">
              {b.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              👤 {b.author}
            </p>

            <div className="mt-4 bg-gray-100 rounded-xl p-3 flex justify-between text-xs">
              <span>
                ISBN<br />
                <b>{b.isbn}</b>
              </span>
              <span className="text-right">
                Stock<br />
                <b>{b.stock}</b>
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50">
                ⓘ Details
              </button>
              <button
                className={`flex-1 rounded-lg py-2 text-sm ${
                  b.status === "Issued"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Issue
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-10 flex justify-center gap-6">
        <button className="border px-4 py-2 rounded-lg text-gray-400">
          Previous
        </button>
        <span className="font-medium">Page 1 of 2</span>
        <button className="border px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
}

