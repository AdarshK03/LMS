import { useEffect, useState } from "react";

const IssueBookModal = ({ book, reservation, onConfirm, onClose }) => {
  const [canCancel, setCanCancel] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!reservation) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const created = new Date(reservation.createdAt).getTime();
      const expires = new Date(reservation.expiresAt).getTime();

      const cancelAllowed = now - created <= 5 * 60000;
      setCanCancel(cancelAllowed);

      const diff = expires - now;
      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Glass Modal */}
      <div className="relative w-[90%] sm:w-[420px] rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl p-6">
        {!reservation ? (
          <>
            <h2 className="text-lg font-semibold mb-3">
              Confirm Book Reservation
            </h2>

            <div className="space-y-2 text-sm text-gray-700 mb-6">
              <p className="font-semibold text-base">{book.title}</p>
              <p>👤 {book.author}</p>
              <p>🏢 {book.publisher}</p>
              <p>📍 {book.location}</p>
            </div>

            <div className="bg-black/5 rounded-lg p-3 text-sm mb-6">
              A reservation code will be generated and valid for 30 minutes.
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Confirm Issue
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-3">
              Reservation Confirmed
            </h2>

            <p className="text-sm text-gray-500 mb-1">
              Reservation Code
            </p>

            <div className="text-3xl font-mono tracking-widest mb-4">
              {reservation.reservationCode}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Valid for: <strong>{timeLeft}</strong>
            </p>

            <button
              disabled={!canCancel}
              onClick={onClose}
              className={`w-full py-2 rounded-lg ${
                canCancel
                  ? "border hover:bg-gray-100"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              Cancel Reservation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IssueBookModal;
