import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// const mockData= {
//     '2024-11-14': '😊',
//     '2024-11-15': '😔',
//     '2024-11-16': '😡',
// }

export default function MoodCalendar() {
  const [moodData, setMoodData] = useState({
    "2024-11-14": "😊",
    "2024-11-15": "😔",
    "2024-11-16": "😡",
  });

  const getMoodForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return moodData[formattedDate] || "";
  };

  const onDayClick = (value) => {
    const formattedDate = value.toISOString().split("T")[0];
    const newMood = prompt(
      `Enter a mood for ${formattedDate} (e.g., 😊, 😔, 😡, 😨, 😴, 🧐):`
    );
    if (newMood) {
      const updatedMoodData = {
        ...moodData,
        [formattedDate]: newMood,
      };
      setMoodData(updatedMoodData);

      // Save to local storage
      localStorage.setItem("moodData", JSON.stringify(updatedMoodData));

      // setMoodData((prevData) => ({
      //   ...prevData,
      //   [formattedDate]: newMood,
      // }));
    }
  };
  // Load data from local storage on component mount
  React.useEffect(() => {
    const storedMoodData = localStorage.getItem("moodData");
    if (storedMoodData) {
      setMoodData(JSON.parse(storedMoodData));
    }
  }, []);

  return (
    <div className="mood-calendar">
      <h1 className="text-2xl text-white">Calendar</h1>
      <Calendar
        onClickDay={onDayClick}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const mood = getMoodForDate(date);
            return <span className="mood-icon">{mood}</span>;
          }
        }}
      />
    </div>
  );
}
