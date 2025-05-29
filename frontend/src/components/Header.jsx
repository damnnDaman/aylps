import React, { useState } from 'react';
import TextAnimation from './TextAnimation';
import Services from './Services'; // Import the Services component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


export const Header = ({text}) => {

  return (
    <div className="w-full">
      <header className="">
        <div className="flex flex-col justify-between sm:flex-row items-center p-4 bg-gray-800 text-white">
          {/* Logo */}
          <div className='flex items-center'>
            <TextAnimation text = {text} />
          </div>

          {/* Navigation Links */}
          <nav className="text-md md:text-md sm:text-md flex flex-row sm:flex-row  ">
            <a
              href="/"
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 underline "
            >
              Home
            </a>
            <a
              href="services"
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 p-2 md:p-4 underline "
            >
              Travel Advice
            </a>
            <Link
              to="/Services"
              
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 cursor-pointer underline"
            >
              Services
            </Link>
            <a
              href="login-register"
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 underline"
            >
              Login/Signup
            </a>
          </nav>
        </div>
      </header>

     
    </div>
  );
};

export default Header;