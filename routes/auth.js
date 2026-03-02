import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

//
// ======================
// REGISTER
// ======================
//
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cek field kosong
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    // cek email sudah ada
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user baru
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Register berhasil",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


//
// ======================
// LOGIN
// ======================
//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    // cari user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User tidak ditemukan",
      });
    }

    // ✅ COMPARE PASSWORD HASH
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }
    // buat token
const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.status(200).json({
  message: "Login berhasil",
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export default router;