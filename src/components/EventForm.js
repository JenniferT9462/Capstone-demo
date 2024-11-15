import { AiOutlineClose } from "react-icons/ai";

//This component shows a popup form for entering or editing an event.
export default function EventForm() {
    return (
        <div className="bg-white text-blue-500 shadow-md">
            <h2>Event Form</h2>
            <form>
                <h2>Time</h2>
                <input
                    type="number"
                    name="hours"
                    min={0}
                    max={24}
                    className="hours"
                    // value={eventTime.hours}
                    // onChange={handleTimeChange}
                />
                <input
                    type="number"
                    name="minutes"
                    min={0}
                    max={60}
                    // className="minutes"
                    // value={eventTime.minutes}
                    // onChange={handleTimeChange}
                />
                  <textarea
                    placeholder="Enter Event Text (Maximum 60 Characters)"
                    // value={eventText}
                    // onChange={(e) => {
                    //     if (e.target.value.length <= 60) {
                    //         setEventText(e.target.value);
                    //     }
                    // }}
                  ></textarea>
                   <button>
                    Add Event 
                  </button>
                  <button
                    // className="close-event-popup"
                    // onClick={() => setShowEventPopup(false)}
                    >
                  <AiOutlineClose size={18} />
                 </button>
                
            </form>
            
           
        </div>
    );
}