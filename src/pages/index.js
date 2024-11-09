import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-4">You are Home</h1>
      <Link href="/contact-me" className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-md">
        Contact Me
      </Link>
  </div>
  );
}
