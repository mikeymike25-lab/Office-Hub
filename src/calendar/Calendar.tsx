import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // 1. Calendar State
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // 2. Calendar Calculation Logic
  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // Previous Month Days (Disabled)
    for (let x = firstDayIndex; x > 0; x--) {
      days.push({
        day: prevLastDay - x + 1,
        className: "day prev-date disabled opacity-50 bg-[#fafafa] text-[#ccc] cursor-not-allowed",
        clickable: false
      });
    }

    // Current Month Days
    for (let i = 1; i <= lastDay; i++) {
      const checkDate = new Date(year, month, i);
      const isToday = checkDate.getTime() === today.getTime();
      const isPast = checkDate < today;

      let className = "day min-h-[100px] p-[15px] bg-white border-[0.5px] border-[#f0f0f0] transition-all cursor-pointer hover:bg-[#f0f4f8] flex items-start justify-start ";
      
      if (isPast) className = "day min-h-[100px] p-[15px] bg-[#f8fafc] text-[#cbd5e0] cursor-not-allowed pointer-events-none ";
      if (isToday) className = "day min-h-[100px] p-[15px] bg-[#355872] text-white font-bold border-2 border-[#435e7a] cursor-pointer ";

      days.push({
        day: i,
        className: className,
        clickable: !isPast
      });
    }

    return days;
  };

  const changeMonth = (dir: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + dir);
    setViewDate(newDate);
  };

  const handleSelectDate = (day: number) => {
    const dateString = `${months[viewDate.getMonth()]} ${day}, ${viewDate.getFullYear()}`;
    localStorage.setItem("selectedBookingDate", dateString);
    navigate('/payment'); // Make sure you have this route!
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed font-sans"
      style={{ backgroundImage: "url('/Images/Co-workingSpace.jpeg')" }}
    >
      {/* --- NAVBAR --- */}
      <nav className="bg-[#355872] h-[90px] flex items-center justify-between px-10 relative z-20">
        <div className="flex-1">
          <Link to="/services">
            <img src="/Images/officehublogo.png" alt="logo" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] text-center">
          <h2 className="text-white font-black text-3xl tracking-widest m-0">CALENDAR</h2>
        </div>
        <div className="flex-1 flex justify-end">
          <Link to="/dashboard">
            <img 
              src={user?.photoURL || "/Images/userprofile.png"} 
              alt="profile" 
              className="h-[70px] w-[70px] rounded-full object-cover border-2 border-white/20" 
            />
          </Link>
        </div>
      </nav>

      {/* --- CALENDAR MAIN --- */}
      <main className="p-10 flex justify-center">
        <div className="w-full max-w-[1000px] flex flex-col items-center">
          
          <div className="flex gap-4 mb-5">
            <button onClick={() => changeMonth(-1)} className="bg-[#435e7a] text-white border-2 border-white px-5 py-2 rounded font-bold hover:bg-[#2d3f52]">❮ Prev</button>
            <button onClick={() => changeMonth(1)} className="bg-[#435e7a] text-white border-2 border-white px-5 py-2 rounded font-bold hover:bg-[#2d3f52]">Next ❯</button>
          </div>

          <h1 className="text-white text-6xl font-black mb-8 drop-shadow-lg uppercase tracking-tighter text-center">
            {months[viewDate.getMonth()]}
          </h1>

          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-7">
            {/* Day Names Header */}
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
              <div key={d} className="p-5 text-center font-bold text-[#435e7a] bg-[#f8f9fa] border-b border-[#eee]">
                {d}
              </div>
            ))}

            {/* Rendered Days */}
            {renderDays().map((d, index) => (
              <div 
                key={index} 
                className={d.className}
                onClick={() => d.clickable && handleSelectDate(d.day)}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;