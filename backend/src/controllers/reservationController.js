import crypto from "crypto";
import BookReservation from "../models/BookReservation.js";
import { canCancelReservation, hasRecentReservation } from "../utils/reservationRules.js";

export const createReservation = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  const existing = await BookReservation.findAll({ where: { userId } });
  if (hasRecentReservation(existing)) {
    return res.status(403).json({
      message: "You can only reserve 1 book every 7 days",
    });
  }

  const reservationCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const reservation = await BookReservation.create({
    userId,
    bookId,
    reservationCode,
    expiresAt,
  });

  res.json(reservation);
};

export const cancelReservation = async (req, res) => {
  const { id } = req.params;
  const reservation = await BookReservation.findByPk(id);

  if (!reservation || reservation.userId !== req.user.id) {
    return res.status(404).json({ message: "Reservation not found" });
  }

  if (!canCancelReservation(reservation)) {
    return res.status(403).json({ message: "Cancellation window expired" });
  }

  reservation.status = "CANCELLED";
  await reservation.save();

  res.json({ success: true });
};
