//Import the 'Resend' library to send emails
import { Resend } from 'resend';
//Import the 'Redis' library to interact w/a redis database
import { Redis } from '@upstash/redis';
//Set up a constant for the email key from environment variables
const EMAIL_KEY = process.env.EMAIL_KEY;
//Initialize an instance for Resend w/the email API key
const resend = new Resend(EMAIL_KEY);
// Initialize Redis connection from environment config
const redis = Redis.fromEnv();

//Define an async function to handle incoming requests
export default async function handler(req, res) {
    
    
    try {
        //Set queries for URL - That later will be used for user inputs
        const name = req.query.name;
        const message = req.query.message;
        const email = req.query.email
        // //Validate that all required fields are present
        // if (!name || !email || !message) {
        //     //If any field is missing, respond w/a 400 status (Bad Request)
        //     return res.status(400).json({ error: 'Name, email and message are required'});
        // }
         //Increment a Value for tracking purposes
        await redis.incr('count'); 

        //Store name, message and email - set("key", value)
        await redis.set("name:", name); 
        await redis.set(`message:${name}`, message); 
        await redis.set(`email:${name}`, email);

         // Push the message to Upstash
        const messageData = {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
        };
        await redis.lpush('messages', JSON.stringify(messageData));


        //Retrieve stored values - By calling it's key-"item" - for debugging purposes
        const nameRes = await redis.get("name:"); 
        const messageRes = await redis.get(`message:${name}`);
        const emailRes = await redis.get(`email:${name}`);

        //Set up the email object
        const emailObject = {
            from: 'Acme <onboarding@resend.dev>',
            to: ['jennifertarleton@gmail.com'],
            subject: 'Contact Form Submission',
            html: `<p><strong>From: </strong> ${name} (${email})</p>
                   <p><strong>Message: </strong> ${message}</p>`
        };

        //Send the email
        await resend.emails.send(emailObject);

        //Send a success response
        res.status(200).json({
            message: 'Message sent successfully!',
            nameRes: nameRes,
            emailRes: emailRes,
            messageRes: messageRes
        });
        //If any error occurs, log it and respond w/a 500 status(Internal Server Error)
        } catch (error) {
            console.error('Error handling the request', error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
}