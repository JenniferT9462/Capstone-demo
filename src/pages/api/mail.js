import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const EMAIL_KEY = process.env.EMAIL_KEY;
const resend = new Resend(EMAIL_KEY);
// Initialize Redis
const redis = Redis.fromEnv();


export default async function handler(req, res) {
    const query = req.query;
    const name = query.name;
    const message = query.message;
    const subject = query.subject;

    await redis.set("item", "poop");
    const result = await redis.get("item");
    
    const email = {
        from: 'Acme <onboarding@resend.dev>',
        to: ['jennifertarleton@gmail.com'],
        subject: 'Hello World',
        html: `<strong>${message}</strong>`,
    }
    // await resend.emails.send(email);
    res.status(200).json({
        name: name, subject: subject, message: message, result: result
    })
}