import express from "express";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import authenticateToken from "../middleware/authenticateToken.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

import multer from "multer";
import imagekit from "imagekit";


dotenv.config();

// creating the imagekit instance, its called imagekit and it will be used to call the .upload method to upload the images to imagekit and get the url of the uploaded image.
const imagekitObject = new imagekit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});





const router = express.Router();

// creating the multer instance, its called upload and it will be used as middleware to handle the image uploaded from the frontend.
// we are doing this to turn the image to a buffer format (because its saved in the RAM as buffer).
// the buffer will be uploaded to imagekit, since its imagekit.upload takes the buffer of an image.
const upload = multer({
  storage: multer.memoryStorage(),
});



// we used the upload.single("image") middleware to handle the image uploaded from the frontend.
// after this middleware we will have access to the image in the req.file object, and we can get the buffer of the image from req.file.buffer.
// also, this middleware will automatically separate the data sent by the request into req.body (for the text data) and req.file (for the image data),
// so we can easily access the name, price and description of the product from req.body and the image from req.file.
router.post("/add-product", authenticateToken, rateLimiter, upload.single("image"), async (req, res) => {
    try{
        const result = await imagekitObject.upload({
            file: req.file.buffer, // image buffer
            fileName: req.body.name, // name 
            folder: "/products",
        });



        const newProduct = Product({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            image : result.url, // the url of the uploaded image returned from imagekit
        })
        await newProduct.save();

        res.status(200).json({message : "Product added successfully"});

    }catch(err){
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})





router.put("add-product", authenticateToken, rateLimiter)










export default router;