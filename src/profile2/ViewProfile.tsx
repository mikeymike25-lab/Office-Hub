import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const ViewProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // State to hold all that data from your Dashboard form
  const [details, setDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    phone: ""
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        // Grab the info from localStorage (Saved by the Dashboard)
        setDetails({
          username: localStorage.getItem("profile_username") || u.displayName || "N/A",
          email: u.email || "N/A",
          firstName: localStorage.getItem("profile_firstName") || "Not Set",
          lastName: localStorage.getItem("profile_lastName") || "Not Set",
          birthdate: localStorage.getItem("profile_birthdate") || "Not Set",
          phone: localStorage.getItem("profile_phone") || "Not Set",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      {/* Nav */}
      <nav className="bg-[#355872] p-6 shadow-lg flex justify-between items-center">
        <Link to="/dashboard"><img src="/Images/officehublogo.png" className="h-10" alt="logo" /></Link>
        <h2 className="text-white font-black tracking-tighter text-xl">MEMBER PROFILE</h2>
        <button onClick={() => navigate('/dashboard')} className="text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">Back</button>
      </nav>

      <div className="max-w-4xl mx-auto mt-12 p-6">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* LEFT: Identity Section */}
          <div className="bg-[#355872] md:w-1/3 p-10 text-white flex flex-col items-center justify-center text-center">
             <img 
               src={user?.photoURL || "/Images/userprofile.png"} 
               className="w-32 h-32 rounded-full border-4 border-white/30 shadow-xl mb-4 object-cover" 
             />
             <h3 className="text-2xl font-bold">{details.username}</h3>
             <p className="opacity-70 text-sm">{details.email}</p>
             <div classNa   me="mt-8 bg-white/10 p-4 rounded-xl w-full">
                <p className="text-[10px] uppercase tracking-widest opacity-60">Account Type</p>
                <p className="font-bold">Premium Member</p>
             </div>
          </div>

          {/* RIGHT: The "Pop Out" Details Section */}
          <div className="md:w-2/3 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-1">
                <p className="text-xs font-black text-[#355872] uppercase">First Name</p>
                <p className="text-lg text-gray-800 font-semibold border-b pb-1">{details.firstName}</p>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-black text-[#355872] uppercase">Last Name</p>
                <p className="text-lg text-gray-800 font-semibold border-b pb-1">{details.lastName}</p>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-black text-[#355872] uppercase">Phone Number</p>
                <p className="text-lg text-gray-800 font-semibold border-b pb-1">{details.phone}</p>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-black text-[#355872] uppercase">Birthdate</p>
                <p className="text-lg text-gray-800 font-semibold border-b pb-1">{details.birthdate}</p>
             </div>
             
             {/* Full Width Row */}
             <div className="md:col-span-2 space-y-1 pt-4">
                <p className="text-xs font-black text-[#355872] uppercase">Recent Activity</p>
                <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-green-500">
                   <p className="text-sm font-bold">Latest Booking: {localStorage.getItem("selectedRoom") || "No Recent Bookings"}</p>
                   <p className="text-xs text-gray-400">{localStorage.getItem("selectedBookingDate") || "N/A"}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;