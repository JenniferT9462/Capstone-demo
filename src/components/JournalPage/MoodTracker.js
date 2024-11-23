import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown, faMeh } from '@fortawesome/free-solid-svg-icons';
import MoodIcon from './MoodIcon';

import { useState } from 'react';

export default function MoodTracker() {
    //Moods selection TODO: add 2 more
    const moods = ['happy', 'sad', 'neutral', 'excited', 'angry', 'sleepy'];
    const [mood, setMood] = useState(null);
    const [moodLogs, setMoodLogs] = useState([]);

    //Function for mood select
    const handleMoodSelect = (selectedMood) => {
        setMood(selectedMood)
    }
    //Function to log mood
    const handleMoodLogs = () => {
        if(mood) {
            //setMood the '...' is a separator operator to include the old logs as well
            setMoodLogs([...moodLogs, { date: new Date(), mood }]); //Mood object
            setMood(null); //Reset the selected mood
        }
        
    };

    //Transform moodLogs for chart
    const moodCounts = moods.map((moodName) => ({
        name: moodName, //label
        count: moodLogs.filter((log) => log.mood === moodName).length, //value
    }))
    console.log(moodLogs);
    console.log(moodCounts)
    return (
        <div className='w-1/3 rounded-md shadow-md bg-white'>
            <h2 className="text-blue-500">Moods</h2>
            <h2>How are you feeling today?</h2>
            <div>
                <div className="grid grid-cols-3 gap-4">
                    <button onClick={() => handleMoodSelect('Happy')} className="p-4 rounded-md shadow-md hover:bg-gray-100">
                        <MoodIcon mood={'happy'} />
                    </button>
                    <button onClick={() => handleMoodSelect('Sad')} className="p-4 rounded-md shadow-md hover:bg-gray-100">
                        <MoodIcon mood={'sad'} />
                    </button>
                    <button onClick={() => handleMoodSelect('Neutral')} className="p-4 rounded-md shadow-md hover:bg-gray-100">
                        <MoodIcon mood={'neutral'} />
                    </button>
                    <button onClick={() => handleMoodSelect('Excited')} className="p-4 rounded-md shadow-md hover:bg-gray-100">
                        <MoodIcon mood={'excited'} />
                    </button>
                    <button onClick={() => handleMoodSelect('Angry')} className="p-4 rounded-md shadow-md hover:bg-gray-100">
                        <MoodIcon mood={'angry'} />
                    </button>
                    <button onClick={() => handleMoodSelect('Sleepy')} className="p-4 rounded-md shadow-md hover:bg-gray-100">
                        <MoodIcon mood={'sleepy'} />
                    </button>
                </div>
            </div>
            <button className="bg-blue-500 text-white rounded-lg p-1 mt-4" onClick={handleMoodLogs}>Log Mood</button>
            <div>
                {/* Will display history in a calendar */}
                <h3 className='text-blue-500'>Mood History</h3>
                <ul>
                    {moodLogs.map((log, index) => (
                        <li key={index} className='text-blue-400'>
                            {log.date.toDateString()}: {log.mood}
                        </li>
                    ))}
                </ul>
                <h3 className="text-blue-500 mt-4">Mood Chart</h3>
  
            </div>
        </div>
    );
}