import fs from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "db.json");

export interface Tribute {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  phone: string;
  name: string;
  amount: number;
  mpesaRef: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

interface DB {
  tributes: Tribute[];
  payments: Payment[];
  totalRaised: number;
}

function read(): DB {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    const empty: DB = { tributes: [], payments: [], totalRaised: 0 };
    write(empty);
    return empty;
  }
}

function write(data: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = { read, write };
