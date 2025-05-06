import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

function FlightSearchForm({ onSearch }) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [dateTime, setDateTime] = useState(new Date());

    const handleSearch = () => {
        // format to ISO or whatever your backend expects:
        const formatted = format(dateTime, "yyyy-MM-dd'T'HH:mm:ss");
        onSearch({ origin, destination, departure: formatted });
    };

    return (
        <form
            onSubmit={e => { e.preventDefault(); handleSearch(); }}
            className="flex md:flex-row flex-col items-center gap-5 shadow-lg "
        >
            <div className="flex-1 p-2">
                <label className="block text-gray-200 mb-1 ">Origin</label>
                <input
                    type="text"
                    placeholder="e.g. JFK"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    className="w-full bg-gray-700 text-gray-100 border-2 border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex-1">
                <label className="block text-gray-200 mb-1">Destination</label>
                <input
                    type="text"
                    placeholder="e.g. LAX"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex-1">
                <label className="block text-gray-200 mb-1">Departure</label>
                <DatePicker
                    selected={dateTime}
                    onChange={date => setDateTime(date)}
                    showTimeSelect
                    timeIntervals={30}
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    calendarClassName="bg-gray-700 text-gray-100 rounded shadow-lg p-2"
                    popperClassName="!z-50"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-6 py-2 transition"
            >
                Search
            </button>
        </form>
    );
}

export default FlightSearchForm;