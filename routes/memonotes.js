// routes/memonotes.js

import express from "express";
import {Post} from "../models/index.js";

import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../models/memonote.js";

const router = express.Router();


// GET ALL
//belum menggunakan mongoose, masih menggunakan model memonote yang lama
//router.get("/", (req, res) => {

 // const memonotes = getAll();

  //res.json(memonotes);

//});

//ini yang menggunakan mongoose
// GET ALL
router.get("/", async (req, res, next) => {

  try {

    const memonotes = await Post.find();

    res.json(memonotes);

  } catch (e) {

    next(e);

  }

});


// GET BY ID
//belum menggunakan mongoose, masih menggunakan model memonote yang lama 
//router.get("/:id", (req, res, next) => {

 // const id = Number(req.params.id);

  //try {

   // const memonote = getById(id);

    //res.json(memonote);

  //} catch (e) {

    //next(e);

  //}

//});

//ini yang menggunakan mongoose
router.get("/:id", async (req, res, next) => {

  const id = req.params.id; // ⭐ JANGAN Number()

  try {

    const memonote = await Post.findById(id);

    if (!memonote) {
      return res.status(404).json({
        message: "MemoNote not found"
      });
    }

    res.json(memonote);

  } catch (e) {

    next(e);

  }

});


// CREATE
//ini sudah model mongoose
router.post("/", async (req, res, next) => {

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try {
   
     //const memonote = create(title, content);
    const memonote = await Post.create({
      title,
      content,
    });

    // ⭐ INI YANG WAJIB
    return res.status(201).json(memonote);

  } catch (e) {

    next(e);

  }

});


// UPDATE
// ini masih menggunakan model memonote yang lama, belum mongoose
//router.put("/:id", (req, res, next) => {
  //const id = Number(req.params.id);
  //const { title, content } = req.body;
  //try {
    //const memonote = update(id, title, content);
    //res.json(memonote);

  //} catch (e) {

    //next(e);

 // }

//});


// ini yang menggunakan mongoose
// UPDATE
router.put("/:id", async (req, res, next) => {

  const id = req.params.id; // MongoDB pakai string _id, bukan Number

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try {

    const memonote = await Post.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
      },
      {
        new: true, // supaya return data terbaru
      }
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


// DELETE
// ini masih menggunakan model memonote yang lama, belum mongoose
//router.delete("/:id", (req, res, next) => {

 // const id = Number(req.params.id);

  //try {

   // const memonote = remove(id);

  //  res.json(memonote);

 // } catch (e) {

   // next(e);

 // }

//});

// ini yang menggunakan mongoose
// DELETE by id (MongoDB)
router.delete("/:id", async (req, res, next) => {

  const id = req.params.id;

  try {

    const memonote = await Post.findByIdAndDelete(id);

    if (!memonote) {
      return res.status(404).json({
        message: "MemoNote not found"
      });
    }

    res.json({
      message: "MemoNote deleted successfully",
      data: memonote
    });

  } catch (e) {

    next(e);

  }

});


export default router;