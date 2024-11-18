import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Main/NavBar";

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    //Function to fetch messages
    async function fetchMessages() {
        try {
            setLoading(true);
            const response = await fetch('/api/all-messages');
            const data = await response.json();
            
            //Confirm data structure
            console.log("Fetched data:", data.messages);
            if (Array.isArray(data.messages)) {
                // Filtering Null and Undefined Entries
                setMessages(data.messages.filter((message) => message && typeof message === 'object'));
            } else {
                console.error("Unexpected data structure:", data);
                setMessages([]);
            }
        } catch (error) {
            console.error('Failed to fetch messages.', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className='bg-cyan-700'>
            <Navbar/>
            <h1 className="text-4xl">Messages</h1>
             {/* Button to refresh messages */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchMessages} disabled={loading}>
                 {loading ? 'Loading...' : 'Refresh Messages'}
            </button>

            {/* Display messages in a list */}
            <ul>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        message && (
                        <li key={index} className="border-2 w-1/3 my-4 shadow-md">
                            <p><strong>Name:</strong> {message.name}</p>
                            <p><strong>Email:</strong> {message.email}</p>
                            <p><strong>Message:</strong> {message.message}</p>
                            <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                        </li>
                    )
                ))
            ) : (
                <p>No messages found.</p>
            )}
            </ul>
        </div>
    );
}