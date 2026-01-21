import React, { useState } from "react";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Something went wrong while searching.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">
          <Navbar/>
      <div className="max-w-7xl m-20 mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            📚 Library Catalog
          </h2>
          <p className="text-gray-500">
            Search and manage library books with ease.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by title, author, or ISBN..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none"
          />

          {/* Dummy filters (UI only for now) */}
          <select className="px-3 py-2 border rounded-md bg-white">
            <option>All</option>
          </select>

          <select className="px-3 py-2 border rounded-md bg-white">
            <option>All</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
          >
            Search
          </button>
        </div>

        {/* States */}
        {loading && <p className="text-gray-500">Searching...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Results Count */}
        {!loading && books.length > 0 && (
          <p className="mb-4 font-medium">
            {books.length} Books Found
          </p>
        )}

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => {
            const isAvailable = book.copies > 0;

            return (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
              >
                {/* Category + Status */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase">
                    {book.publisher || "General"}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isAvailable
                        ? "bg-black text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {isAvailable ? "Available" : "Issued"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg mb-1">
                  {book.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-gray-600 mb-3">
                  👤 {book.author}
                </p>

                {/* ISBN + Stock */}
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500">ISBN</p>
                    <p className="font-medium">
                      {book.isbn || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Stock</p>
                    <p className="font-medium">
                      {book.copies}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 border rounded-md py-2 text-sm hover:bg-gray-100">
                    ℹ️ Details
                  </button>
                  <button
                    disabled={!isAvailable}
                    className={`flex-1 py-2 rounded-md text-sm ${
                      isAvailable
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Issue
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {!loading && books.length === 0 && query && (
          <p className="text-gray-500 mt-6">No books found.</p>
        )}

        {/* Pagination (UI only for now) */}
        {books.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button className="px-4 py-2 border rounded text-gray-400">
              Previous
            </button>
            <span className="font-medium">Page 1 of 1</span>
            <button className="px-4 py-2 border rounded text-gray-400">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
