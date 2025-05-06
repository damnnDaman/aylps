// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Home  from './components/Home';
import Services    from './components/Services';
import BookFlight  from './components/BookFlight';
import BookHotel   from './components/BookHotel';
import Consultation from './components/Consultation';

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

        {/* catch-all; redirect to home if no route matches */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
