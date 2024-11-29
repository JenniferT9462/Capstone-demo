import { Redis } from '@upstash/redis';

// Initialize Redis connection
const store = Redis.fromEnv();

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { date, journalEntry } = req.body;

        const journalData = {
            date,
            journalEntry,
        }

        try {
            await store.lpush('journalEntries', JSON.stringify(journalData));
            res.status(200).json({
                message: 'Entry saved successfully!',
                journalData,
            });
        } catch (error) {
            console.error('Error saving entry:', error);
            res.status(500).json({
                message: 'Failed to save entry.',
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}