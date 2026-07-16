import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { seedDatabase } from "./seed.js";
import { authRoutes } from "./routes/auth.js";
import { contentRoutes } from "./routes/content.js";
import { aiRoutes } from "./routes/ai.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Alpha Score API is running." });
});

authRoutes(app);
contentRoutes(app);
aiRoutes(app);

app.use((req, res) => {
  res.status(404).json({ message: "API route not found." });
});

async function startServer() {
  try {
    await connectDb();
    await seedDatabase();
    app.listen(port, () => {
      console.log(`Alpha Score backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Global error handlers to prevent crashes
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

startServer();
