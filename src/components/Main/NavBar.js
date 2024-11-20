import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';

export default function Navbar() {
  return (
    
      
    <nav className="bg-blue-600 px-4 py-2 flex items-center justify-between shadow-lg">
    <div className='flex items-center space-x-2'>
        <div className='text-white'>
          {/* Logo */}
          <Logo/>
        </div>
        <h1 className="text-xl text-white font-bold">
          Planner App
        </h1>
      </div>
      {/* Nav links */}
      <div className="flex space-x-4 md:space-x-2">
          <Link href="/" className="text-white text-xl md:text-sm hover:text-blue-300">
            Home
          </Link>
          <Link href="/Calendar" className="text-white text-xl md:text-sm hover:text-blue-300">
            Calendar
          </Link>
          <Link href="/Habits" className="text-white text-xl md:text-sm hover:text-blue-300">
            Habits
          </Link>
          <Link href="/journal" className="text-white text-xl md:text-sm hover:text-blue-300">
            Journal
          </Link>
      </div>
    </nav>
    
  );
}
