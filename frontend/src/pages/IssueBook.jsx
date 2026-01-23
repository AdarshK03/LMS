import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import IssueBookModal from "../components/IssueBookModal";

const IssueBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Actual book passed from SearchPage
  const book = location.state?.book;

  // Safety check (direct URL access)
  if (!book) {
    navigate("/search");
    return null;
  }

  const handleConfirm = () => {
    alert("Reservation code will be generated next");
    navigate("/search");
  };

  const handleCancel = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <IssueBookModal
        book={book}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default IssueBook;
