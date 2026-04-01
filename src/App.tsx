import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all of your page components
import Landing from './LandingPage/LandingPage';
import Login from './Login/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* The "/" path sets the Landing page as the default start screen */}
        <Route path="/" element={<Landing />} />
        
        {/* These routes connect to your authentication pages */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;