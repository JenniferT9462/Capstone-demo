// pages/api/messages.js
import { Redis } from "@upstash/redis";


// Initialize Redis connection from environment config
const redis = Redis.fromEnv();


export default async function Handler(req, res){
    const name = req.query.name
    const message = await redis.get(`message:${name}`);
    const email = await redis.get(`email:${name}`);

    

    res.status(200).json({
        message: message,
        email: email
        
    });
}
