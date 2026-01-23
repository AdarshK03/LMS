import React from "react";

const IssueBookModal = ({ book, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onCancel}
      />

      {/* Glass Modal */}
      <div
        className="
          relative w-[90%] sm:w-[420px]
          rounded-2xl
          bg-white/70
          backdrop-blur-xl
          border border-white/30
          shadow-2xl
          p-6
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Book Issue
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* Book Info */}
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-500">
            You are about to reserve
          </p>

          <h3 className="text-xl font-semibold">
            {book.title}
          </h3>

          <p className="text-sm text-gray-700">
            👤 {book.author}
          </p>

          <div className="flex justify-between text-sm text-gray-600 mt-3">
            <span>Publisher</span>
            <span>{book.publisher}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Available Copies</span>
            <span>{book.copies}</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-black/5 rounded-lg p-3 text-sm text-gray-700 mb-6">
          A temporary reservation code will be generated.
          <br />
          Show it to the librarian within the allowed time.
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Confirm Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueBookModal;
