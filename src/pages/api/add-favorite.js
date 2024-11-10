// /pages/api/add-favorite.js
import { Redis } from '@upstash/redis';

// Initialize Redis connection from environment config
const redis = Redis.fromEnv();


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
    }
    const { email, favorite, token } = req.body;
    
    if (!email || !favorite || !token) {
        return res.status(400).json({ error: 'Email, favorite, and token are required' });
    }
    
    try {
      // Check if token matches the stored token
      // const sessionToken = await redis.get(`user:${storedToken}`);
      const storedToken = await redis.get(`session_token:${email}`);

      if (storedToken !== token) {
        res.status(401).json({ error: 'Unauthorized' });
      }
      // Store the favorite item in Redis
      await redis.set(`favorite:${email}`, favorite);
      res.status(200).json({ message: 'Favorite saved!' });
    } catch (error) {
        console.error('Error adding favorites:', error);
        res.status(500).json({ error: 'Error adding favorite' });
    }
    
} 
      
    
  
  

