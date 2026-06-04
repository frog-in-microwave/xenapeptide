import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();

// creating the express app and defining the port
const app = express();
const PORT = process.env.PORT || 5000;



// setting up cors and json parsing middleware
app.use(cors({origin: "*"}));
app.use(express.json());



// setting the productRoutes

app.use("/api", productRoutes);
app.use("/api", contactRoutes);
app.use("/api/admin", authRoutes);


// setting up the mongodb database connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB!!!!!!!!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
})



