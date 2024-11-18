//API - Save user data to Upstash to retrieve later

//Import the 'Redis' library to interact w/a redis database
import { Redis } from '@upstash/redis';

// Initialize Redis connection from environment config
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, passkey } = req.body;
        const userKey = `user: ${email}`;

        await store.set(userKey, { passkey });
        return res.status(200).json({ message: "User stored successfully "});
    }
    res.status(405).json({ error: "Method not allowed "});
}