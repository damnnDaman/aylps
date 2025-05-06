import React from 'react';
import Header from './Header';
// import BookFlightForm from './BookFlightForm';
import FlightSearchForm from './FlightSearchForm';

import { useState } from 'react';
// import axios from 'axios'; // Uncomment if you need to make API calls
// import { useEffect } from 'react'; // Uncomment if you need to use useEffect


const BookFlight = () => {
    const searchFlights = ({ origin, destination, departure }) => {
        // call your API or navigate with query params...
        console.log({ origin, destination, departure });
    };
   
    return (
        <div className="bg-gray-50 ">
            <Header text="Book a Flight" />
            <div className="p-10  ">
                <h2 className="text-2xl font-bold">Search Your Flight</h2>
                
                <FlightSearchForm
                    onSearch={searchFlights}
                           />

                {/* {flights.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold mb-4">Available Flights</h3>
                        <ul>
                            {flights.map((flight, index) => (
                                <li key={index} className="border-b py-2">
                                    {flight.details}
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>
        </div>
    );
}
export default BookFlight;