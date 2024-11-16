import { AiOutlineClose } from "react-icons/ai";

//This component shows a popup form for entering or editing an event.
export default function EventForm({ 
    eventTime, 
    setEventTime, 
    eventText, 
    setEventText, 
    onClose, 
    onSubmit, 
    editingEvent  }) {
    
 
    return (
        <div className="bg-white text-blue-500 shadow-md hover:shadow-lg rounded-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
                {editingEvent ? "Edit Event" : "Add Event"}
            </h2>
            <form 
                className="space-y-4"
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent page reload
                    onSubmit(); // Call the submit handler
                  }}
            >
                <button
                    type="button"
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                    onClick={onClose}
                >
                    <AiOutlineClose size={18} />
                    
                </button>
                {/* Time Inputs */}
                <div>
                
                    <label htmlFor="hours" className="block text-sm font-medium mb-1">Time</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="hours"
                            min={0}
                            max={23}
                            placeholder="Hours"
                            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={eventTime.hours}
                            onChange={(e) =>
                                setEventTime((prev) => ({
                                  ...prev,
                                  hours: e.target.value,
                                }))
                              }
                      
                           
                        />
                        <input
                            type="number"
                            name="minutes"
                            min={0}
                            max={59}
                            placeholder="Minutes"
                            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={eventTime.minutes}
                            onChange={(e) =>
                                setEventTime((prev) => ({
                                  ...prev,
                                  minutes: e.target.value,
                                }))
                              }
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
                        value={eventText}
  	                    onChange={(e) => setEventText(e.target.value)}
                    ></textarea>
                </div>
                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={onSubmit}
                    >
                    {editingEvent ? "Update Event" : "Add Event"}
                    Add Event
                    </button>
                    
                </div>
            </form>
        </div>
    );
}