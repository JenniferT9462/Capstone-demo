//Import the 'Resend' library to send emaila
import { Resend } from 'resend';
//Import the 'Redis' library to interact w/a redis database
import { Redis } from '@upstash/redis';

//Set up a constant for the email key from environment variables
const EMAIL_KEY = process.env.EMAIL_KEY;

//Initialize an instance for Resend w/the email API key
const resend = new Resend(EMAIL_KEY);

// Initialize Redis connection from environment config
const redis = Redis.fromEnv();

//Define an asynce function to handle incoming requests
export default async function handler(req, res) {
    //Set queries for URL - That later will be used for user inputs
    // const query = req.query;
    // const name = query.name;
    // const message = query.message;
    // const subject = query.subject;

    //Check if the HTTP request method is 'POST'
    if (req.method !== 'POST') {
        //If not a POST request, respond w/status 405(Method Not Allowed)
        return res.status(405).json({ error: 'Method not Allowed'});
    }
    try {
        //Destructure name, email and message from the request body
        const { name, email, message } = req.body;
        //Validate that all required fields are present
        if (!name || !email || !message) {
            //If any field is missing, respond w/a 400 status (Bad Request)
            return res.status(400).json({ error: 'Name, email and message are required'});
        }
         //Increment a Value for tracking purposes
        await redis.incr('count'); 

        //Store name and message - set("key", value)
        await redis.set("name", name); 
        await redis.set("message", message); 

        //Retrieve stored values - By calling it's key-"item" - for debugging purposes
        const result1 = await redis.get("name"); 
        const result2 = await redis.get("message");

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
            result1: result1,
            result2: result2
        });
        //If any error occurs, log it and respond w/a 500 status(Internal Server Error)
        } catch (error) {
            console.error('Error handling the request', error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
}