import React from "react";

export default function LogInCard() {
    return (
        <div className="bg-white text-indigo-500 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <h1 className="text-4xl font-bold mb-6">
                Log In
            </h1>
            <form>
                <input
                    type="email"
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border border-gray-300 p-2 rounded mb-4"
                />
                <button
                    // onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}