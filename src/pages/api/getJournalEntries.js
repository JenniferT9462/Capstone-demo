import { Redis } from '@upstash/redis';

// Initialize Redis connection
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            //Get all events
            const entries = await store.lrange('journalEntries', 0, -1);
            res.status(200).json({ entries })
        } catch (error) {
            res.status(500).json({ error: 'Error fetching entries' })
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}