import { useState } from "react";

export default function Journal() {
    // const itemDate = moment(item.date).fromNow();
    const [journalEntry, setJournalEntry] = useState('');
    const [entryLog, setEntryLog] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setJournalEntry('');
    }

    const handleEntryChange = (event) => {
        setJournalEntry(event.target.value);
        
    }

    console.log(journalEntry);

    const handleEntryLog = (entry) => {
        if(entry) {
            //setMood the '...' is a separator operator to include the old logs as well
            setEntryLog([...entryLog, { date: new Date(), journalEntry }]); //Mood object
            setJournalEntry(''); //Reset the selected mood
        }
    }


    return (
        <div className="bg-white rounded-md w-1/3 text-blue-500 p-4 shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="text-2xl text-center">Journal</h2>
                <p>What do you wish to record?</p>
                <textarea
                    placeholder="Enter your thoughts here..."
                    className="border-2 border-purple-400"
                    value={journalEntry}
                    onChange={handleEntryChange}
                />
                <button type="submit" className="bg-purple-900 rounded-md w-2/3 m-auto mt-4" onClick={handleEntryLog}>Submit Entry</button>
            </form>
            <div>
            <h3 className='text-blue-500'>Entry Logs</h3>
                <ul>
                    {entryLog.map((entry, index) => (
                        <li key={index}>
                            {entry.date.toDateString()}: {entry.journalEntry}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}