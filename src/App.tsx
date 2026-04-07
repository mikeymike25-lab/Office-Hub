import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Firebase auth
import { auth } from './firebase'; 

// Import all of your page components
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import UserDashboard from './Dashboard/UserDashboard'; 
import Calendar from './Calendar/Calendar';
import Payment from './Payment/Payment';
import ServiceDetails from './ServiceDetails/ServiceDetails'; 
import ServiceSelect from './ServiceSelect/ServiceSelect';

const App: React.FC = () => {
  // State to track if the user is logged in
  const [user, setUser] = useState<any>(null);
  // State to stop the app from flashing the login screen while Firebase checks the user's status
  const [loading, setLoading] = useState(true);

  // Listen for Firebase Auth changes when the app loads
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Finished checking
    });
    
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Show a simple loading screen while Firebase figures out if the user is logged in
  if (loading) {
    return (
      <div className="min-h-screen bg-[#355872] flex items-center justify-center text-white font-bold text-xl">
        Loading Office Hub...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        {/* The "/" path sets the Landing page as the default start screen */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        
        {/* LOGIN & SIGN UP ROUTES: 
          If they ARE logged in, kick them straight to the Services page now.
        */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/services" replace />} 
        />
        <Route 
          path="/register" 
          element={!user ? <SignUp /> : <Navigate to="/services" replace />} 
        />
        <Route 
          path="/signin" 
          element={!user ? <SignUp /> : <Navigate to="/services" replace />} 
        />

        {/* --- PROTECTED ROUTES --- */}
        {/* If there IS a user, show the page. If not, kick back to login. */}
        
        <Route 
          path="/dashboard" 
          element={user ? <UserDashboard /> : <Navigate to="/login" replace />} 
        />

        <Route 
          path="/services" 
          element={user ? <ServiceSelect/> : <Navigate to="/login" replace />} 
        />

        <Route 
          path="/calendar" 
          element={user ? <Calendar /> : <Navigate to="/login" replace />} 
        />

        <Route 
          path="/payment" 
          element={user ? <Payment /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/service-details" 
          element={user ? <ServiceDetails /> : <Navigate to="/login" replace />} 
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;