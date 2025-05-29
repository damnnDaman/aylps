// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link
} from 'react-router-dom';

import Home  from './components/Home';
import Services    from './components/Services';
import BookFlight  from './components/BookFlight';
import BookHotel   from './components/BookHotel';
import Consultation from './components/Consultation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FlightPage from './components/FlightPage';

function App() {
  return (
    <Router>
      {/* If you want your header on every page, put it here */}
      {/* <Header text="As You Like Tour and Travels" /> */}

      <Routes>
        {/* exact “/” home */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* /services */}
        <Route path="/services" element={<Services />} />

        {/* /book-flight */}
        <Route path="/book-flight" element={<BookFlight />} />
        {/* /book-hotel */}
        <Route path="/book-hotel" element={<BookHotel />} />

        {/* /consultation */}
        <Route path="/consultation" element={<Consultation />} />
        {/* /login-register */}
        <Route path="/login-register" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* /flight-page */}
        <Route path="/flight-page" element={<FlightPage />} />

        {/* If you want to add more routes, do so here */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}

        {/* /services */}

        {/* catch-all; redirect to home if no route matches */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
