import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const IssueBookFinal = () => {
  const { bookId } = useParams();
  const [reservation, setReservation] = useState(null);
  const [canCancel, setCanCancel] = useState(true);

  const createReservation = async () => {
    const res = await fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });

    const data = await res.json();
    setReservation(data);
  };

  useEffect(() => {
    if (!reservation) return;

    const interval = setInterval(() => {
      const diff =
        (Date.now() - new Date(reservation.createdAt)) / 60000;
      setCanCancel(diff <= 5);
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation]);

  const cancelReservation = async () => {
    await fetch(
      `http://localhost:5000/api/reservations/${reservation.id}/cancel`,
      { method: "DELETE", credentials: "include" }
    );
    setReservation(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="max-w-md mx-auto mt-32">
        {!reservation ? (
          <button
            onClick={createReservation}
            className="w-full py-3 bg-black text-white rounded-lg"
          >
            Confirm Issue
          </button>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              Reservation Confirmed
            </h2>

            <p className="text-sm text-gray-600 mb-3">
              Reservation Code
            </p>

            <div className="text-3xl font-mono tracking-widest mb-4">
              {reservation.reservationCode}
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Valid until{" "}
              {new Date(reservation.expiresAt).toLocaleTimeString()}
            </p>

            <button
              disabled={!canCancel}
              onClick={cancelReservation}
              className={`w-full py-2 rounded-md ${
                canCancel
                  ? "border hover:bg-gray-100"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              Cancel Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueBookFinal;
