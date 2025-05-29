

import React from 'react';
import { Link } from 'react-router-dom';     // ← import Link
import Header from './Header';
import { Testimonials } from './Testimonials';



const services = [
  {
    title: 'Book a Hotel Room',
    icon: '🏨',
    description:
      'Find and book accommodations tailored to your preferences, from budget stays to luxury resorts.',
    image: '/hotel.jpg',
    link: '/book-hotel',
  },
  {
    title: 'Book a Flight',
    icon: '✈️',
    description:
      'Search and book flights to your desired destinations with competitive prices and flexible options.',
    image: '/flight.webp',
    link: '/book-flight',
  },
  {
    title: 'Travel Consultant Appointment',
    icon: '🗺️',
    description:
      'Schedule a one-on-one consultation with our expert travel advisors for personalized trip planning.',
    image: '/AYLT.jpg',
    link: '/consultation',
  },
];

export default function Services() {
  const text1 = 'Our Services';

  return (
    <div className="bg-white-100">
      <Header text={text1} />

      <section
        id="services"
        className="flex flex-col items-center justify-center p-15 bg-gray-50"
      >
        <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, icon, description, image, link }) => (
            <Link
              key={title + icon}
              to={link}                                   // ← Link to the correct route
              className="block bg-white rounded-lg overflow-hidden shadow-2xl 
                         transform transition-all duration-200 ease-in-out 
                         hover:scale-105 hover:bg-blue-50 hover:shadow-4xl 
                         hover:ring-4 hover:ring-blue-100 cursor-pointer"
            >
              <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-Sans-Serif">
                  {title} {icon}
                </h3>
                <p className="text-lg text-gray-600 flex-grow font-Poppins">
                  {description}
                </p>
                <span className="mt-6 inline-block font-semibold bg-blue-600 
                                  text-white px-5 py-2 rounded hover:bg-blue-700 
                                  transition-colors duration-200 text-center">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />
    </div>
  );
}

