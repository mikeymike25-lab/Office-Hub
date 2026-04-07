import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Dashboard2: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>(
    localStorage.getItem("user_profile_pfp") || "Images/userprofile.png"
  );

  // Inside Dashboard2 component:
const [bookings, setBookings] = useState<any[]>([]);

  // 2. SORTING LOGIC: Keep the closest date at the top
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

useEffect(() => {
  // Pull the ARCHIVE
  const savedBookings = JSON.parse(localStorage.getItem("all_user_bookings") || "[]");
  setBookings(savedBookings);

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      const savedPhoto = localStorage.getItem("user_profile_pfp");
      if (savedPhoto) setProfileImage(savedPhoto);
    } else {
      navigate('/login');
    }
  });
  return () => unsubscribe();
}, [navigate]);

  // 3. CANCELLATION LOGIC
  const handleCancel = (id: number, dateString: string) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    
    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    const diffInTime = bookingDate.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (window.confirm("Are you sure you want to cancel?")) {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    // Update the ARCHIVE so it stays deleted after a refresh
    localStorage.setItem("all_user_bookings", JSON.stringify(updated));
    alert("✅ Booking removed.");
  }
};

  return (
    <div className="min-h-screen bg-[url('Images/Co-workingSpace.jpeg')] bg-cover bg-fixed flex flex-col">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-[#355872] h-[90px] flex items-center justify-between px-6 md:px-12 shadow-2xl sticky top-0 z-50">
        <div className="flex-1">
          <Link to="/" className="transition-transform hover:scale-105 inline-block">
            <img src="/Images/officehublogo.png" alt="logo" className="h-[60px] w-auto drop-shadow-md" />
          </Link>
        </div>
        
        <div className="flex-[2] text-center">
          <h2 className="text-white font-black text-2xl md:text-4xl tracking-[0.2em] m-0 drop-shadow-lg">DASHBOARD</h2>
        </div>
        
        <div className="flex-1 flex justify-end">
          <Link to="/dashboard" className="group relative">
            <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <img 
              src={profileImage} 
              alt="profile" 
              className="relative h-[55px] w-[55px] rounded-full object-cover border-2 border-white/30 bg-white shadow-lg" 
            />
          </Link>
        </div>
      </nav>

      {/* --- MAIN LAYOUT --- */}
      <main className="flex-grow p-4 md:p-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: THE BOOKING SQUARE */}
        <div className="flex-[1.5] bg-white rounded-[3rem] shadow-2xl flex flex-col border border-gray-100 overflow-hidden">
          {/* Header of Square */}
          <div className="bg-gray-50 px-10 py-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-2xl font-black text-[#355872] tracking-tight">ACTIVE BOOKINGS</h3>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{bookings.length} Registered</span>
            </div>
          </div>

          {/* Scrollable List */}
          <div className="p-6 overflow-y-auto max-h-[550px] space-y-4 scrollbar-thin scrollbar-thumb-[#355872] scrollbar-track-gray-100">
            {sortedBookings.length > 0 ? (
              sortedBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="group bg-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center border-2 border-gray-50 hover:border-[#355872]/20 hover:bg-blue-50/30 transition-all duration-300"
                >
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-[#355872] transition-colors">{booking.room}</h4>
                    <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                        <span className="text-gray-400 text-lg">📅</span>
                        <p className="text-gray-500 font-bold text-sm tracking-tight">{booking.date}</p>
                    </div>
                    <p className="text-[#355872] text-3xl font-black mt-2">{booking.price}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleCancel(booking.id, booking.date)}
                    className="w-full sm:w-auto bg-red-50 text-red-500 px-8 py-3 rounded-2xl font-black text-sm hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95"
                  >
                    CANCEL BOOKING
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <span className="text-6xl mb-4">📭</span>
                <p className="font-bold text-xl uppercase tracking-widest text-gray-500">No Upcoming Tasks</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: THE 3 BIG NAV TILES */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Tile 1: Book Now */}
          <Link to="/services" className="group flex-1 bg-[#355872] rounded-[3rem] shadow-xl p-8 flex flex-col items-center justify-center text-white relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[#355872]/40">
            <div className="absolute top-[-20px] right-[-20px] text-white/10 text-9xl rotate-12 group-hover:rotate-45 transition-transform duration-700">✨</div>
            <span className="text-5xl mb-4 transform group-hover:scale-125 transition-transform">📅</span>
            <h4 className="font-black text-2xl tracking-[0.2em] relative z-10">BOOK NOW</h4>
            <p className="text-xs text-white/60 mt-2 font-bold uppercase tracking-widest">Reserve your spot</p>
          </Link>

          {/* Tile 2: Edit Profile */}
          <Link to="/dashboard" className="group flex-1 bg-white border-[6px] border-[#355872] rounded-[3rem] shadow-xl p-8 flex flex-col items-center justify-center text-[#355872] transition-all duration-500 hover:scale-[1.02] hover:bg-gray-50">
            <span className="text-5xl mb-4 transform group-hover:rotate-12 transition-transform">👤</span>
            <h4 className="font-black text-2xl tracking-[0.2em]">EDIT PROFILE</h4>
            <p className="text-xs text-[#355872]/50 mt-2 font-bold uppercase tracking-widest">Update your details</p>
          </Link>

          {/* Tile 3: Service Details */}
          <Link to="/service-details" className="group flex-1 bg-[#435e7a] rounded-[3rem] shadow-xl p-8 flex flex-col items-center justify-center text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-gray-400">
            <span className="text-5xl mb-4 transform group-hover:-translate-y-2 transition-transform">📋</span>
            <h4 className="font-black text-2xl tracking-[0.2em] text-center leading-tight">SERVICE INFO</h4>
            <p className="text-xs text-white/60 mt-2 font-bold uppercase tracking-widest">Learn more</p>
          </Link>

        </div>
      </main>
      
      {/* Visual Indicator of Scroll */}
      <div className="fixed bottom-4 right-10 text-[#355872]/20 font-black text-8xl pointer-events-none select-none hidden lg:block">
        HUB
      </div>
    </div>
  );
};

export default Dashboard2;