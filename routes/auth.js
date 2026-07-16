import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "replace_me_with_a_strong_secret";

function buildToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function authRoutes(app) {
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.toLowerCase().trim();

    if (!trimmedName || !trimmedEmail || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    try {
      const user = await User.create({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      const token = buildToken(user);
      res.status(201).json({ token, user: user.toJSON() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to create user." });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const valid = await user.comparePassword(password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = buildToken(user);
      res.json({ token, user: user.toJSON() });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Login failed." });
    }
  });
}
