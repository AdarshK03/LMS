import express from "express";

const router = express.Router();

// Temporary placeholder
router.get("/", (req, res) => {
  res.json({ message: "User route working ✅" });
});

export default router;
