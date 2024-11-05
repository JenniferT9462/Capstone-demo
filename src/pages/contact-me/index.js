import { useState, useEffect } from 'react';

export default function ContactMePage() {
    //useState hook used to store email, message and status
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); //For success/error messaging

    async function handleSubmit(event) {
        //Prevents page from reloading
        event.preventDefault();
        setStatus(''); //Reset status message

        //Call the API w/email and message
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });
            if (response.ok) {
                setStatus('Message sent successfully!');
                setEmail('') //Clear form fields on success
                setMessage('');
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            setStatus('An error occurred. Please try again.')
        }
    };

    return (
        <div className='bg-cyan-700 h-screen'>
            <div>
                <h1 className='text-4xl '>Contact Me!</h1>
                {/* Add form and contact information here */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            className='text-gray-800'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-10'>
                        <label>Message:</label>
                        <textarea
                            className='text-gray-800'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button className='border-4 rounded-md' type="submit">Send Message</button>
                    {status && <p>{status}</p>} {/*Show success/error message */}
                </form>

            </div>
        </div>
    );
}