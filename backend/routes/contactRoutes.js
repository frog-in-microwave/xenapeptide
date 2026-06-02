import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import validator from "validator";
import rateLimiter from "../middleware/rateLimiter.js";



dotenv.config();


const router = express.Router();


// this endpoint sends the message from the contact section to the email specified in the .env file
router.post("/contact", rateLimiter, async (req, res) => {
    try{
        // getting the data sent from the frontend
        const {name, email, message, phoneNumber, honeyPot} = req.body;


        // hidden input field. user cant see so if its filled, its a bot
        if(honeyPot){
            res.status(400).json({message : "Bot detected"});
            return;
        }


        // validation
        if(!email || ! name || !message){
            res.status(400).json({message : "Please fill all the fields"});
            return;
        }

        // email validation
        if(!validator.isEmail(email)){
            res.status(400).json({message : "Please enter a valid email"});
            return;
        }




        const formattedMessage = `Name: ${name}
            Email: ${email}
            Phone Number: ${phoneNumber || "Not provided"}
            Message: ${message}
        `;

        // creating the nodemailer transporter
        const transporter = nodemailer.createTransport({
        service: "gmail", // using gmail as the email service. in case of using another service, the configuration will be different. check nodemailer documentation for more details
        
        // email and app password for the sending email account. these should be stored in the .env file for obvious security reasons
        auth: {
            user: process.env.EMAIL_ADRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
        });

        // this is basicaly the email object that will be sent. it contains the sender, the receiver, the subject and the message. 
        // the replyTo field is set to the email of the user who sent the message, so when we reply to the email, it will be sent to the user email instead of the sending email
        const mailOptions = {
          from: `Xenapeptide Contact : ${process.env.EMAIL_ADRESS}`,
          to: process.env.EMAIL_ADRESS,
          subject: "New contact form submission",
          text: formattedMessage,
          replyTo: req.body.email,
        };

        // sending the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: "email sent successfully "});

    }catch(err){
        console.log("error in submitting contact form : " , err);
        res.status(500).json({message : "Error in submitting contact form : " , err});
    }
});



export default router;