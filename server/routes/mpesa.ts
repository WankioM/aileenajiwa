import { Router } from "express";
import { randomUUID } from "crypto";
import { db } from "../db";

const router = Router();

// ─── STK Push (initiate payment) ──────────────────────────
router.post("/stkpush", async (req, res) => {
  const { phone, amount, name } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: "Phone and amount are required" });
  }

  // Normalize phone: 07XX → 2547XX
  let normalized = phone.replace(/\s+/g, "").replace(/[^0-9]/g, "");
  if (normalized.startsWith("0")) normalized = "254" + normalized.slice(1);

  if (!/^254[0-9]{9}$/.test(normalized)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  const numAmount = Number(amount);
  if (numAmount < 1 || numAmount > 300000) {
    return res.status(400).json({ error: "Amount must be between 1 and 300,000" });
  }

  const payment = {
    id: randomUUID(),
    phone: normalized,
    name: (name || "Anonymous").trim(),
    amount: numAmount,
    mpesaRef: "",
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  const data = db.read();
  data.payments.push(payment);
  db.write(data);

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
  // return res.json({ paymentId: payment.id, ...stkData });

  // ── MOCK RESPONSE (remove when using Daraja) ──
  res.json({
    paymentId: payment.id,
    message: "STK push sent (mock). In production, check your phone.",
  });
});

// ─── M-Pesa Callback (Daraja posts here after payment) ───
router.post("/callback", (req, res) => {
  const body = req.body?.Body?.stkCallback;

  if (!body) {
    return res.json({ ResultCode: 1, ResultDesc: "No callback body" });
  }

  const resultCode = body.ResultCode;
  const checkoutId = body.CheckoutRequestID;

  const data = db.read();

  if (resultCode === 0) {
    // Payment successful — extract M-Pesa ref
    const items = body.CallbackMetadata?.Item || [];
    const mpesaRef =
      items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value || "";
    const paidAmount =
      items.find((i: any) => i.Name === "Amount")?.Value || 0;

    // Find the pending payment and update it
    const payment = data.payments.find((p) => p.status === "pending");
    if (payment) {
      payment.status = "completed";
      payment.mpesaRef = mpesaRef;
      data.totalRaised += Number(paidAmount);
      db.write(data);
    }
  } else {
    // Payment failed
    const payment = data.payments.find((p) => p.status === "pending");
    if (payment) {
      payment.status = "failed";
      db.write(data);
    }
  }

  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

// ─── Simulate payment completion (for testing without Daraja) ─
router.post("/simulate/:paymentId", (req, res) => {
  const { paymentId } = req.params;
  const data = db.read();

  const payment = data.payments.find((p) => p.id === paymentId);
  if (!payment) {
    return res.status(404).json({ error: "Payment not found" });
  }

  payment.status = "completed";
  payment.mpesaRef = "MOCK" + Date.now().toString(36).toUpperCase();
  data.totalRaised += payment.amount;
  db.write(data);

  res.json({ payment, totalRaised: data.totalRaised });
});

// ─── Get fundraising totals ──────────────────────────────
router.get("/total", (_req, res) => {
  const data = db.read();
  const completed = data.payments.filter((p) => p.status === "completed");
  res.json({
    totalRaised: data.totalRaised,
    goal: 1200000,
    transactionCount: completed.length,
  });
});

// ─── Get all payments ────────────────────────────────────
router.get("/payments", (_req, res) => {
  const data = db.read();
  // Return payments but mask phone numbers for privacy
  const safe = data.payments.map((p) => ({
    id: p.id,
    name: p.name,
    amount: p.amount,
    status: p.status,
    phone: p.phone.slice(0, 6) + "***" + p.phone.slice(-2),
    createdAt: p.createdAt,
  }));
  res.json(safe);
});

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
