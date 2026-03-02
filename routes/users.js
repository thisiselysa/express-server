import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";

const router = express.Router();

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* =========================
   GET USER BY ID
========================= */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    // kalau user tidak ada
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


/* =========================
   UPDATE USER
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // cek id valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true } // return data terbaru
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    res.json({
      message: "User berhasil diupdate",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* =========================
   DELETE USER
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    res.json({
      message: "User berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;