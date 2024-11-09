//Import the 'Redis' library to interact w/a redis database
import { Redis } from '@upstash/redis';

// Initialize Redis connection from environment config
const redis = Redis.fromEnv();

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            //Get all messages
            const messages = await redis.lrange('messages', 0, -1);
            res.status(200).json({ messages })
        } catch (error) {
            res.status(500).json({ error: 'Error fetching messages' })
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
