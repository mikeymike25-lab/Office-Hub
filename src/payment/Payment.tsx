import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // 1. Booking Data State
  const [bookingDetails, setBookingDetails] = useState({
    room: "Not Selected",
    name: "Not Provided",
    date: "Date Not Selected",
    price: "$0.00"
  });

  // 2. UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    // Check Auth
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));

    // Load Data from LocalStorage (Saved in ServiceSelection and Calendar)
    const savedRoom = localStorage.getItem("selectedRoom") || "Office Hub Space";
    const savedName = localStorage.getItem("customerName") || "Guest";
    const savedDate = localStorage.getItem("selectedBookingDate") || "TBD";
    
    // Logic: If room is Dedication Desk, price is 800, else 100
    const price = savedRoom === "Dedication Desk" ? "$800.00" : "$100.00";

    setBookingDetails({
      room: savedRoom,
      name: savedName,
      date: savedDate,
      price: price
    });

    return () => unsubscribe();
  }, []);

  const handleShowReceipt = (method: string) => {
    setPaymentMethod(method);
    setIsModalOpen(true);
  };

  const finalSubmit = () => {
  // 1. Create a history object
  const newBooking = {
    room: bookingDetails.room,
    date: bookingDetails.date,
    price: bookingDetails.price,
    timestamp: new Date().toISOString()
  };

  // 2. Add to existing history in localStorage
  const existingHistory = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
  existingHistory.unshift(newBooking); // Add new booking to the top of the list
  localStorage.setItem("bookingHistory", JSON.stringify(existingHistory));

  alert("Payment Successful!");
  navigate('/dashboard');
};

  return (
    <div className="min-h-screen bg-cover bg-fixed font-sans" style={{ backgroundImage: "url('/Images/confroom.png')" }}>
        <style>{`
      @media print {
        /* Hide everything on the page */
        body * {
          visibility: hidden;
          background: none !important;
        }
        /* Only show the receipt box */
        .receipt-modal-content, .receipt-modal-content * {
          visibility: visible;
        }
        /* Position the receipt perfectly for the PDF */
        .receipt-modal-content {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 500px;
          border: 1px solid #ddd;
          box-shadow: none;
        }
        /* Hide the buttons so they don't show up in the PDF */
        .modal-footer {
          display: none !important;
        }
      } `}</style>
      {/* --- NAVBAR --- */}
      <nav className="bg-[#355872] h-[90px] flex items-center justify-between px-10 shadow-lg">
        <div className="flex-1">
          <Link to="/services">
            <img src="/Images/officehublogo.png" alt="logo" className="h-[60px] w-auto" />
          </Link>
        </div>
        <div className="flex-[2] text-center">
          <h2 className="text-white font-black text-3xl tracking-widest m-0">PAYMENT</h2>
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

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto mt-10 flex justify-center items-start gap-0">
        
        {/* Summary Card */}
        <section className="w-[380px] bg-[#93c5fd] p-8 rounded-2xl shadow-2xl z-10">
          <h2 className="font-black text-xl mb-6 text-[#1a2e44]">PAYMENT SUMMARY</h2>
          <ul className="space-y-4 text-[#1a2e44]">
            <li><strong>ROOM BOOKED:</strong> <br/> {bookingDetails.room}</li>
            <li><strong>CUSTOMER:</strong> <br/> {bookingDetails.name}</li>
            <li><strong>SCHEDULE:</strong> <br/> {bookingDetails.date}</li>
            <li><strong>PRICE:</strong> <br/> {bookingDetails.price}</li>
          </ul>
          <div className="mt-12 pt-6 border-t border-[#1a2e44]/20">
            <p className="text-sm font-bold uppercase">Total to Pay:</p>
            <h3 className="text-4xl font-black">{bookingDetails.price}</h3>
          </div>
        </section>

        {/* Payment Options */}
        <section className="flex flex-col gap-4 mt-4 -ml-5 z-0">
          {[
            { name: 'Gcash', img: '/Images/gcash logo.jpg' },
            { name: 'Pay Maya', img: '/Images/paymaya logo.png' },
            { name: 'Onsite Payment', icon: '💵' }
          ].map((opt) => (
            <button 
              key={opt.name}
              onClick={() => handleShowReceipt(opt.name)}
              className="bg-[#7da0c1] hover:translate-x-3 transition-all w-[300px] py-4 px-6 rounded-r-2xl flex items-center gap-4 shadow-lg font-bold text-[#1a2e44]"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-[#1a2e44] overflow-hidden">
                {opt.img ? <img src={opt.img} className="w-full h-full object-contain" /> : opt.icon}
              </div>
              {opt.name}
            </button>
          ))}
          
          <div className="mt-4 text-center">
            <p className="text-white text-xs">🔒 Secured with SSL</p>
          </div>
        </section>
      </main>

      {/* --- RECEIPT MODAL --- */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] p-4">
    
    {/* 1. Added 'relative' so the X button stays inside this box */}
    <div className="bg-white w-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl receipt-modal-content relative">
      
      {/* 2. THE "X" BUTTON */}
      <button 
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold z-10 transition-colors modal-footer"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Header */}
      <div className="bg-[#355872] p-6 text-white flex items-center gap-4">
        <span className="text-2xl">📋</span>
        <h2 className="text-2xl font-black uppercase">Official Receipt</h2>
      </div>
      
      {/* Body */}
      <div className="p-8 bg-gray-100 font-mono">
        <h3 className="underline font-bold mb-4">PAYMENT DETAILS</h3>
        <div className="space-y-2">
          <p><strong>ROOM:</strong> {bookingDetails.room}</p>
          <p><strong>NAME:</strong> {bookingDetails.name}</p>
          <p><strong>DATE:</strong> {bookingDetails.date}</p>
          <p><strong>METHOD:</strong> {paymentMethod}</p>
          <hr className="border-gray-400 my-4" />
          <p className="text-xl font-bold text-center">TOTAL: {bookingDetails.price}</p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-6 flex gap-4 modal-footer bg-white">
        <button 
          onClick={() => window.print()} 
          className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
        >
          SAVE AS PDF 📄
        </button>
        <button 
          onClick={finalSubmit} 
          className="flex-1 py-3 bg-[#355872] text-white rounded-xl font-bold hover:brightness-110"
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