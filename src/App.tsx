import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Firebase auth
import { auth } from './firebase'; 

// Import all of your page components
import Landing from './LandingPage/LandingPage';
import Login from './Login/Login';
import UserDashboard from './Dashboard/UserDashboard'; 
// ADDED: Import your new SignUp component
// Make sure this path matches where you saved the SignUp.tsx file!
import SignUp from './SignUp/SignUp'; 

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
        {/* The "/" path sets the Landing page as the default start screen */}
        <Route path="/" element={<Landing />} />
        
        {/* LOGIN ROUTE: 
          If there is NO user (!user), show the Login page. 
          If they ARE logged in, kick them straight to the dashboard.
        */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />} 
        />

        {/* SIGN UP ROUTES: 
          Added routes for both /register and /signin to map to the SignUp component
        */}
        <Route 
          path="/register" 
          element={!user ? <SignUp /> : <Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/signin" 
          element={!user ? <SignUp /> : <Navigate to="/dashboard" replace />} 
        />

        {/* DASHBOARD ROUTE (PROTECTED): 
          If there IS a user, show the Dashboard. 
          If they are NOT logged in, kick them back to the login screen.
        */}
        <Route 
          path="/dashboard" 
          element={user ? <UserDashboard /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;