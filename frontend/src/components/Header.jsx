import React, { useState } from 'react';
import TextAnimation from './TextAnimation';
import Services from './Services'; // Import the Services component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


export const Header = ({text}) => {

  return (
    <div className="bg- [#010a25] w-full">
      <header className="">
        <div className="container flex md:flex-row  justify-around lg:gap-100">
          {/* Logo */}
          <div className='flex items-center  md:flex-wrap w-full/2'>
            <TextAnimation text = {text} />
          </div>

          {/* Navigation Links */}
          <nav className="text-md border-b-2">
            <a
              href="/"
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 md:text-xl sm:text-xl "
            >
              Home
            </a>
            <a
              href="services"
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 md:text-xl sm:text-md "
            >
              Travel Advice
            </a>
            <Link
              to="/Services"
              
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 cursor-pointer md:text-xl sm:text-xl "
            >
              Services
            </Link>
            <a
              href="#contact"
              className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-120 md:p-4 p-2 md:text-xl sm:text-xl "
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>

     
    </div>
  );
};

export default Header;