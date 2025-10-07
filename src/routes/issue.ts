import express, { Request, Response } from "express";
import Credential from "../models/Credentials";
import cryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "default_secret";
const WORKER_ID = process.env.WORKER_ID || "worker-unknown";

// Issue credential (encrypt)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, credentialData } = req.body;
    if (!userId || !credentialData)
      return res.status(400).json({ message: "userId and credentialData required" });

    const existing = await Credential.findOne({ userId });
    if (existing) return res.json({ message: "Credential already exists" });

    const encrypted = cryptoJS.AES.encrypt(
      JSON.stringify(credentialData),
      SECRET_KEY
    ).toString();

    const newCredential = await Credential.create({
      userId,
      encryptedData: encrypted,
      worker: WORKER_ID
    });

    res.status(201).json({
      message: "Credential issued successfully",
      worker: WORKER_ID,
      timestamp: newCredential.issuedAt,
      encrypted: encrypted
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
