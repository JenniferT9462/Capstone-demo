import React from "react";
import { uid } from 'uid';
import { useState } from "react";


export default function LogInCard() {
   //Step 1: create state
    const [email, setEmail] = useState("");
    const passkey = uid();

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handleLogin() {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassKey", passkey);

        //Send the email and passkey to my backend for verification
        fetch('/api/storeUser', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, passkey }),
        });
       
    };

    return (
        <div className="bg-white text-indigo-500 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <h1 className="text-4xl font-bold mb-6">
                Log In
            </h1>
            <form>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="border border-gray-300 p-2 rounded mb-4"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}