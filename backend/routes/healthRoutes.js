import express from "express";
import rateLimiter from "../middleware/rateLimiter.js";




const router = express.Router();

router.get("/health", rateLimiter, (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});


export default router;