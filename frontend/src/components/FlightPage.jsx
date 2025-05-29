import React from 'react'
import Header from './Header'
// import FlightSearchForm from './FlightSearchForm'
import { useLocation } from 'react-router-dom'
import BookFlight from './BookFlight'
import { useState } from 'react';
import { useEffect } from 'react';

import { format } from 'date-fns'
import { number } from 'framer-motion';
// You can put this at the top of your component file:
const getAirlineLogo = (code) => `https://images.kiwi.com/airlines/64/${code}.png`


// handle flight booking
const handleFlightBooking = (flightId) => {
    // This function can be used to handle flight booking logic
    console.log(`Flight ${flightId} booked!`);
    // You can implement your booking logic here, e.g., redirecting to a payment page
    // or showing a confirmation message
    alert(`Flight ${flightId} booked!`);
    // Redirect to a payment page or show a confirmation message
    // window.location.href = `/payment/${flightId}`;
    // or you can use a state management solution to handle the booking
    // e.g., Redux, Context API, etc.
    // For now, we will just log the flightId to the console
    console.log(`Flight ${flightId} booked!`);

}

// helper to format ISO 8601 durations like "PT2H30M"
const formatDuration = (iso) => {
    // match hours & minutes (ignore seconds)
    const [, hours, minutes] = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/) || []
    const parts = []
    if (hours) parts.push(`${parseInt(hours, 10)}h`)
    if (minutes) parts.push(`${parseInt(minutes, 10)}m`)
    return parts.join(' ') || '—'
  }

// helper to format a full date+time
const formatDateTime = isoString =>
    format(new Date(isoString), 'EEEE, MMMM do, yyyy h:mm a')
// e.g. "Wednesday, May 28th, 2025 3:30 PM"



const FlightPage = () => {
    const location = useLocation();
    const searchData = location.state || {};
    const [flightResults, setFlightResults] = useState([]);
    const { origin, destination, departure, returndate, travelClass, adults, children, infants } = searchData;
    console.log("searchData at frontend of flight page: ", searchData);
    console.log("return date " + searchData['returndate']);

    useEffect(() => {
        const fetchFlights = async () => {
            console.log("searchData in useEffect: ", searchData.returndate);
            // searchData['destination'] = 'DEL';
            // only include returndate if it’s a real string
            const params = { origin, destination, departure };
            if (returndate) params.returndate = returndate;
            Object.assign(params, { travelClass, adults, children, infants, max: 5 });

            const qs = new URLSearchParams(params).toString();
            // const res = await fetch(`/api/flights?${qs}`);
            try {
                const res = await fetch(`/api/flights?${qs}`);
                // if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                if (!data || !Array.isArray(data)) {
                    throw new Error("Invalid flight data received");
                    // return;
                }
                if (data.length === 0) {
                    console.warn("No flight offers found for the given search criteria.");
                }
                console.log("Flight data fetched:", data);

                // --- transform each offer into a flatter object ---
                const formatted = data.map(offer => {
                    const {
                        id,
                        price: { total, currency, grandTotal },
                        numberOfBookableSeats: seats,
                        lastTicketingDate
                    } = offer
                    // collect all carrier codes, dedupe them
                    const airlineCodes = Array.from(new Set(
                        offer.itineraries
                            .flatMap(itin => itin.segments.map(seg => seg.carrierCode))
                    ));


                    return {
                        id,
                        price: grandTotal ?? total,
                        currency,
                        seats,
                        lastTicketingDate,
                        airlineCodes,
                        itineraries: offer.itineraries.map(itin => ({
                            duration: itin.duration,
                            segments: itin.segments.map(seg => ({
                                carrierCode: seg.carrierCode,
                                flightNumber: seg.number,
                                aircraft: seg.aircraft.code,
                                departure: {
                                    iataCode: seg.departure.iataCode,
                                    at: seg.departure.at,
                                    terminal: seg.departure.terminal || 'N/A' // handle missing terminal
                                },
                                arrival: {
                                    iataCode: seg.arrival.iataCode,
                                    at: seg.arrival.at,
                                    terminal: seg.arrival.terminal || 'N/A' // handle missing terminal
                                },
                                duration: seg.duration,
                                numberOfStops: seg.numberOfStops
                            }))
                        }))
                    }
                })

                setFlightResults(formatted)
            } catch (err) {
                console.error('Error fetching flights', err);
            }
        };
        fetchFlights();
    }, [searchData]);



  return (
      <div className=''>
          <Header text="Select your Flight" />
          {/* <div> */}
            {flightResults.map(f => (
                <div key={f.id} className="mb-6 p-4 border hover:border rounded bg-white shadow-md m-4 hover:shadow-lg hover:bg-grey-800 hover:transition-shadow ">
                    <h2 className="font-bold mb-2">Offer #{f.id}</h2>
                    {/* show all airline logos */}
                    <div className="flex items-center space-x-2 mb-2">
                        {f.airlineCodes.map(code => (
                            <span><img
                                key={code}
                                src={getAirlineLogo(code)}
                                alt={code + ' logo'}
                                className="w-10 h-10 object-contain"
                                onError={e => { e.currentTarget.style.visibility = 'hidden' }}
                            /></span>
                        ))}
                    </div>
                    <p><span className='font-bold'>Price: </span>{f.price} {f.currency} <span className='font-bold'> Seats Available: </span> {f.seats}</p>
                    <p>Last ticketing date: {f.lastTicketingDate}</p>

                    {f.itineraries.map((itin, i) => (
                        <div key={i} className="mt-2">
                            <h3 className="font-bold text-lg">Itinerary {i + 1} ( {formatDuration(itin.duration)} )</h3>
                            {itin.segments.map((seg, j) => (
                                <div
                                    key={j}
                                    className="grid grid-cols-4 items-center gap-6 py-2 border-b"
                                >
                                    {/* 1. Flight number */}
                                    <div className="font-semibold text-gray-800">
                                        Flight {seg.carrierCode}{seg.flightNumber} with {seg.numberOfStops} stops
                                    </div>

                                    {/* 2. Departure: IATA + time */}
                                    <div>
                                        <div className="text-sm font-bold">{seg.departure.iataCode}  (Terminal {seg.departure.terminal})</div>
                                        <div className="text-xs text-gray-500">
                                            {formatDateTime(seg.departure.at)}
                                        </div>
                                    </div>

                                    {/* 3. Arrival: IATA + time */}
                                    <div>
                                        <div className="text-sm font-bold">{seg.arrival.iataCode} (Terminal { seg.arrival.terminal})</div>
                                        <div className="text-xs text-gray-500">
                                            {formatDateTime(seg.arrival.at)}
                                        </div>
                                    </div>

                                    {/* 4. Duration */}
                                    <div className="text-sm font-medium text-center text-gray-700">
                                        {formatDuration(seg.duration)}
                                    </div>
                             </div>
                            ))}
                        </div>
                    ))}
                    {<div className="flex justify-center mt-6 hover:scale-105 transition-transform">
                        <button
                            onClick={() => handleFlightBooking(f.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition-colors">
                            Buy Flight
                        </button>
                    </div>}
                </div>
            ))}
          
          {/* // add a button to buy the flight */}
          

          {/* </div> */}
      </div>
    )
}

export default FlightPage