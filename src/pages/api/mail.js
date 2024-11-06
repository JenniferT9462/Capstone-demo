import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const EMAIL_KEY = process.env.EMAIL_KEY;
const resend = new Resend(EMAIL_KEY);
// Initialize Redis
const redis = Redis.fromEnv();


export default async function handler(req, res) {
    //Set queries for URL - That later will be used for user inputs
    // const query = req.query;
    // const name = query.name;
    // const message = query.message;
    // const subject = query.subject;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not Allowed'});
    }
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
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
        } catch (error) {
            console.error('Error handling the request', error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
}