import { Router } from "express";
import { Tribute } from "../db";

const router = Router();

// GET all tributes (newest first)
router.get("/", async (_req, res) => {
  try {
    const tributes = await Tribute.find().sort({ createdAt: -1 });
    res.json(tributes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tributes" });
  }
});

// POST new tribute
router.post("/", async (req, res) => {
  const { name, relationship, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  try {
    const tribute = await Tribute.create({
      name: name.trim(),
      relationship: relationship?.trim() || "",
      message: message.trim(),
    });
    res.status(201).json(tribute);
  } catch (err) {
    res.status(500).json({ error: "Failed to save tribute" });
  }
});

export default router;