// routes/memonotes.js

import express from "express";
import { Post } from "../models/index.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(verifyToken);


// ======================
// GET ALL (PROTECTED)
// ======================
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const memonotes = await Post.find();
    res.json(memonotes);
  } catch (e) {
    next(e);
  }
});


// ======================
// GET BY ID (PROTECTED)
// ======================
router.get("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    const memonote = await Post.findById(id);

    if (!memonote) {
      return res.status(404).json({
        message: "MemoNote not found",
      });
    }

    res.json(memonote);
  } catch (e) {
    next(e);
  }
});


// ======================
// CREATE (PROTECTED)
// ======================
router.post("/", verifyToken, async (req, res, next) => {
  const { author, title, content } = req.body;

  if (!author || !title || !content) {
    return res.status(400).json({
      message: "Author, title, and content are required",
    });
  }

  try {
    const memonote = await Post.create({
      author,
      title,
      content,
    });

    res.status(201).json(memonote);
  } catch (e) {
    next(e);
  }
});


// ======================
// UPDATE (PROTECTED)
// ======================
router.put("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;
  const { author, title, content } = req.body;

  if (!author || !title || !content) {
    return res.status(400).json({
      message: "Author, title, and content are required",
    });
  }

  try {
    const memonote = await Post.findByIdAndUpdate(
      id,
      { author, title, content },
      { new: true }
    );

    if (!memonote) {
      return res.status(404).json({
        message: "MemoNote not found",
      });
    }

    res.json(memonote);
  } catch (e) {
    next(e);
  }
});


// ======================
// DELETE (PROTECTED)
// ======================
router.delete("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    const memonote = await Post.findByIdAndDelete(id);

    if (!memonote) {
      return res.status(404).json({
        message: "MemoNote not found",
      });
    }

    res.json({
      message: "MemoNote deleted successfully",
      data: memonote,
    });
  } catch (e) {
    next(e);
  }
});

export default router;