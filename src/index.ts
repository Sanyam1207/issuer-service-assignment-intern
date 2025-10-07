import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import issueRoute from "./routes/issue";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI as string);

app.use("/issue", issueRoute);

app.get("/", (_, res) => res.send("🟢 Issuer Service running"));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Issuer running on port ${PORT}`));
