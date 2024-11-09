import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/NavBar";

export default function MessagePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
         //Prevents page from reloading
         event.preventDefault();

         const response = await fetch(`api/messages?name=${name}`);
         const data = await response.json();
         const message = data.message;
         const email = data.email;
         setEmail(email);
         setMessage(message);
    }

    return (
        <div className='bg-cyan-700 h-screen'>
            <Navbar/>
            <h1 className='text-4xl'>Messages</h1>
            
            <form onSubmit={handleSubmit}
                   className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Enter you name:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Get Message</button>
                {/* <Link href="contact-me" className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-3 px-2 rounded">Contact Me</Link> */}
            </form>
            <div className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl text-gray-700">Saved Message</h2>
                <p className="text-gray-700">Name: {name}</p>
                <p className="text-gray-700">Email: {email}</p>
                <p className="text-gray-700">Message: {message}</p>
            </div>
        </div>
    );
    
}