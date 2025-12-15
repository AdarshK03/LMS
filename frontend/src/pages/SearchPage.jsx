import React from "react";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Search Books
        </h2>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by title, author or category"
            className="flex-1 px-3 py-2 border rounded-l"
          />
          <button className="bg-green-600 text-white px-4 rounded-r hover:bg-green-700">
            Search
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Search Results</h3>
          <ul className="space-y-2">
            <li className="border p-3 rounded">📘 Book Name 1</li>
            <li className="border p-3 rounded">📗 Book Name 2</li>
            <li className="border p-3 rounded">📕 Book Name 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;