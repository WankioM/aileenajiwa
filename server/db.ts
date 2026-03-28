import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// ── Tribute ──
const tributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, default: "" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Tribute = mongoose.model("Tribute", tributeSchema);

// ── Payment ──
const paymentSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  name: { type: String, default: "Anonymous" },
  amount: { type: Number, required: true },
  mpesaRef: { type: String, default: "" },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model("Payment", paymentSchema);