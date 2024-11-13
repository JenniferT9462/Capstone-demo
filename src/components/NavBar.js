import React from 'react';
import Link from 'next/link';


export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">Email Server</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/contact-me" className="hover:text-gray-300">Contact Me</Link>
          <Link href="/get-messages" className="hover:text-gray-300">Get Message</Link>
          <Link href="/all-messages" className="hover:text-gray-300">All Messages</Link>
        </div>
      </div>
    </nav>
  );
}
