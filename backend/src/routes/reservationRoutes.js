import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createReservation,
  cancelReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.delete("/:id/cancel", authMiddleware, cancelReservation);

export default router;
