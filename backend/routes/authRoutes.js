import express from "express";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import jwt from "jsonwebtoken";


dotenv.config();

const router = express.Router();




// sends a jwt token made from the secret and the username and expires in 7 days if the username and pass is correct.
router.post("/login", async (req, res) =>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).json({message : "fields are missing in the /admin/login request body"});
            return;
        }
        if(username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD){
            res.status(401).json({message : "Invalid credentials"});
            return;
        }

        const token = jwt.sign({username : process.env.ADMIN_USERNAME}, process.env.JWT_TOKEN_SECRET, {expiresIn : "7d"});

        res.status(200).json({message : "Login successful", token});
    }catch(err){
        console.error("Error in /admin-login endpoint:", err);
        res.status(500).json({message : "Internal server error"});
    }
})













export default router;