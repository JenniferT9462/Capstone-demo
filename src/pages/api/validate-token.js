
//Import the 'Redis' library to interact w/a redis database
import { Redis } from '@upstash/redis';

// Initialize Redis connection from environment config
const redis = Redis.fromEnv();

export default async function handler(req, res) {
    //Set token to request query
    const { token } = req.query;
    //Check if user has a token
    if (!token) {
        return res.status(400).json({ error: 'Token is required '});
    }
    try {
        //Get token from Upstash
        const userEmail = await redis.get(`magic_token:${token}`);
        //Check if token is valid
        if (!userEmail) {
            return res.status(401).json({ error: 'Invalid or expired token'});
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
        const sessionToken = generateRandomToken(16);
        console.log(sessionToken);
        // Store session token in Upstash if necessary or pass it in the response
        // await redis.set(`user:${storedToken}`, sessionToken, { ex: 3600 });
        await redis.set(`session_token:${userEmail}`, sessionToken, { ex: 3600 });

        // Clean up: delete magic token after use
        // await redis.del(`magic_token:${token}`);

        return res.status(200).json({ success: true, sessionToken });
    } catch (error) {
        console.error('Error validating token:', error);
        return res.status(500).json({ error: 'Error validating token' });
    }
    
}
