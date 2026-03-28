import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mpesaRouter from "./routes/mpesa";
import tributesRouter from "./routes/tributes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/mpesa", mpesaRouter);
app.use("/api/tributes", tributesRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
