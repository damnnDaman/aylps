import React from 'react';
import Header from './Header';
import FlightSearchForm from './FlightSearchForm';
import { useNavigate } from 'react-router-dom';

const BookFlight = () => {
    const navigate = useNavigate();

    const handleSearch = (searchData) => {
        // You can pass searchData via state or URL params
        console.log("Search Data before sending to the flight page:", searchData);
        console.log("return date in searchData:", searchData.returndate);
        navigate('/flight-page', { state: searchData });
    };

    return (
        <div className="bg-gray-50 ">
            <Header text="Book a Flight" />
            <div className="p-10">
                <h2 className="px-10 text-2xl font-bold">Search Your Flight</h2>
                <FlightSearchForm onSearch={handleSearch} />
            </div>
        </div>
    );
};

export default BookFlight;