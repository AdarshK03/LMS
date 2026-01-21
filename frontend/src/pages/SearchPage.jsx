import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const MOCK_BOOKS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Sample Book ${i + 1}`,
  author: `Author ${i + 1}`,
  isbn: `978-0000-${i + 1}`,
  publisher: i % 2 === 0 ? "O'Reilly" : "Pearson",
  year: 2015 + (i % 8),
  location: `Shelf ${String.fromCharCode(65 + (i % 5))}-${i + 1}`,
  copies: i % 3 === 0 ? 0 : Math.floor(Math.random() * 5) + 1,
}));

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setBooks(MOCK_BOOKS); // initial load (can be removed later)
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error();

      const data = await response.json();
      setBooks(data);
    } catch {
      setError("Something went wrong while searching.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="max-w-7xl m-20 mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-1">📚 Library Catalog</h2>
          <p className="text-gray-500">All your books are here.</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by title, author, or ISBN..."
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-500">Searching...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && books.length > 0 && (
          <p className="mb-4 font-medium">{books.length} Books Found</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => {
            const isAvailable = book.copies > 0;

            return (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase">
                    {book.publisher}
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

                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">👤 {book.author}</p>

                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500">ISBN</p>
                    <p className="font-medium">{book.isbn || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Stock</p>
                    <p className="font-medium">{book.copies}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setIsModalOpen(true);
                    }}
                    className="border rounded-md py-2 px-4 hover:bg-gray-100"
                  >
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
      </div>

      {/* MODAL */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedBook(null);
            }}
          />

          <div className="relative bg-white rounded-xl shadow-xl p-6 w-11/12 sm:w-1/2 lg:w-1/3">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Book Details</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBook(null);
                }}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-500 uppercase">Title</p>
                <p className="font-semibold text-base">{selectedBook.title}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Author</p>
                <p>{selectedBook.author}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Publisher</p>
                <p>{selectedBook.publisher}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Year</p>
                  <p>{selectedBook.year || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Copies</p>
                  <p>{selectedBook.copies}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Location</p>
                <p>{selectedBook.location || "Not specified"}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBook(null);
                }}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
