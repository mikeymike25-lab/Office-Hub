import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust this path to match your folder structure

const Calendar: React.FC = () => {
  const navigate = useNavigate();

const [profileImage, setProfileImage] = useState<string>(
  localStorage.getItem("user_profile_pfp") || "/Images/userprofile.png"
);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    const savedPhoto = localStorage.getItem("user_profile_pfp");
    if (savedPhoto) {
      setProfileImage(savedPhoto);
    } else if (user && user.photoURL) {
      setProfileImage(user.photoURL);
    }
  });
  return () => unsubscribe();
}, []);
  // State to track the currently viewed month and year
  const [currentDate, setCurrentDate] = useState(new Date());

  // Static arrays for rendering headers
  const MONTHS = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];
  const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Navigation Handlers
  const changeMonth = (dir: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + dir);
      return newDate;
    });
  };

  // Selection Handler
  const handleDateSelect = (day: number) => {
    const monthName = MONTHS[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    // Save to localStorage just like the original JS
    localStorage.setItem("selectedBookingDate", `${monthName} ${day}, ${year}`);
    
    // Navigate to the payment page (ensure this route exists in your App.tsx)
    navigate('/payment');
  };

  // --- Calendar Logic Calculations ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate day comparison

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  // Build the array of days to render in the grid
  const calendarDays = [];

  // 1. Previous Month Padding Dates (Always disabled)
  for (let x = firstDayIndex; x > 0; x--) {
    calendarDays.push({
      type: 'prev',
      dayNumber: prevLastDay - x + 1,
      isDisabled: true,
      isToday: false,
    });
  }

  // 2. Current Month Dates
  for (let i = 1; i <= lastDay; i++) {
    const checkDate = new Date(year, month, i);
    const isToday = checkDate.getTime() === today.getTime();
    const isPast = checkDate < today;

    calendarDays.push({
      type: 'current',
      dayNumber: i,
      isDisabled: isPast,
      isToday: isToday,
    });
  }

  return (
    // Main background wrapper
    <div className="min-h-screen bg-[url('/Images/Co-workingSpace.jpeg')] bg-cover bg-fixed font-sans flex flex-col m-0 p-0">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-[#355872] px-10 h-[90px]">
        <div className="flex-1 flex items-center">
          <Link to="/services">
            <img src="/Images/officehublogo.png" alt="officehub" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] flex justify-center">
          <h2 className="text-white font-black text-[2rem] tracking-[2px] m-0 font-sans">CALENDAR</h2>
        </div>
        <div className="flex-1 flex justify-end">
  <Link to="/dashboard" className="flex items-center justify-center transition-transform hover:scale-105">
    <img 
      src={profileImage} 
      alt="userprofile" 
      className="h-[60px] w-[60px] md:h-[55px] md:w-[55px] rounded-full object-cover shadow-sm border-2 border-white/20 bg-white" 
    />
  </Link>
</div>
      </nav>

      {/* Main Content */}
      <main className="py-10 px-5 flex justify-center flex-1">
        <div className="flex flex-col items-center w-full max-w-[1000px]">
          
          {/* Controls */}
          <div className="flex gap-[15px] mb-5">
            <button 
              onClick={() => changeMonth(-1)}
              className="bg-[#435e7a] text-white border-2 border-white py-2 px-5 rounded-[5px] font-bold cursor-pointer hover:brightness-110 transition-all"
            >
              ❮ Prev
            </button>
            <button 
              onClick={() => changeMonth(1)}
              className="bg-[#435e7a] text-white border-2 border-white py-2 px-5 rounded-[5px] font-bold cursor-pointer hover:brightness-110 transition-all"
            >
              Next ❯
            </button>
          </div>
          
          {/* Month Display */}
          <h1 className="text-white text-[3.5rem] font-black font-sans mb-[30px] drop-shadow-[2px_4px_8px_rgba(0,0,0,0.6)]">
            {MONTHS[month]} {year}
          </h1>
          
          {/* The Calendar Board */}
          <div className="grid grid-cols-7 bg-white rounded-[15px] w-full overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            
            {/* Day Names Header */}
            {DAYS_OF_WEEK.map((dayName) => (
              <div key={dayName} className="p-5 text-center font-bold text-[#435e7a] bg-[#f8f9fa] border-b border-[#eee]">
                {dayName}
              </div>
            ))}
            
            {/* Days Grid */}
            {calendarDays.map((dayObj, index) => {
              // Determine dynamic classes based on Apollo's CSS rules
              let cellClasses = "min-h-[100px] p-[15px] bg-white border-[0.5px] border-[#f0f0f0] transition-colors duration-200 ";
              
              if (dayObj.isDisabled) {
                // Disabled / Past dates
                cellClasses += "text-[#cbd5e0] bg-[#f8fafc] cursor-not-allowed pointer-events-none ";
                if (dayObj.type === 'prev') cellClasses += "opacity-50 ";
              } else if (dayObj.isToday) {
                // Today's date
                cellClasses += "bg-[#355872] text-white font-bold border-2 border-[#435e7a] ";
              } else {
                // Normal selectable dates
                cellClasses += "cursor-pointer hover:bg-[#f0f4f8] ";
              }

              return (
                <div 
                  key={index} 
                  className={cellClasses}
                  onClick={() => !dayObj.isDisabled && handleDateSelect(dayObj.dayNumber)}
                >
                  {dayObj.dayNumber}
                </div>
              );
            })}
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;