import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Home */}
        <Route path="/" element={<Home />} />
        {/* Route for Services */}
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;