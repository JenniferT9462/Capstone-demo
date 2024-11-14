import React from "react";


export default function FeatureCards(props) {
    return (
        <div className="bg-white text-indigo-500 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4">{props.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{props.title}</h3>
            <p className="text-sm md:text-base">{props.description}</p>
        </div>
    );
}