import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceDetails: React.FC = () => {
  // State to manage which tab is currently active
  const [activeTab, setActiveTab] = useState<string>('offers');

  // Helper arrays to keep the JSX clean
  const tabs = [
    { id: 'offers', label: 'Service Offers' },
    { id: 'policies', label: 'Website Policies' },
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#9c9c9c] font-sans flex flex-col">
      
      {/* Primary Top Navbar */}
      <nav className="flex items-center justify-between bg-[#355872] px-10 h-[90px]">
        <Link to="/" className="flex items-center">
          <img src="/Images/officehublogo.png" alt="officehub" className="h-[70px] w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          {/* Using Link to go to Dashboard instead of href="#" */}
          <Link to="/dashboard">
            <img src="/Images/userprofile.png" alt="userprofile" className="h-[70px] w-auto rounded-full object-cover" />
          </Link>
        </div>
      </nav>

      {/* Secondary Sub-Navbar */}
      <nav className="bg-gray-100 flex justify-center items-center py-3 shadow-sm">
        <ul className="flex flex-wrap gap-8 list-none m-0 p-0">
          <li><Link to="/" className="text-gray-800 font-bold text-lg hover:text-[#355872] transition-colors">HOME</Link></li>
          <li><Link to="/services" className="text-gray-800 font-bold text-lg hover:text-[#355872] transition-colors">SERVICES</Link></li>
          <li><Link to="/contact" className="text-gray-800 font-bold text-lg hover:text-[#355872] transition-colors">CONTACT</Link></li>
          <li><Link to="/pages" className="text-gray-800 font-bold text-lg hover:text-[#355872] transition-colors">PAGES</Link></li>
        </ul>
      </nav>

      {/* Main Content Area with Background Image */}
      <div className="bg-[url('/Images/Co-workingSpace.jpeg')] bg-cover bg-center p-5 pb-[60px] border-[3px] border-[#8d8d8d] mt-1.5 flex-1">
        <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row gap-5">
          
          {/* Sidebar Navigation (Tabs) */}
          <div className="md:w-1/4">
            <div className="bg-[rgba(218,218,218,0.85)] p-5 border-[3px] border-[#8d8d8d] h-full flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-3 font-bold transition-colors duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-[#355872] text-white' 
                      : 'text-[#355872] bg-transparent hover:bg-gray-300/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="md:w-3/4">
            <div className="bg-[rgba(218,218,218,0.85)] p-6 border-[3px] border-[#8d8d8d] min-h-[400px]">
              
              {activeTab === 'offers' && (
                <div className="animate-fade-in">
                  <h3 className="bg-[#355872] text-white p-2.5 mb-[15px] text-xl font-bold">Service Offers</h3>
                  <h5 className="font-bold text-lg mb-3 text-gray-800">Here are the services we offer:</h5>
                  <ul className="list-disc pl-8 mb-4 text-gray-800 space-y-1">
                    <li>Office Space Rental</li>
                    <li>Meeting Room Bookings</li>
                    <li>Virtual Office Services</li>
                    <li>Mail Handling</li>
                    <li>Administrative Support</li>
                  </ul>
                  <p className="text-gray-800 mt-4">Contact us for more details on pricing and availability.</p>
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="animate-fade-in">
                  <h3 className="bg-[#355872] text-white p-2.5 mb-[15px] text-xl font-bold">Website Policies</h3>
                  
                  <h5 className="font-bold text-lg mt-4 mb-2 text-gray-800">Confidentiality Agreements:</h5>
                  <ul className="list-disc pl-8 mb-4 text-gray-800 space-y-1">
                    <li>All members must sign a confidentiality agreement before accessing any proprietary information.</li>
                  </ul>
                  
                  <h5 className="font-bold text-lg mt-4 mb-2 text-gray-800">Payment Terms:</h5>
                  <ul className="list-disc pl-8 mb-4 text-gray-800 space-y-1">
                    <li>Payments must be made in advance for all services.</li>
                    <li>We accept credit cards, bank transfers, e-cash, and cash payments. (ie. GCash, MasterCard, BPI, BDO)</li>
                  </ul>

                  <h5 className="font-bold text-lg mt-4 mb-2 text-gray-800">Cancellation and Refund Policies:</h5>
                  <ul className="list-disc pl-8 mb-4 text-gray-800 space-y-1">
                    <li>Cancellations made more than 24 hours before the scheduled time will be eligible for a full refund.</li>
                    <li>Cancellations made within 24 hours of the scheduled time will not be eligible for a refund.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'guidelines' && (
                <div className="animate-fade-in">
                  <h3 className="bg-[#355872] text-white p-2.5 mb-[15px] text-xl font-bold">Guidelines</h3>
                  <h5 className="font-bold text-lg mb-3 text-gray-800">Please follow these guidelines while using our facilities:</h5>
                  <ul className="list-disc pl-8 mb-4 text-gray-800 space-y-1">
                    <li>No smoking policy</li>
                    <li>Keep common areas clean</li>
                    <li>Book resources in advance</li>
                    <li>Report any issues promptly</li>
                    <li>Use equipment responsibly</li>
                  </ul>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="animate-fade-in">
                  <h3 className="bg-[#355872] text-white p-2.5 mb-[15px] text-xl font-bold">Contact Information</h3>
                  <h5 className="font-bold text-lg mb-4 text-gray-800">Get in touch with us:</h5>
                  <div className="space-y-3 text-gray-800">
                    <p><strong>Address:</strong> Saint Joseph Street, Angeles City, Pampanga 2009 Philippines</p>
                    <p><strong>Phone:</strong> (02) 8271 1411</p>
                    <p><strong>Email:</strong> office-hub@gmail.com</p>
                    <p><strong>Additional:</strong> 4HMP+WV Angeles City, Pampanga, mtlim@gmail.com, 0908-384-1752</p>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="animate-fade-in">
                  <h3 className="bg-[#355872] text-white p-2.5 mb-[15px] text-xl font-bold">Frequently Asked Questions</h3>
                  <div className="space-y-4 text-gray-800 mt-4">
                    <div>
                      <p className="font-bold">Q: How do I book a meeting room?</p>
                      <p>A: You can book through our online portal or contact our admin team.</p>
                    </div>
                    <div>
                      <p className="font-bold">Q: What are the available hours?</p>
                      <p>A: We are open from Monday to Saturday, 8 AM-7 PM.</p>
                    </div>
                    <div>
                      <p className="font-bold">Q: Is parking available?</p>
                      <p>A: Yes, we have on-site parking for members.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Map Footer */}
      <footer className="w-full bg-gray-200">
        <iframe
          src="https://maps.google.com/maps?q=Saint%20Joseph%20Street,%20Angeles%20City,%20Pampanga&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[450px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </footer>

      {/* Main Footer */}
      <footer className="bg-[#355872] text-white py-10 px-5 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 mb-8">
          
          {/* Left column */}
          <div className="md:w-2/3">
            <h3 className="font-bold text-xl mb-4">OFFICE DETAILS</h3>
            <p className="italic leading-relaxed text-gray-200">
              Saint Joseph Street, Angeles City, Pampanga 2009 Philippines<br />
              (02) 8271 1411<br />
              office-hub.com
            </p>
          </div>

          {/* Right column */}
          <div className="md:w-1/3 md:text-right">
            <h6 className="uppercase font-bold text-lg mb-4">MORE INFORMATION</h6>
            <p className="italic leading-relaxed text-gray-200">
              4HMP+WV Angeles City, Pampanga<br />
              mtlim@gmail.com<br />
              0908-384-1752
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-300 border-t border-gray-500 pt-5 mt-5">
          © 2026 Copyright Office Hub
        </div>
      </footer>

    </div>
  );
};

export default ServiceDetails;