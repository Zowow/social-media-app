dotenv.config();

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

// Database
import connectToMongoDB from "./_db/connectToMongoDB.js";


import authRoutes from "./_routes/authRoutes.route.js"
import userRoutes from "./_routes/userRoutes.route.js"
import postRoutes from "./_routes/postRoutes.route.js"

import {v2 as cloudinary} from "cloudinary"

const app = express();
const PORT = process.env.PORT || 5000


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Middlewares
app.use(express.json({
    limit: '50mb' //increase incoming data for image
})); // to parse the incoming requests with JSON payloads
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is connected to ${PORT}`)
})