import { Redis } from '@upstash/redis';

// Initialize Redis connection
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, date, time, text } = req.body;

        const eventData = {
            id,
            date,
            time,
            text,
            timestamp: new Date().toISOString(), // Add timestamp for tracking
        };

        try {
            // Save the event to a list in Redis
            await store.lpush('events', JSON.stringify(eventData));

            res.status(200).json({
                message: 'Event saved successfully!',
            });
        } catch (error) {
            console.error('Error saving event:', error);
            res.status(500).json({
                message: 'Failed to save event.',
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}