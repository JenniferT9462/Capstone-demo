import { AiOutlineClose } from "react-icons/ai";

//This component shows a popup form for entering or editing an event.
export default function EventForm() {
    return (
        <div className="bg-white text-blue-500 shadow-md hover:shadow-lg rounded-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">Event Form</h2>
            <form className="space-y-4">
                {/* Time Inputs */}
                <div>
                    <label htmlFor="hours" className="block text-sm font-medium mb-1">Time</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="hours"
                            min={0}
                            max={24}
                            placeholder="Hours"
                            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            // value={eventTime.hours}
                            // onChange={handleTimeChange}
                        />
                        <input
                            type="number"
                            name="minutes"
                            min={0}
                            max={60}
                            placeholder="Minutes"
                            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            // value={eventTime.minutes}
                            // onChange={handleTimeChange}
                        />
                    </div>
                </div>
                {/* Event Text */}
                <div>
                    <label 
                        htmlFor="event-text" 
                        className="block text-sm font-medium mb-1">
                            Event Description
                    </label>
                    <textarea
                        placeholder="Enter Event Text (Maximum 60 Characters)"
                        maxLength={60}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                        // value={eventText}
                        // onChange={(e) => {
                        //     if (e.target.value.length <= 60) {
                        //         setEventText(e.target.value);
                        //     }
                        // }}
                    ></textarea>
                </div>
                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Add Event
                    </button>
                    <button
                        type="button"
                        className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                    <AiOutlineClose size={18} />
                    {/* onClick={() => setShowEventPopup(false)} */}
                    </button>
                </div>
            </form>
        </div>
    );
}