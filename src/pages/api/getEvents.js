import { Redis } from '@upstash/redis';
// Initialize Redis connection from environment config
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            //Get all events
            const events = await store.lrange('events', 0, -1);
            res.status(200).json({ events })
        } catch (error) {
            res.status(500).json({ error: 'Error fetching events' })
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}