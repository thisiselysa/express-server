import express from "express";
import mongoose from "mongoose";
import memonotes from "./routes/memonotes.js";

const app = express();

app.use(express.json());

/* ========================
   MONGODB CONNECTION
======================== */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in environment variables");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ========================
   ROUTES
======================== */

app.get("/", (req, res) => {
  res.send("HELLO ELLLLLLLL");
});

app.get("/say/:greeting", (req, res) => {
  res.send(req.params.greeting);
});

app.get("/user/:name", (req, res) => {
  res.send(`Halo ${req.params.name}, Welcome to elthegoat server 🐐`);
});

app.get("/admin", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Token Diperlukan",
    });
  }

  res.json({ message: "Welcome Admin" });
});

app.use("/notes", memonotes);

/* ========================
   ERROR HANDLER
======================== */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

/* ========================
   EXPORT FOR VERCEL
======================== */

export default app;

/* ========================
   LOCAL SERVER ONLY
======================== */

if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}