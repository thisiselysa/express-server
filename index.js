import express from 'express';
import mongoose from "mongoose";
import memonotes from './routes/memonotes.js';
import cors from "cors";
//mooongoose.connect
import { Post } from "./models/index.js";


const app = express();
app.use(cors());

app.use(express.json()); // ⭐ NEW → WAJIB untuk POST JSON

//disable cache
app.disable("etag");

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


//mongoose connection
mongoose.connect("mongodb+srv://elysa_db_user:081102277112@coba-cluster.4iboir1.mongodb.net/?appName=coba-cluster")

try {
    await mongoose.connect("mongodb+srv://elysa_db_user:081102277112@coba-cluster.4iboir1.mongodb.net/?appName=coba-cluster");
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

app.get('/', (req, res) => {
    res.send('HELLO ELLLLLLLL');
});

app.get('/say/:greeting', (req, res) => {
    const greeting = req.params.greeting;
    res.send(greeting);
});

app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Halo ${name}, Welcome to elthegoat server 🐐`);
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

// ⭐ NEW → routes memo
app.use('/notes', memonotes);



app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});