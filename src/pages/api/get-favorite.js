import { Redis } from '@upstash/redis';

// Initialize Redis connection from environment config
const redis = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
    const { email } = req.query;
    if (!email) {
        return res.status(405).json({ error: 'Email is required' });
    }
    try {
        const userFav = await redis.get(`favorite:${email}`);
        res.status(200).json({ success: true, userFav });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: 'Error fetching favorites' })
    }
}