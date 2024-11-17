import { object } from "prop-types";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

 const mockData= {
         '2024-11-14': '😊',
         '2024-11-15': '😔',
        '2024-11-16': '😡',
     }


export default function MoodChart({ moodLogs }){
    //Process moodLogs to create chart data
    const moodCount = moodLogs.reduce((acc, log) => {
        const date = log.date.toISOString().split("T")[0]; //Extract data string
        acc[date] = acc[date] || { Happy: 0, Sad: 0, Neutral: 0 }
        acc[date][log.mood] += 1; //Increment mood count for the date
        return acc;
    }, {});

    //Prepare data for chart.js
    const labels = Object.keys(moodCount); //Dates
    const data = {
        labels,
        datasets: [
            {
                label: "Happy",
                data: labels.map(date => moodCount[date]?.Happy || 0),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "Sad",
                data: labels.map(date => moodCount[date]?.Sad || 0),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
            {
                label: "Neutral",
                data: labels.map(date => moodCount[date]?.Neutral || 0),
                backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
        ],
    };
    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };
    return <Bar data={data} options={options} />;

}