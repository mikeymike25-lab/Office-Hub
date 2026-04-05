import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// 1. Define what a "Service" looks like
interface Service {
  id: number;
  title: string;
  duration: string;
  price: string;
  capacity: string;
  img: string;
}

const ServiceSelection: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
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
      price: "100$",
      capacity: "1 - 5",
      img: "/Images/drafroom.png"
    },
    {
      id: 2,
      title: "Dedication Desk",
      category: "PRIVATE OFFICES",
      duration: "MONTHLY", // Changed to monthly
      price: "800$",       // Changed to 800
      capacity: "1 - 5",
      img: "/Images/meetroom.png"
    }
  ];

  // 3. ADD THIS: Filter Logic
  // This creates a sub-list of services that match what is selected in the dropdowns
  const sortedServices = [...services].sort((a, b) => {
  let scoreA = 0;
  let scoreB = 0;

  // Check Category match
  if (category !== 'ALL') {
    if (a.category === category) scoreA++;
    if (b.category === category) scoreB++;
  }

  // Check Duration match
  if (duration !== 'ALL') {
    if (a.duration === duration) scoreA++;
    if (b.duration === duration) scoreB++;
  }

  // Check Price match
  if (price !== 'ALL') {
    if (a.price === price) scoreA++;
    if (b.price === price) scoreB++;
  }

  // Check Capacity match
  if (capacity !== 'ALL') {
    if (a.capacity === capacity) scoreA++;
    if (b.capacity === capacity) scoreB++;
  }

  // Sort highest score to the front
  return scoreB - scoreA;
});

  // (Keep your useEffect and Handlers the same as before...)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
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
    // Save to localStorage just like your JS did
    localStorage.setItem("selectedRoom", selectedService?.title || "");
    localStorage.setItem("customerName", bookingData.name);
    localStorage.setItem("customerContact", bookingData.contact);
    
    navigate('/calendar'); // Adjust this path to match your App.tsx
  };

  return (
    <div className="min-h-screen bg-[#d1d5db] flex flex-col font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-[#355872] h-[90px] flex items-center justify-between px-10 shadow-lg relative z-20">
        <div className="flex-1">
          <Link to="/">
            <img src="/Images/officehublogo.png" alt="logo" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] text-center">
          <h2 className="text-white font-black text-3xl tracking-widest m-0">BOOKING</h2>
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
        <option value="100$">100$</option>
        <option value="800$">800$</option>
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
      <option value="1 - 5">1 - 5</option>
      <option value="6 - 10">6 - 10</option>
      <option value="10+">10+</option>
    </select>
  </div>
</div>

</section>
      {/* --- SERVICE GRID --- */}
      <main className="flex-1 p-10 flex flex-wrap justify-center gap-10">
  {sortedServices.map((service) => (
          <div 
            key={service.id}
            onClick={() => openModal(service)}
            className="group relative w-[400px] h-[250px] rounded-[40px] cursor-pointer transition-transform duration-300 hover:-translate-y-3 overflow-hidden shadow-2xl"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${service.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="p-8 text-white">
              <h2 className="text-3xl font-light mb-2">{service.title}</h2>
              <p className="text-lg opacity-90">Duration: {service.duration}</p>
              <p className="text-lg opacity-90">Price: {service.price}</p>
              <p className="text-lg opacity-90">Capacity: {service.capacity}</p>
            </div>
          </div>
        ))}
      </main>

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
              <button 
                onClick={closeModal}
                className="bg-[#435e7a] text-white px-8 py-2 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                CANCEL
              </button>
              <button 
                onClick={handleCalendarRedirect}
                className="bg-[#8da9c4] text-white px-8 py-2 rounded-xl font-bold hover:brightness-110 transition-all"
              >
                CALENDAR
              </button>
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

export default ServiceSelection;