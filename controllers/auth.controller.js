import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

/**
 * ================= REGISTER =================
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validasi
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password minimal 6 karakter",
      });
    }

    // cek email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah digunakan",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // hapus password dari response
    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "Register berhasil",
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * ================= LOGIN =================
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    const match = await comparePassword(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // hilangkan password
    const { password: _, ...safeUser } = user.toObject();

    res.json({
      message: "Login berhasil",
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};