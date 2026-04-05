import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  // State for the Receipt Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  // State to hold data pulled from localStorage
  const [bookingData, setBookingData] = useState({
    room: 'Grand Deluxe', // Fallback defaults
    name: '2 Adults',
    date: 'May 12-16, 2026',
    price: '$850.00' // Assuming price is static for now, you can pass this via localStorage too later
  });

  // Pull data from localStorage when the component loads
  useEffect(() => {
    const savedRoom = localStorage.getItem("selectedRoom") || 'Quiet Corner';
    const savedName = localStorage.getItem("customerName") || 'Not Provided';
    const savedDate = localStorage.getItem("selectedBookingDate") || 'Date Not Selected';

    setBookingData({
      room: savedRoom,
      name: savedName,
      date: savedDate,
      price: '$850.00' // Hardcoded as per original HTML
    });
  }, []);

  // Handlers
  const handleOpenReceipt = (method: string) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

  const handleCloseReceipt = () => {
    setIsModalOpen(false);
    setSelectedMethod('');
  };

  const handleConfirmAndPay = () => {
    // If they click the main CONFIRM button, prompt to pick a payment method first,
    // or just show the receipt defaulting to Onsite Payment.
    if (!selectedMethod) {
      handleOpenReceipt('Onsite Payment');
    } else {
      handleOpenReceipt(selectedMethod);
    }
  };

  const finalSubmit = () => {
    alert("Payment Successful! Redirecting to your dashboard...");

    // Clear the temporary booking data so it's ready for the next booking
    localStorage.removeItem("selectedBookingDate");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerContact");
    localStorage.removeItem("selectedRoom");

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[url('/Images/confroom.png')] bg-cover bg-fixed font-sans flex flex-col m-0 p-0">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-[#355872] px-10 h-[90px]">
        <div className="flex-1 flex items-center">
          <Link to="/calendar" className="transition-transform duration-200 hover:scale-110 hover:opacity-80">
            <img src="/Images/officehublogo.png" alt="officehub" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] flex justify-center">
          <h2 className="text-white font-black text-[2rem] tracking-[2px] m-0 font-sans">PAYMENT</h2>
        </div>
        <div className="flex-1 flex justify-end">
          <Link to="/dashboard" className="transition-transform duration-200 hover:scale-110 hover:opacity-80">
            <img src="/Images/userprofile.png" alt="userprofile" className="h-[70px] w-[70px] rounded-full object-cover" />
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex justify-center items-start mt-10">
        
        {/* Left: Summary Card (z-10 keeps it above the options) */}
        <section className="flex-none w-[380px] bg-[#93c5fd] p-[30px] rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative z-10">
          <h2 className="font-bold text-2xl mb-4">PAYMENT SUMMARY</h2>
          <ul className="list-none p-0 leading-loose text-gray-800">
            <li><strong>ROOM BOOKED:</strong> <span>{bookingData.room}</span></li>
            <li><strong>CUSTOMER / PAX:</strong> <span>{bookingData.name}</span></li>
            <li><strong>SCHEDULE:</strong> <span>{bookingData.date}</span></li>
            <li><strong>PRICE:</strong> <span>{bookingData.price}</span></li>
          </ul>
          <div className="mt-[60px]">
            <p className="font-bold m-0 text-gray-700">TOTAL TO PAY:</p>
            <h3 className="text-[2.5rem] m-0 font-bold text-gray-900">{bookingData.price}</h3>
          </div>
        </section>

        {/* Right: Payment Options Container (-ml-5 tucks it under the summary card) */}
        <section className="flex-none w-[320px] flex flex-col gap-5 relative z-0 mt-[15px] -ml-5">
          
          <button 
            onClick={() => handleOpenReceipt('Gcash')}
            className="bg-[#7da0c1] border-none rounded-r-[20px] flex items-center p-[15px_30px] w-[300px] cursor-pointer shadow-[5px_5px_15px_rgba(0,0,0,0.1)] transition-all duration-200 text-left font-bold text-gray-900 hover:translate-x-2.5 hover:bg-[#6a8fb1]"
          >
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center mr-[15px] border-2 border-[#1a2e44] overflow-hidden p-[5px]">
              <img src="/Images/gcash logo.jpg" alt="GCash" className="w-[140%] h-[140%] object-contain" />
            </div>
            <div>Gcash</div>
          </button>

          <button 
            onClick={() => handleOpenReceipt('Pay Maya')}
            className="bg-[#7da0c1] border-none rounded-r-[20px] flex items-center p-[15px_30px] w-[300px] cursor-pointer shadow-[5px_5px_15px_rgba(0,0,0,0.1)] transition-all duration-200 text-left font-bold text-gray-900 hover:translate-x-2.5 hover:bg-[#6a8fb1]"
          >
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center mr-[15px] border-2 border-[#1a2e44] overflow-hidden p-[5px]">
              <img src="/Images/paymaya logo.png" alt="Maya" className="w-[140%] h-[140%] object-contain" />
            </div>
            <div>Pay Maya</div>
          </button>

          <button 
            onClick={() => handleOpenReceipt('Onsite Payment')}
            className="bg-[#7da0c1] border-none rounded-r-[20px] flex items-center p-[15px_30px] w-[300px] cursor-pointer shadow-[5px_5px_15px_rgba(0,0,0,0.1)] transition-all duration-200 text-left font-bold text-gray-900 hover:translate-x-2.5 hover:bg-[#6a8fb1]"
          >
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center mr-[15px] border-2 border-[#1a2e44] overflow-hidden p-[5px] text-xl">
              💵
            </div>
            <div>Onsite Payment</div>
          </button>

          <button 
            onClick={handleConfirmAndPay}
            className="bg-[#3e5c76] text-white border-none rounded-r-[20px] flex items-center p-[15px_30px] w-[300px] cursor-pointer shadow-[5px_5px_15px_rgba(0,0,0,0.1)] transition-all duration-200 text-left font-bold hover:translate-x-2.5 hover:brightness-110"
          >
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center mr-[15px] border-2 border-[#1a2e44] overflow-hidden p-[5px] text-xl">
              ❗
            </div>
            <div>CONFIRM AND PAY</div>
          </button>

          <p className="text-white text-[0.8rem] mt-0 text-center font-bold drop-shadow-md">
            🔒 Secured with SSL
          </p>
        </section>
      </main>

      {/* Footer Links */}
      <footer className="text-center mt-auto mb-10">
        <a href="#" className="mx-2.5 text-white underline hover:text-gray-300">Terms & Conditions</a>
        <a href="#" className="mx-2.5 text-white underline hover:text-gray-300" onClick={() => navigate('/calendar')}>Cancel Payment</a>
      </footer>

      {/* Receipt Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
          <div className="w-[500px] bg-[#e5e7eb] rounded-[30px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#333] text-left relative">
            
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
            <div className="p-[30px]">
              <h3 className="underline mb-5 text-xl font-bold text-gray-800">PAYMENT SUMMARY</h3>
              <div className="text-gray-800 font-['Courier_New',monospace]">
                <p className="my-2.5"><strong>ROOM BOOKED:</strong> <span>{bookingData.room}</span></p>
                <p className="my-2.5"><strong>CUSTOMER / PAX:</strong> <span>{bookingData.name}</span></p>
                <p className="my-2.5"><strong>SCHEDULE:</strong> <span>{bookingData.date}</span></p>
                <p className="my-2.5"><strong>PAYMENT METHOD:</strong> <span className="text-[#3e5c76] font-bold">{selectedMethod}</span></p>
                <hr className="border-gray-400 my-4" />
                <p className="text-[1.2rem] font-bold mt-[15px]"><strong>PRICE:</strong> <span>{bookingData.price}</span></p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between px-[30px] pb-[30px] bg-[#e5e7eb]">
              <button 
                onClick={handleCloseReceipt}
                className="bg-[#435e7a] text-white border-none py-2.5 px-[30px] rounded-[15px] cursor-pointer font-bold hover:brightness-110 transition-all shadow-md"
              >
                CANCEL
              </button>
              <button 
                onClick={finalSubmit}
                className="bg-[#8da9c4] text-white border-none py-2.5 px-[30px] rounded-[15px] cursor-pointer font-bold hover:brightness-110 transition-all shadow-md text-gray-900"
              >
                CONFIRM
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default Payment;