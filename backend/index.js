import express from 'express';
// import { MongoClient, ObjectId } from 'mongodb';

import Amadeus from 'amadeus';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Express app


const app = express();

// 
// const {dbconnection} = require('./mongodb')
// // import  dbconnection  from './mongodb.js';

// // Middleware to parse JSON request bodies
app.use(express.json());




const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_KEY,
    clientSecret: process.env.AMADEUS_SECRET
})

console.log("Amadeus client initialized");
// console.log("Amadeus key:", process.env.AMADEUS_KEY);
// console.log("Amadeus secret:", process.env.AMADEUS_SECRET);


app.use(express.static("../public"));

// search for airports

app.get('/airports/:origin', async (req, res) => {

  const keyword = req.params.origin;
  console.log("Requested airport name:", keyword);
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      
      subType: 'AIRPORT',
      
    });

    // res.json(response.data[0].iataCode);
    const airportCode = response.data[0].iataCode;
    // console.log("Airport code:", airportCode);
    const airportName = response.data[0].name;
    // console.log("Airport name:", airportName);

    // res.json(airportCode + " ," + airportName);
    res.json( response.data);
    
    console.log("Response from Amadeus:", response.data);
  } catch (error) {
    console.error('Error searching for airports:', error);
    res.status(500).json({ error: 'Failed to search for airports' });
  }
}
  );

  app.post('/auth/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log("Received signup request:", req.body, password);
    if (!name || (!email && !phone))
      return res.status(400).json({ error: 'Name and email or phone required' });
    const users = db.collection('users');
    const existing = await users.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(409).json({ error: 'User already exists' });
  
    const result = await users.insertOne({ name, email, phone, verified: false });
    const otp = generateOTP();
  //   await saveOTP(result.insertedId, otp);
  
    // send OTP
  //   if (email) {
  //     await transporter.sendMail({
  //       from: 'no-reply@asyouliketours.com',
  //       to: email,
  //       subject: 'Your OTP Code',
  //       text: `Your OTP is ${otp}`
  //     });
  //   }
  //   if (phone) {
  //     await twilioClient.messages.create({
  //       to: phone,
  //       from: process.env.TWILIO_PHONE,
  //       body: `Your OTP is ${otp}`
  //     });
  //   }
  
    res.status(201).json({ message: 'OTP sent' });
  });


// search for flights
app.get('/api/flights', async (req, res) => {
  const {
    origin,
    destination,
    departure, // now matches the URL
    returndate,         // now matches the URL
    travelClass,
    adults,
    children,
    infants,
    max
  } = req.query;

  console.log("Flight search parameters:", {
    origin,
    destination,
    departure,
    returndate,
    travelClass,
    adults,
    children,
    infants,
    max
  });
  // validate required fields
  if (!origin || !destination || !departure) {
    return res.status(400).json({
      error: 'origin, destination and departure are required'
    });
  }

  // build Amadeus params
  const params = {
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: departure,
    // ticketingDate: departure, // or new Date().toISOString().slice(0,10)
    adults: Number(adults) || 1,
    // max:    Number(max)    
    currencyCode: 'USD', // default currency
  };
  if (returndate) params.returnDate = returndate ; // default to a future date if not provided
  if (travelClass) params.travelClass = travelClass;
  if (children)    params.children    = Number(children);
  if (infants)     params.infants     = Number(infants);

  console.log("Amadeus search parameters:", params);
  try {
    console.log("Calling Amadeus API with params:", params);
    const response = await amadeus.shopping.flightOffersSearch.get(params);
    console.log("Amadeus response:", response);
    return res.json(response.data);
  } catch (err) {
    console.error('Amadeus error:', err);
    return res.status(500).json({
      error: err.message || 'Internal Server Error'
    });
  }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);