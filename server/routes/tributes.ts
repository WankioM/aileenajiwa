import { Router } from "express";
import { randomUUID } from "crypto";
import { db } from "../db";

const router = Router();

// GET all tributes
router.get("/", (_req, res) => {
  const data = db.read();
  res.json(data.tributes);
});

// POST new tribute
router.post("/", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  const tribute = {
    id: randomUUID(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  const data = db.read();
  data.tributes.unshift(tribute); // newest first
  db.write(data);

  res.status(201).json(tribute);
});

export default router;
