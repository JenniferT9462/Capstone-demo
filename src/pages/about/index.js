import { useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Main/NavBar";
import LinkedinLogo from "@/components/Main/linkedin";
import GitHubLogo from "@/components/Main/github";

export default function ContactMePage() {
  //useState hook used to store name, email, message and status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); //For success/error messaging

  async function handleSubmit(event) {
    //Prevents page from reloading
    event.preventDefault();
    setStatus(""); //Reset status message

    //Call the API w/email, message and name
    try {
      const response = await fetch(
        `/api/mail?name=${name}&message=${message}&email=${email}`
      );
      // method: 'POST',
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({ name, email, message }),
      // });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setName(""); //Clear name field on success
        setEmail(""); //Clear email field on success
        setMessage(""); //Clear message field on success
      } else {
        // If response fails setStatus w/this error message
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("An error occurred. Please try again.");
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Navbar />
      <div>
        <div className="p-4 w-2/3">
          <h1 className="text-4xl">About | ZenFlow</h1>
          <p>
            ZenFlow is your all-in-one planner designed to help you stay
            organized, track progress, and nurture your well-being. With
            features like event scheduling, to-do lists, habit tracking,
            journaling, and a mood calendar, ZenFlow gives you a holistic view
            of your daily life and long-term goals. Whether you are managing a
            busy schedule, building healthier habits, or reflecting on your
            emotional journey, ZenFlow is your companion for creating a
            balanced, fulfilling lifestyle. Stay motivated with insightful
            progress tracking and personalized reminders that keep you on track.
            Simplify your planning, celebrate your achievements, and make every
            day count with ZenFlow.
          </p>
        </div>
        <div className="p-4 w-2/3">
          <h1 className="text-4xl">About | The Creator</h1>
          <div className="flex space-x-4 items-center text-xl font-semibold">
            <span>Follow me! |</span> 
            <Link href="https://www.linkedin.com/in/jennifer-tarleton-11290350/" target="_blank">
              <LinkedinLogo/>
            </Link> 
            <Link href="https://github.com/JenniferT9462" target="_blank">
              <GitHubLogo/>
            </Link>
          </div>
          <p>
            I am a full-stack development student with a background in graphic
            design. My creativity and attention to detail from design have
            seamlessly transitioned into coding, where I enjoy solving complex
            problems and building intuitive user experiences. I have a strong
            interest in data analytics and aspire to become a software engineer,
            combining technical skills with analytical thinking to create
            impactful solutions. I am passionate about learning and constantly
            seek opportunities to grow my knowledge, whether it is exploring new
            technologies, refining my skills, or taking on challenging projects.
            For me, every step forward is a chance to improve and get closer to
            my career goals.
          </p>
        </div>

        {/* When user submits form execute the handleSubmit function */}
        <form
          onSubmit={handleSubmit}
          className="w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mx-12"
        >
          <h1 className="text-4xl text-blue-500">Contact Me!</h1>
          <div className="mb-10">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:{" "}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              //Input requires a value prop
              value={name}
              // On submit setEmail's value
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              //Input requires a value prop
              value={email}
              // On submit setEmail's value
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="my-10">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //Input requires a value prop
              value={message}
              // On submit(event) setMessage's value
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Send Message
          </button>
          {status && <p className="text-gray-700">{status}</p>}{" "}
          {/*Show success/error message in a paragraph to display on the page */}
        </form>
      </div>
    </div>
  );
}
