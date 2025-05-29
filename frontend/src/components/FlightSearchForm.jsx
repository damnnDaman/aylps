import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import {AutoComplete} from 'primereact/autocomplete';
// import 'primereact/resources/themes/saga-blue/theme.css'; // theme
// import 'primereact/resources/primereact.min.css'; // core css
// import 'primeicons/primeicons.css'; // icons
// import 'primeflex/primeflex.css'; // flex utilities

export default function FlightSearchForm({ onSearch }) {
    // --- form state ---
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flightType, setFlightType] = useState('one-way');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returndate, setReturnDate] = useState(new Date()); // Default return date, can be adjusted
    const [travelClass, setTravelClass] = useState('ECONOMY');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    // airport suggestions (stubbed; hook up to your autocomplete API)
    // const [origin, setOrigin] = useState('');
    // const [destination, setDestination] = useState('');
    const [airportOptions, setAirportOptions] = useState([]);
    const [originOptions, setOriginOptions] = useState([]);   
    const [destinationOptions, setDestinationOptions] = useState([]);





    // ---------------- Fetch airport suggestions for origin
    const searchOriginAirports = async (e) => {
        const q = e.query.trim();
        if (!q) {
            setOriginOptions([]);
            return;
        }
        console.log("Origin airports response:", q);
        try {
            const res = await fetch(`/airports/${q}`);
            const data = await res.json();
            console.log("Origin airports data:", data);
            // Map to { label, code } shape for PrimeReact
            setOriginOptions(data.map(a => ({
                code: a.iataCode,
                label: `${a.iataCode} - ${a.name}`
                
            })));
        } catch (err) {
            console.error('Error fetching origin airports', err);
            setOriginOptions([]);
        }
    };



    //----------- Fetch airport suggestions for destination
    const searchDestinationAirports = async (e) => {
        const q = e.query.trim();
        if (!q) {
            setDestinationOptions([]);
            return;
        }
        console.log("Destination airports response:", q);
        try {
            const res = await fetch(`/airports/${q}`);
            const data = await res.json();
            console.log("Destination airports data:", data);
            // Map to { label, code } shape for PrimeReact
            setDestinationOptions(data.map(a => ({
                code: a.iataCode,
                label: `${a.iataCode} - ${a.name}`

            })));
        } catch (err) {
            console.error('Error fetching origin airports', err);
            setDestinationOptions([]);
        }
    };

    

    // ----------- // Handle form submission
    const handleSearch = (e) => {
        e.preventDefault();
        const payload = {
            origin,
            destination,
            departure: format(departureDate, "yyyy-MM-dd"),
            returndate: flightType === 'round-trip'
                ? format(returndate, "yyyy-MM-dd")
                : '', // Default return date if one-way
            travelClass,
            adults,
            children,
            infants,
            flightType,
            max: 5 // Limit results to 5
        };
        console.log("Search payload:", payload);
        onSearch(payload);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="space-y-4 bg-gray-800 text-white p-5 rounded-lg shadow-2xl m-5 mx-auto"
        >
            {/* Locations */}
            <div className="card bg-gray-700 p-4 rounded-lg">
                <h5 className="text-xl font-semibold mb-4">Locations</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="origin" className="block mb-1">Origin</label>
                        <AutoComplete
                            value={origin}
                            suggestions={originOptions}
                            field="label"
                            completeMethod={searchOriginAirports}
                            onChange={e => setOrigin(e.value?.code || '')}  
                            dropdown
                            placeholder="Type airport code or name"
                            className="w-full bg-gray-600 text-white rounded px-3 py-2 "
                            itemTemplate={(item) => (
                                <div  className='bg-gray-500 ' style={{ color: 'white', fontSize: '16px', fontFamily: 'Poppins' , fontWeight: '500', backgroundColor: '' }}>
                                    {item.label}
                                </div>
                            )}
                        />
                           

                      
                    </div>
                    <div>
                        <label htmlFor="destination" className="block mb-1">Destination</label>
                        <AutoComplete
                            value={destination}
                            suggestions={destinationOptions}
                            field="label"
                            completeMethod={searchDestinationAirports}
                            onChange={e => setDestination(e.value?.code || '')}
                            dropdown
                            placeholder="Type airport code or name"
                            className="w-full bg-gray-600 text-white rounded px-3 py-2 "
                            itemTemplate={(item) => (
                                <div className='bg-gray-500 ' style={{ color: 'white', fontSize: '16px', fontFamily: 'Poppins', fontWeight: '500', backgroundColor: '' }}>
                                    {item.label}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Dates & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Dates */}
                <div className="card bg-gray-700 p-4 rounded-lg">
                    <h5 className="text-xl font-semibold mb-4">Dates</h5>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="flight-type" className="block mb-1">Flight</label>
                            <select
                                id="flight-type"
                                value={flightType}
                                onChange={e => setFlightType(e.target.value)}
                                className="bg-gray-600 text-white rounded  py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="one-way">One-way</option>
                                <option value="round-trip">Round-trip</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Departure date</label>
                            <DatePicker
                                selected={departureDate}
                                onChange={date => setDepartureDate(date)}
                                // showTimeSelect
                                // timeIntervals={30}
                                // timeFormat="HH:mm"
                                dateFormat="MMMM d, yyyy"
                                className="w-full bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {flightType === 'round-trip' && (
                            <div>
                                <label className="block mb-1">Return date</label>
                                <DatePicker
                                    selected={returndate}
                                    onChange={date => setReturnDate(date)}
                                
                                    // showTimeSelect
                                    // timeIntervals={30}
                                    // timeFormat="HH:mm"
                                    dateFormat="MMMM d, yyyy "
                                    className="w-full bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="card bg-gray-700 p-4 rounded-lg">
                    <h5 className="text-xl font-semibold mb-4">Details</h5>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="travel-class" className="block mb-1">Travel class</label>
                            <select
                                id="travel-class"
                                value={travelClass}
                                onChange={e => setTravelClass(e.target.value)}
                                className="w-full bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="ECONOMY">Economy</option>
                                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                                <option value="BUSINESS">Business</option>
                                <option value="FIRST">First</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label htmlFor="adults" className="block mb-1">Adults</label>
                                <input
                                    id="adults"
                                    type="number"
                                    min="1"
                                    value={adults}
                                    onChange={e => setAdults(Number(e.target.value))}
                                    className="w-full bg-gray-600 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="children" className="block mb-1">Children</label>
                                <input
                                    id="children"
                                    type="number"
                                    min="0"
                                    value={children}
                                    onChange={e => setChildren(Number(e.target.value))}
                                    className="w-full bg-gray-600 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="infants" className="block mb-1">Infants</label>
                                <input
                                    id="infants"
                                    type="number"
                                    min="0"
                                    value={infants}
                                    onChange={e => setInfants(Number(e.target.value))}
                                    className="w-full bg-gray-600 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-6 py-3 transition"
            >
                Search Flights
            </button>
        </form>
    );
}
