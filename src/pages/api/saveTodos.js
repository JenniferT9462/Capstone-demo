import { Redis } from '@upstash/redis';

// Initialize Redis connection
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, title, completed } = req.body;

        const todoData = {
            id,
            title,
            completed,
        }
        try {
            console.log('Saving todo:', todoData)
            await store.lpush('todos', JSON.stringify(todoData))
            return res.status(200).json({ 
                message: "Todos saved successfully!",
                todoData,
            
             });
        } catch (error) {
            console.error('Error saving todo:', error);
            res.status(500).json({
                message: 'Failed to save todo.',
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}