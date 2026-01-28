import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import IssueBookModal from "../components/IssueBookModal";

const IssueBook = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  // 🚨 Safety: direct URL access
  if (!book || String(book.id) !== String(bookId)) {
    navigate("/search", { replace: true });
    return null;
  }

  const [reservation, setReservation] = useState(null);

  const handleConfirm = () => {
    const now = new Date();

    const reservationData = {
      reservationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 30 * 60000).toISOString(), // 30 mins
    };

    setReservation(reservationData);
  };

  const handleCancel = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <IssueBookModal
        book={book}
        reservation={reservation}
        onConfirm={handleConfirm}
        onClose={handleCancel}
      />
    </div>
  );
};

export default IssueBook;
