//Import the 'Resend' library to send emails
import { Resend } from 'resend';
//Import the 'Redis' library to interact w/a redis database
import { Redis } from '@upstash/redis';

//Set up a constant for the email key from environment variables
const EMAIL_KEY = process.env.EMAIL_KEY;
//Initialize an instance for Resend w/the email API key
const resend2 = new Resend(EMAIL_KEY);
// Initialize Redis connection from environment config
const redis2 = Redis.fromEnv();

export default async function handler(req, res) {
    //Accept 'POST' request w/a user email as input
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    //Set email to the request body
    const {email}  = req.body;
    //Validate email to include '@' and an email in input field
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email'});
    }
    //Generate a unique token
    function generateRandomToken (length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        //For the length of the 'argument' that is set
        for (let i = 0; i < length; i++) {
            //Randomly generate a index from the character set
            const randomIndex = Math.floor(Math.random() * characters.length);
            //The character at random index is added to the token string
            token += characters.charAt(randomIndex);
        }
        return token;
    }
    const token = generateRandomToken(16);
    console.log(token);

    try {
        //Store unique token and user email to Upstash
        // await redis2.set(email, token, { ex: 900 }); // 900 seconds = 15 minutes
        await redis2.set(`magic_token:${token}`, email, { ex: 900 });
    } catch (error) {
        console.error("Error storing token in Redis:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
    //Construct magic link url
    const magicLink = `${process.env.KV_REST_API_URL}/login?token=${token}`

    //Set up the email object
    const emailObject = {
        to: email,
        from: 'Acme <onboarding@resend.dev>',
        subject: 'Your Magic Login Link',
        html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`
    };

    try {
         //Send an email containing the login link
        await resend2.emails.send(emailObject);
        res.status(200).json({ message: 'Magic link sent' });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
   
  

}