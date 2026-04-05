import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define the shape of our Service data
interface Service {
  id: number;
  title: string;
  duration: string;
  price: string;
  capacity: string;
  img: string;
}

// Mock data array to make rendering the cards cleaner
const servicesData: Service[] = [
  {
    id: 1,
    title: 'Quiet Corner',
    duration: 'weekly',
    price: '100$',
    capacity: '2',
    img: '/Images/drafroom.png', // Note: ensure paths match your React public folder setup
  },
  {
    id: 2,
    title: 'Dedication desk',
    duration: 'weekly',
    price: '300$',
    capacity: '5',
    img: '/Images/meetroom.png',
  },
];

const ServiceSelect: React.FC = () => {
  const navigate = useNavigate();

  // State Management for Modal and Form
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // State for the customer form inside the modal
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    company: ''
  });

  // Event Handlers
  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalendarClick = () => {
    if (selectedService) {
      // Save details to localStorage just like the original JS logic
      localStorage.setItem("selectedRoom", selectedService.title);
      localStorage.setItem("customerName", formData.name);
      localStorage.setItem("customerContact", formData.contact);
      
      // Navigate to the calendar page (update the route path based on your setup)
      navigate('/calendar'); 
    }
  };

  return (
    <div className="min-h-screen bg-[#d1d5db] font-sans">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-[#355872] px-10 h-[90px]">
        <div className="flex-1 flex items-center">
          <Link to="/ServiceDetails">
            <img src="/Images/officehublogo.png" alt="officehub" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] flex justify-center">
          <h2 className="text-white font-black text-[2rem] tracking-[2px] m-0">BOOKING</h2>
        </div>
        <div className="flex-1 flex justify-end">
          <Link to="/dashboard">
            <img src="/Images/userprofile.png" alt="userprofile" className="h-[70px] w-[70px] rounded-full object-cover border-2 border-white/20" />
          </Link>
        </div>
      </nav>

      {/* Filter Bar */}
      <section className="bg-[#f5f3e7] py-[15px] px-5 flex justify-center gap-5 border-b-2 border-[#1a2e44]">
        {/* Category Filter */}
        <div className="flex items-center gap-2.5">
          <label className="font-bold text-[0.9rem] text-[#1a2e44]">CATEGORY:</label>
          <div className="bg-[#d1d1d1] border border-black rounded-full py-1.5 px-4 flex items-center">
            <select className="bg-transparent border-none font-bold outline-none cursor-pointer text-[#1a2e44]">
              <option>PRIVATE OFFICES</option>
              <option>CO-WORKING DESK</option>
              <option>MEETING ROOM</option>
            </select>
          </div>
        </div>

        {/* Duration Filter */}
        <div className="flex items-center gap-2.5">
          <label className="font-bold text-[0.9rem] text-[#1a2e44]">Duration:</label>
          <div className="bg-[#d1d1d1] border border-black rounded-full py-1.5 px-4 flex items-center">
            <select className="bg-transparent border-none font-bold outline-none cursor-pointer text-[#1a2e44]">
              <option>WEEKLY</option>
              <option>DAILY</option>
              <option>MONTHLY</option>
            </select>
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex items-center gap-2.5">
          <label className="font-bold text-[0.9rem] text-[#1a2e44]">PRICE:</label>
          <div className="bg-[#d1d1d1] border border-black rounded-full py-1.5 px-4 flex items-center">
            <select className="bg-transparent border-none font-bold outline-none cursor-pointer text-[#1a2e44]">
              <option>100$ - 500$</option>
              <option>500$ - 1000$</option>
            </select>
          </div>
        </div>

        {/* Capacity Filter */}
        <div className="flex items-center gap-2.5">
          <label className="font-bold text-[0.9rem] text-[#1a2e44]">CAPACITY:</label>
          <div className="bg-[#d1d1d1] border border-black rounded-full py-1.5 px-4 flex items-center">
            <select className="bg-transparent border-none font-bold outline-none cursor-pointer text-[#1a2e44]">
              <option>1 - 5</option>
              <option>6 - 10</option>
              <option>10+</option>
            </select>
          </div>
        </div>
      </section>

      {/* Services Main Container */}
      <main className="flex justify-center gap-10 py-[50px] px-5 flex-wrap relative">
        {servicesData.map((service) => (
          <div 
            key={service.id}
            onClick={() => handleOpenModal(service)}
            className="w-[400px] h-[250px] rounded-[40px] bg-cover bg-center relative shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-2.5 cursor-pointer overflow-hidden"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${service.img}')` }}
          >
            <div className="p-[30px] text-white h-full flex flex-col justify-end">
              <h2 className="text-[1.8rem] mb-2.5 font-normal">{service.title}</h2>
              <p className="my-1 text-[1.1rem]">Duration: {service.duration}</p>
              <p className="my-1 text-[1.1rem]">Price: {service.price}</p>
              <p className="my-1 text-[1.1rem]">Capacity: {service.capacity}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Scroll Arrow (Decorative) */}
      <div className="fixed bottom-5 right-10 text-[30px] font-bold cursor-pointer text-[#1a2e44]">
        ∨
      </div>

      {/* Modal Overlay */}
      {isModalOpen && selectedService && (
        <div 
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]"
          onClick={handleCloseModal} // Closes when clicking outside the box
        >
          <div 
            className="bg-[#d1d5db] w-full max-w-[800px] rounded-[30px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#333]"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the box
          >
            {/* Modal Header */}
            <div className="bg-[#435e7a] p-5 flex justify-center">
              <div className="flex items-center gap-5">
                <div className="bg-white w-[60px] h-[60px] rounded-full flex justify-center items-center text-[30px] border-2 border-black shadow-inner">
                  📋
                </div>
                <h2 className="text-white font-[Georgia,serif] tracking-[2px] m-0 text-2xl">CONFIRM</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex p-[30px] gap-[30px] flex-col md:flex-row">
              {/* Image Preview */}
              <div 
                className="flex-1 h-[200px] rounded-[25px] bg-cover bg-center p-5 text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex flex-col justify-end"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${selectedService.img}')` }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedService.title}</h3>
                  <p className="m-0 text-sm">Duration: {selectedService.duration}</p>
                  <p className="m-0 text-sm">Price: {selectedService.price}</p>
                  <p className="m-0 text-sm">Capacity: {selectedService.capacity}</p>
                </div>
              </div>

              {/* Form Input */}
              <form className="flex-1 flex flex-col gap-[15px]" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[0.9rem] font-bold mb-1.5 text-[#1a2e44]">Name of customer</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="name" 
                    className="w-full py-2.5 px-5 rounded-[20px] border border-black bg-[#e5e7eb] outline-none focus:border-[#435e7a]"
                  />
                </div>
                <div>
                  <label className="block text-[0.9rem] font-bold mb-1.5 text-[#1a2e44]">Contact</label>
                  <input 
                    type="text" 
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Phone no / gmail" 
                    className="w-full py-2.5 px-5 rounded-[20px] border border-black bg-[#e5e7eb] outline-none focus:border-[#435e7a]"
                  />
                </div>
                <div>
                  <label className="block text-[0.9rem] font-bold mb-1.5 text-[#1a2e44]">Company</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="optional..." 
                    className="w-full py-2.5 px-5 rounded-[20px] border border-black bg-[#e5e7eb] outline-none focus:border-[#435e7a]"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex justify-between px-[30px] pb-[30px]">
              <button 
                onClick={handleCloseModal}
                className="bg-[#435e7a] text-white border-none py-2.5 px-[30px] rounded-[15px] cursor-pointer font-bold hover:brightness-110 transition-all shadow-md"
              >
                CANCEL
              </button>
              <button 
                onClick={handleCalendarClick}
                className="bg-[#8da9c4] text-white border-none py-2.5 px-[30px] rounded-[15px] cursor-pointer font-bold hover:brightness-110 transition-all shadow-md"
              >
                CALENDAR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ServiceSelect;