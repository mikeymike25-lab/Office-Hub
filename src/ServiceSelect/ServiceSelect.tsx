import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// 1. Define what a "Service" looks like
interface Service {
  id: number;
  title: string;
  category: string; 
  duration: string;
  price: string;
  capacity: string;
  img: string;
}

const ServiceSelect: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  const [profileImage, setProfileImage] = useState<string>(
  localStorage.getItem("user_profile_pfp") || "/Images/userprofile.png"
);
  // 1. ADD THESE: Filter States
  const [category, setCategory] = useState('ALL');
  const [duration, setDuration] = useState('ALL');
  const [price, setPrice] = useState('ALL');
  const [capacity, setCapacity] = useState('ALL');

  // Modal & Form State (Keep these)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    contact: '',
    company: ''
  });

  // 2. UPDATED DATA: Added 'category' and updated 'Dedication Desk'
  const services = [
  {
    id: 1,
    title: "Quiet Corner",
    category: "CO-WORKING DESK",
    duration: "WEEKLY",
    price: "300$", // Updated to 300
    capacity: "1 - 5",
    img: "/Images/drafroom.png"
  },
  {
    id: 2,
    title: "Dedication Desk",
    category: "PRIVATE OFFICES",
    duration: "MONTHLY",
    price: "800$",
    capacity: "1 - 5",
    img: "/Images/meetroom.png"
  },
  {
    id: 3,
    title: "Focus Pod",
    category: "INDIVIDUAL BOOTH",
    duration: "DAILY",
    price: "100$", // Updated to 100
    capacity: "1",
    img: "/Images/focuspod.png"
  },
  {
    id: 4,
    title: "Innovation Suite",
    category: "MEETING ROOM",
    duration: "MONTHLY", // Updated to Monthly
    price: "1000$", // Updated to 1000
    capacity: "6 - 10", // Updated to match your filter options
    img: "/Images/innovationsuite.png"
  }
];

  // 3. ADD THIS: Filter Logic
  // This creates a sub-list of services that match what is selected in the dropdowns
 const sortedServices = [...services].sort((a, b) => {
  let scoreA = 0;
  let scoreB = 0;

  const calculateScore = (s: Service) => {
    let sScore = 0;
    if (category !== 'ALL' && s.category === category) sScore++;
    if (duration !== 'ALL' && s.duration === duration) sScore++;
    if (capacity !== 'ALL' && s.capacity === capacity) sScore++;
    
    // Price Range Logic
    if (price !== 'ALL') {
      const numPrice = parseInt(s.price.replace('$', ''));
      if (price === '100+' && numPrice >= 100) sScore++;
      if (price === '500+' && numPrice >= 500) sScore++;
      if (price === '1000+' && numPrice >= 1000) sScore++;
    }
    return sScore;
  };

  scoreA = calculateScore(a);
  scoreB = calculateScore(b);

  return scoreB - scoreA; // Best matches go to the top
});

  // (Keep your useEffect and Handlers the same as before...)
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      
      // If we DON'T have a custom uploaded photo, use the Google/Firebase one
      const savedPhoto = localStorage.getItem("user_profile_pfp");
      if (!savedPhoto && currentUser.photoURL) {
        setProfileImage(currentUser.photoURL);
      }
    }
  });
  return () => unsubscribe();
}, []);

  // Handlers
  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

const handleCalendarRedirect = () => {
  // 1. Validation Check: Trim removes empty spaces
  if (!bookingData.name.trim() || !bookingData.contact.trim()) {
    alert("Please enter your Name and Contact details before proceeding!");
    return; // This STOPS the function right here
  }

  // 2. If the check passes, save to localStorage
  localStorage.setItem("selectedRoom", selectedService?.title || "");
  localStorage.setItem("customerName", bookingData.name);
  localStorage.setItem("customerContact", bookingData.contact);
  localStorage.setItem("customerCompany", bookingData.company || "N/A");
  
  // 3. Move to the calendar
  navigate('/calendar'); 
};
  return (
    <div className="min-h-screen bg-[#d1d5db] flex flex-col font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-[#355872] h-[90px] flex items-center justify-between px-10 shadow-lg relative z-20">
        <div className="flex-1">
          <Link to="/dashboard2">
            <img src="/Images/officehublogo.png" alt="logo" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] text-center">
          <h2 className="text-white font-black text-3xl tracking-widest m-0">BOOKING</h2>
        </div>
       <div className="flex-1 flex justify-end">
  <Link to="/dashboard">
    <img 
      src={profileImage} // Changed from user?.photoURL to profileImage
      alt="profile" 
      className="h-[60px] w-[60px] md:h-[55px] md:w-[55px] rounded-full object-cover shadow-sm border-2 border-white/20 bg-white" 
    />
  </Link>
</div>
      </nav>

    {/* --- FILTER BAR --- */}
<section className="bg-[#f5f3e7] py-4 flex flex-wrap justify-center gap-8 border-b-2 border-[#1a2e44]">
  
  {/* Category Filter */}
  <div className="flex items-center gap-3">
    <label className="font-bold text-sm text-[#1a2e44]">CATEGORY:</label>
    <div className="bg-[#d1d1d1] border border-black rounded-full px-4 py-1">
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="bg-transparent border-none font-bold outline-none cursor-pointer text-sm uppercase"
      >
        <option value="ALL">ALL</option>
        <option value="PRIVATE OFFICES">PRIVATE OFFICES</option>
        <option value="CO-WORKING DESK">CO-WORKING DESK</option>
        <option value="MEETING ROOM">MEETING ROOM</option>
      </select>
    </div>
  </div>

  {/* Duration Filter */}
  <div className="flex items-center gap-3">
    <label className="font-bold text-sm text-[#1a2e44]">DURATION:</label>
    <div className="bg-[#d1d1d1] border border-black rounded-full px-4 py-1">
      <select 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)}
        className="bg-transparent border-none font-bold outline-none cursor-pointer text-sm uppercase"
      >
        <option value="ALL">ALL</option>
        <option value="WEEKLY">WEEKLY</option>
        <option value="DAILY">DAILY</option>
        <option value="MONTHLY">MONTHLY</option>
      </select>
    </div>
  </div>

 {/* Price Filter */}
