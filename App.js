// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Booking from './Booking'; // Your HomePage component
// Import other components as needed

const App = () => (
  <Routes>
    <Route path="/" element={<Booking />} />
    {/* Define other routes here */}
  </Routes>
);

export default App;
