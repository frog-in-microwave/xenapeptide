import express from "express";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// this function authenticates the token for tasks that require authentication
// the token is taken from the local strorage and passed in the header with the "authorization" key and the value is "Bearer <token>"
const authenticateToken = (req, res, next) => {
    try{

        // getting the token from the header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log("Received token in header:", authHeader);

        // if token doesnt exist, bad request (return 401)
        if(!token){
            res.status(401).json({message : "no token provided in the header"});
            return;
        }

        // verifying the token
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, payload) => {
            if(err){
                res.status(403).json({message : "token is not verified"});
                return;
            }
           



            next(); // going for the next middleware or the route handler
        });
    }catch(err){
        console.log("error in checking token : " , err);
        return res.json({message : "error with checking the token" , err});
    }

}


export default authenticateToken;