<div className="flex items-center gap-3">
  <label className="font-bold text-sm text-[#1a2e44]">PRICE:</label>
  <div className="bg-[#d1d1d1] border border-black rounded-full px-4 py-1">
    <select 
      value={price} 
      onChange={(e) => setPrice(e.target.value)}
      className="bg-transparent border-none font-bold outline-none cursor-pointer text-sm uppercase"
    >
      <option value="ALL">ALL</option>
      <option value="100+">100$+</option>
      <option value="500+">500$+</option>
      <option value="1000+">1000$+</option>
    </select>
  </div>
</div>

{/* Capacity Filter */}
<div className="flex items-center gap-3">
  <label className="font-bold text-sm text-[#1a2e44]">CAPACITY:</label>
  <div className="bg-[#d1d1d1] border border-black rounded-full px-4 py-1">
    <select 
      value={capacity} 
      onChange={(e) => setCapacity(e.target.value)}
      className="bg-transparent border-none font-bold outline-none cursor-pointer text-sm uppercase"
    >
      <option value="ALL">ALL</option>
      <option value="1">1 Max</option>
      <option value="1 - 5">1 - 5 Max</option>
      <option value="6 - 10">6 - 10 Max</option>
    </select>
  </div>
</div>

</section>
      {/* --- SERVICE GRID --- */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-6">
  {sortedServices.map((service) => (
    <div 
      key={service.id} 
      className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-2xl transition-all"
    >
      {/* Image Section */}
      <div className="md:w-1/2 h-64 md:h-auto">
        <img 
          src={service.img} 
          alt={service.title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Details Section */}
      <div className="md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-black text-[#355872] tracking-widest uppercase opacity-70">
            {service.category}
          </span>
          <h3 className="text-2xl font-bold text-[#1F2A37] mt-1">{service.title}</h3>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500 font-medium">
              <i className="fas fa-clock mr-2"></i> Duration: {service.duration}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              <i className="fas fa-users mr-2"></i> Capacity: {service.capacity} Max
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
  <span className="text-2xl font-black text-[#355872]">{service.price}</span>
  <button 
    type="button"
    onClick={() => {
      // 1. Save the specific room name and price to the "Mailbox" (LocalStorage)
      localStorage.setItem("selectedRoom", service.title);
      localStorage.setItem("roomPrice", service.price);
      
      // 2. Open the pop-out modal
      openModal(service);
    }}
    className="bg-[#355872] text-white px-6 py-2 rounded-xl font-bold hover:brightness-110 transition-all shadow-md active:scale-95"
  >
    Select
  </button>
</div>
      </div>
    </div>
  ))}
</div>

      {/* --- BOOKING MODAL --- */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div 
            className="bg-[#d1d5db] w-full max-w-[800px] rounded-[30px] overflow-hidden shadow-2xl border border-gray-600 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#435e7a] p-5 flex justify-center">
              <div className="flex items-center gap-5">
                <div className="bg-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-3xl border-2 border-black">📋</div>
                <h2 className="text-white text-2xl font-serif tracking-[2px]">CONFIRM</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col md:flex-row gap-8">
              {/* Preview Card */}
              <div 
                className="flex-1 h-[220px] rounded-[25px] p-6 text-white shadow-inner"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${selectedService.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{selectedService.title}</h3>
                <p>Duration: {selectedService.duration}</p>
                <p>Price: {selectedService.price}</p>
                <p>Capacity: {selectedService.capacity}</p>
              </div>

              {/* Form */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Name of Customer</label>
                  <input 
                    type="text" 
                    placeholder="Enter name"
                    className="w-full p-3 rounded-xl border border-black bg-gray-200 focus:bg-white outline-none"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Contact Info</label>
                  <input 
                    type="text" 
                    placeholder="Phone or Email"
                    className="w-full p-3 rounded-xl border border-black bg-gray-200 focus:bg-white outline-none"
                    value={bookingData.contact}
                    onChange={(e) => setBookingData({...bookingData, contact: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Company (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Company name"
                    className="w-full p-3 rounded-xl border border-black bg-gray-200 focus:bg-white outline-none"
                    value={bookingData.company}
                    onChange={(e) => setBookingData({...bookingData, company: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-8 flex justify-between">
     {/* --- BUTTON GROUP --- */}
<div className="flex gap-4 mt-8 w-full">
  
  {/* CANCEL BUTTON */}
  <button 
    type="button"
    onClick={closeModal}
    className="flex-1 bg-[#435e7a] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all"
  >
    CANCEL
  </button>

  {/* CALENDAR BUTTON */}
  <button 
    type="button"
    onClick={handleCalendarRedirect}
    disabled={!bookingData.name.trim() || !bookingData.contact.trim()}
    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
      (!bookingData.name.trim() || !bookingData.contact.trim()) 
        ? "bg-gray-400 cursor-not-allowed opacity-50" 
        : "bg-[#355872] text-white hover:bg-[#2d4b61]"
    }`}
  >
    CALENDAR
  </button>

</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Arrow */}
      <div className="fixed bottom-5 right-10 text-3xl font-bold animate-bounce cursor-default">
        ∨
      </div>
    </div>
  );
};

export default ServiceSelect;