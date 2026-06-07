import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productManipulationRoutes from "./routes/productManipulationRoutes.js";


dotenv.config();

// creating the express app and defining the port
const app = express();
const PORT = process.env.PORT || 5000;

// setting up cors and json parsing middleware
app.use(cors({origin: process.env.FRONTEND_URL})); // allowing only the frontend url to access the backend for security reasons"}));
app.use(express.json({ limit: "10mb" })); // limmit for the request body to 1mb to prevent DoS attacks. since we are only sending small data (product name, price, description and image) we dont need a bigger limit. also, the image is sent as a buffer and not as a base64 string, so it takes less space in the request body.
app.use(express.urlencoded({ extended: true, limit: "1mb" })); // to handle form data sent from the frontend, and also to set a limit for the request body to 1mb for security reasons. since we are only sending small data (product name, price, description and image) we dont need a bigger limit. also, the image is sent as a buffer and not as a base64 string, so it takes less space in the request body.



// setting the productRoutes

app.use("/api", productRoutes);
app.use("/api", contactRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/admin", productManipulationRoutes);


// setting up the mongodb database connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB!!!!!!!!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
})



