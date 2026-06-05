import express from "express";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import authenticateToken from "../middleware/authenticateToken.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

import multer from "multer";
import imagekit from "imagekit";
import crypto from "crypto";


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
      const productExists = await Product.findOne({ name: req.body.name });
      if (productExists) {
        res
          .status(400)
          .json({ message: "Product with the same name already exists" });
        return;
      }

      const result = await imagekitObject.upload({
        file: req.file.buffer, // image buffer
        fileName: req.body.name, // name
        folder: "/products",
      });
      // if the image upload failed, return an error
      if (!result || !result.url) {
        return res.status(500).json({ message: "Image upload failed" });
      }

      const newProduct = Product({
        id: crypto.randomUUID(), // generating a unique id for the product using crypto module
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: result.url, // the url of the uploaded image returned from imagekit
        fileId: result.fileId, // the fileId of the uploaded image returned from imagekit, we will use this fileId to delete the image from imagekit when we delete the product from the database
      });
      await newProduct.save();

      res.status(200).json({ message: "Product added successfully" });
    }catch(err){
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})





router.delete("/remove-product", authenticateToken, rateLimiter, async (req, res) => {
    const { name } = req.body;
    if(!name){
        res.status(400).json({message : "Product name is not sent to the backend"});
        return;
    }

    try{
        const deletedProduct = await Product.findOneAndDelete({ name });
        if(!deletedProduct){
            res.status(404).json({message : "Product not found"});
            return;
        }

        // deleting the image from imagekit using the fileId stored in the database
        await imagekitObject.deleteFile(deletedProduct.fileId);

        res.status(200).json({message : "Product removed successfully"});
    }catch(err){
        console.error("Error removing product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})







router.put("/edit-product", authenticateToken, rateLimiter, upload.single("newImage"), async (req, res) => {
    try {
      const { productName, newName, newDescription, newPrice } = req.body;

      if (!productName || !newName && !newDescription && !newPrice && !req.file) {
        res
          .status(400)
          .json({ message: "Please fill at least one of the fields" });
        return;
      }

      const product = await Product.findOne({ name: productName });
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      let result = {};
      if (req.file) {
        result = await imagekitObject.upload({
          file: req.file.buffer, // image buffer
          fileName: req.body.newName || productName, // name
          folder: "/products",
        });
        // if the image upload failed, return an error
        if (!result || !result.url) {
          return res.status(500).json({ message: "Image upload failed" });
        }

        // deleting the image from imagekit using the fileId stored in the database
        await imagekitObject.deleteFile(product.fileId);
      }

      const newProduct = {
        id: product.id,
        name: newName || product.name,
        description: newDescription || product.description,
        price: newPrice || product.price,
        image: result.url || product.image, // the url of the uploaded image returned from imagekit
        fileId: result.fileId || product.fileId, // the fileId of the uploaded image returned from imagekit
      };

      await Product.findOneAndUpdate({ name: productName }, newProduct);

      

      res.status(200).json({ message: "Product edited successfully", product: newProduct });
    }catch(err){
        console.error("Error editing product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})












export default router;