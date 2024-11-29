import { Redis } from '@upstash/redis';

// Initialize Redis connection
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, frequency, progress } = req.body;
        const habitData = {
            name, frequency, progress
        }
        await store.lpush('habits', JSON.stringify({habitData}))
        return res.status(200).json({ 
            message: "Todos saved successfully!",
            habitData,
        
         });
    }
}