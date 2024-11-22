import React from "react";
// import { uid } from 'uid';
import { useState } from "react";
// import { useRouter } from "next/router";


export default function LogInCard() {
    // const router = useRouter();
   //Step 1: create state
    const [email, setEmail] = useState("");
    const [passkey, setPasskey] = useState("");
    //const passkey = uid();

   

    function  handleLogin() {
        const isValid = email && passkey;
        if(isValid) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassKey", passkey);
            // router.push("/dashboard");
        } else {
            alert("Please enter valid credentials.");
          }
        

        // //Send the email and passkey to my backend for verification
        // fetch('/api/storeUser', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email, passkey }),
        // });
        
       
    };

    return (
        <div className="w-1/3 m-auto bg-white text-indigo-500 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <h1 className="text-4xl font-bold mb-6">
                Log In
            </h1>
            <form>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block border-2 border-gray-300 p-2 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Passkey"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="block border-2 my-2 p-2 border-gray-300 rounded"
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