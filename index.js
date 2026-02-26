import express from 'express';
import mongoose from "mongoose";
import memonotes from './routes/memonotes.js';
import { Post } from "./models/index.js";

const app = express();

app.use(express.json());


// CONNECT MONGODB (hanya sekali)
try {

  await mongoose.connect("mongodb+srv://elysa_db_user:081102277112@coba-cluster.4iboir1.mongodb.net/myapp");

  console.log("Connected to MongoDB");

} catch (error) {

  console.error("MongoDB connection error:", error);

}


// ROUTES
app.get('/', (req, res) => {
    res.send('HELLO ELLLLLLLL');
});

app.get('/say/:greeting', (req, res) => {
    res.send(req.params.greeting);
});

app.get('/user/:name', (req, res) => {
    res.send(`Halo ${req.params.name}, Welcome to elthegoat server 🐐`);
});

app.get('/admin', (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Token Diperlukan"
        });
    }

    res.json({
        message: "Welcome Admin"
    });

});


// MEMO ROUTES
app.use('/notes', memonotes);


// ERROR HANDLER
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });

});


// PORT FIX (WAJIB untuk hosting)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});