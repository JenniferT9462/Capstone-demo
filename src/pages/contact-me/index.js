import { useState } from 'react';
import Link from "next/link";
import Navbar from '@/components/NavBar';

export default function ContactMePage() {
    //useState hook used to store name, email, message and status
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); //For success/error messaging

    async function handleSubmit(event) {
        //Prevents page from reloading
        event.preventDefault();
        setStatus(''); //Reset status message

        //Call the API w/email, message and name
        try {
            const response = await fetch(`/api/mail?name=${name}&message=${message}&email=${email}`)
                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({ name, email, message }),
            // });
            if (response.ok) {
                setStatus('Message sent successfully!');
                setName(''); //Clear name field on success
                setEmail('') //Clear email field on success
                setMessage(''); //Clear message field on success
            } else {
                // If response fails setStatus w/this error message
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            setStatus('An error occurred. Please try again.')
        }
    };

    return (
        <div className='bg-cyan-700 h-screen'>
            <Navbar/>
            <div>
                <h1 className='text-4xl'>Contact Me!</h1>
                {/* When user submits form execute the handleSubmit function */}
                <form onSubmit={handleSubmit}
                      className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className='mb-10'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name: </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            //Input requires a value prop
                            value={name}
                            // On submit setEmail's value
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            //Input requires a value prop
                            value={email}
                            // On submit setEmail's value
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='my-10'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            //Input requires a value prop
                            value={message}
                            // On submit(event) setMessage's value
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Send Message</button>
                    {status && <p className='text-gray-700'>{status}</p>} {/*Show success/error message in a paragraph to display on the page */}
                </form>
            </div>
        </div>
    );
}