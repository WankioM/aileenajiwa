import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import tributeRoutes from "./routes/tributes";
// import mpesaRoutes from "./routes/mpesa";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/tributes", tributeRoutes);
// app.use("/api/mpesa", mpesaRoutes);

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});