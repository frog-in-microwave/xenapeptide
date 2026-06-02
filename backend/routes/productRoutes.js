import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "../models/productModel.js";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const router = express.Router();




// returns a list of products with status 200
// or an error message with status 429 (too many requests) if the rate limit of 10 is exceeded
router.get("/products", rateLimiter, async (req, res) => {
    try {
        const productsList = await Product.find().select("id name price image");
        // console.log("productsList : ", productsList);
        res.status(200).json(productsList);
    }
    catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.post("/product", rateLimiter, async (req, res) => {
  try {
    const { id } = req.body;
    if(!id) {
        return res.status(400).json({ error: "Product name is not sent to the backend" });
    }
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});









export default router;