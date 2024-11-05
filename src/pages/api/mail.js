import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const EMAIL_KEY = process.env.EMAIL_KEY;
const resend = new Resend(EMAIL_KEY);
// Initialize Redis
const redis = Redis.fromEnv();


export default async function handler(req, res) {
    //Set queries for URL - That later will be used for user inputs
    const query = req.query;
    const name = query.name;
    const message = query.message;
    const subject = query.subject;


    //Increment a Value
    await redis.incr('count'); 
    
    //Set a Value - set("key", value)
    await redis.set("item", "poop"); 
    //Get a Value - By calling it's key-"item"
    const result = await redis.get("item"); 
    
    //Email Object
    const email = {
        from: 'Acme <onboarding@resend.dev>',
        to: ['jennifertarleton@gmail.com'],
        subject: 'Hello World',
        html: `<strong>${message}</strong>`,
    }
    //Initialize email sending w/email object from above
    //await resend.emails.send(email);

    //Set up ok response
    res.status(200).json({
        name: name, subject: subject, message: message, result: result
    })
}