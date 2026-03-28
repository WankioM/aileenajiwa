import { Router } from "express";
import { Payment } from "../db";

const router = Router();

// ─── STK Push (initiate payment) ──────────────────────────
router.post("/stkpush", async (req, res) => {
  const { phone, amount, name } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: "Phone and amount are required" });
  }

  let normalized = phone.replace(/\s+/g, "").replace(/[^0-9]/g, "");
  if (normalized.startsWith("0")) normalized = "254" + normalized.slice(1);

  if (!/^254[0-9]{9}$/.test(normalized)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  const numAmount = Number(amount);
  if (numAmount < 1 || numAmount > 300000) {
    return res.status(400).json({ error: "Amount must be between 1 and 300,000" });
  }

  try {
    const payment = await Payment.create({
      phone: normalized,
      name: (name || "Anonymous").trim(),
      amount: numAmount,
    });

    // ── DARAJA API (uncomment when you have credentials) ──
    //
    // const token = await getAccessToken();
    // const timestamp = getTimestamp();
    // const password = Buffer.from(
    //   `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    // ).toString("base64");
    //
    // const stkRes = await fetch(
    //   "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       BusinessShortCode: process.env.MPESA_SHORTCODE,
    //       Password: password,
    //       Timestamp: timestamp,
    //       TransactionType: "CustomerPayBillOnline",
    //       Amount: numAmount,
    //       PartyA: normalized,
    //       PartyB: process.env.MPESA_SHORTCODE,
    //       PhoneNumber: normalized,
    //       CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
    //       AccountReference: "AileenSendoff",
    //       TransactionDesc: "Contribution for Aileen Owango send-off",
    //     }),
    //   }
    // );
    //
    // const stkData = await stkRes.json();
    // return res.json({ paymentId: payment._id, ...stkData });

    res.json({
      paymentId: payment._id,
      message: "STK push sent (mock). In production, check your phone.",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// ─── M-Pesa Callback (Daraja posts here after payment) ───
router.post("/callback", async (req, res) => {
  const body = req.body?.Body?.stkCallback;

  if (!body) {
    return res.json({ ResultCode: 1, ResultDesc: "No callback body" });
  }

  const resultCode = body.ResultCode;

  if (resultCode === 0) {
    const items = body.CallbackMetadata?.Item || [];
    const mpesaRef =
      items.find((i: { Name: string; Value: string }) => i.Name === "MpesaReceiptNumber")?.Value || "";
    const paidAmount =
      items.find((i: { Name: string; Value: number }) => i.Name === "Amount")?.Value || 0;

    await Payment.findOneAndUpdate(
      { status: "pending" },
      { status: "completed", mpesaRef, amount: paidAmount },
      { sort: { createdAt: -1 } }
    );
  } else {
    await Payment.findOneAndUpdate(
      { status: "pending" },
      { status: "failed" },
      { sort: { createdAt: -1 } }
    );
  }

  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

// ─── Simulate payment completion (for testing) ───────────
router.post("/simulate/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: "completed",
        mpesaRef: "MOCK" + Date.now().toString(36).toUpperCase(),
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const totalRaised = await getTotal();
    res.json({ payment, totalRaised });
  } catch (err) {
    res.status(500).json({ error: "Failed to simulate payment" });
  }
});

// ─── Get fundraising totals ──────────────────────────────
router.get("/total", async (_req, res) => {
  try {
    const totalRaised = await getTotal();
    const count = await Payment.countDocuments({ status: "completed" });
    res.json({ totalRaised, goal: 1200000, transactionCount: count });
  } catch (err) {
    res.status(500).json({ error: "Failed to get totals" });
  }
});

// ─── Get all payments ────────────────────────────────────
router.get("/payments", async (_req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    const safe = payments.map((p) => ({
      id: p._id,
      name: p.name,
      amount: p.amount,
      status: p.status,
      phone: p.phone.slice(0, 6) + "***" + p.phone.slice(-2),
      createdAt: p.createdAt,
    }));
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: "Failed to get payments" });
  }
});

// ─── Helper: sum completed payments ──────────────────────
async function getTotal(): Promise<number> {
  const result = await Payment.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return result[0]?.total || 0;
}

// ─── Daraja helpers (uncomment when ready) ───────────────
//
// async function getAccessToken(): Promise<string> {
//   const auth = Buffer.from(
//     `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
//   ).toString("base64");
//
//   const res = await fetch(
//     "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//     { headers: { Authorization: `Basic ${auth}` } }
//   );
//   const data = await res.json();
//   return data.access_token;
// }
//
// function getTimestamp(): string {
//   const d = new Date();
//   return d.getFullYear().toString() +
//     String(d.getMonth() + 1).padStart(2, "0") +
//     String(d.getDate()).padStart(2, "0") +
//     String(d.getHours()).padStart(2, "0") +
//     String(d.getMinutes()).padStart(2, "0") +
//     String(d.getSeconds()).padStart(2, "0");
// }

export default router;