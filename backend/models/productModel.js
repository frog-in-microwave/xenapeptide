import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    fileId: { type: String, required: true }, // to store the fileId returned by imagekit for later deletion
});


const Product = mongoose.model("Product", productSchema);

export default Product;