import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of your carousel images
  const slides = [
    'Images/meetroom.png',
    'Images/confroom.png',
    'Images/maclab.png',
    'Images/drafroom.png'
  ];

  // Auto-play the carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-[#F7F8F0] font-sans flex flex-col">
      
      {/* Top Navbar */}
      <nav id="top" className="bg-[#355872] px-8 py-2 relative z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img src="Images/officehublogo.png" alt="officehub" className="h-[70px] w-auto" />
          </Link>
          
          {/* Profile & Dropdown (Replaces the old jQuery Modal) */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="focus:outline-none"
            >
              <img src="Images/userprofile.png" alt="userprofile" className="h-[90px] w-auto cursor-pointer" />
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-50 border border-gray-100">
                <Link to="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#355872] hover:text-white font-bold transition-colors">
                  SIGN UP
                </Link>
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#355872] hover:text-white font-bold transition-colors">
                  LOG IN
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-center py-3">
          <ul className="flex space-x-12 text-[#000000] font-bold text-lg tracking-wide">
            <li><a href="#top" className="hover:text-[#355872] transition-colors">HOME</a></li>
            <li><a href="#services-section" className="hover:text-[#355872] transition-colors">SERVICES</a></li>
            <li><a href="#contact-section" className="hover:text-[#355872] transition-colors">CONTACT</a></li>
            <li><Link to="/" className="hover:text-[#355872] transition-colors">PAGES</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Carousel Section */}
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#355872]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlay & Text */}
        <div className="absolute inset-0 bg-[#355872]/70 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="font-['Georgia',serif] italic font-bold text-3xl md:text-5xl mb-4 tracking-wide">
            WELCOME TO OFFICE HUB
          </h1>
          <p className="font-['Georgia',serif] italic font-bold text-xl md:text-2xl">
            Discover Your Perfect Workspace
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section id="services-section" className="container mx-auto my-16 px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Georgia',serif] italic font-bold text-4xl text-[#355872] mb-3">OUR SERVICES</h2>
          <p className="text-[#355872] text-lg font-medium">Tailored workspaces designed for your productivity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1">Hot Desk</h3>
            <h6 className="text-gray-500 text-sm mb-3">The Flexible Nomad</h6>
            <p className="font-bold text-[#355872] mb-3">"Your Instant Workspace."</p>
            <p className="font-serif text-sm leading-relaxed mb-6 flex-grow">Drop in, plug in, and get to work. Our Hot Desks offer ultimate flexibility for freelancers who need a professional environment without long-term commitment.</p>
            <p className="text-sm text-gray-600 border-t border-gray-200 pt-3"><strong>Best for:</strong> Digital nomads, students, and travelers.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1">Dedicated Desk</h3>
            <h6 className="text-gray-500 text-sm mb-3">The Professional Home</h6>
            <p className="font-bold text-[#355872] mb-3">"Your Desk, Your Way."</p>
            <p className="font-serif text-sm leading-relaxed mb-6 flex-grow">Stop searching for a spot and start building your routine. You get a reserved workstation that’s yours alone, featuring a secure locker and fixed address.</p>
            <p className="text-sm text-gray-600 border-t border-gray-200 pt-3"><strong>Best for:</strong> Solopreneurs and remote employees.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1">Private Office</h3>
            <h6 className="text-gray-500 text-sm mb-3">The Growth Hub</h6>
            <p className="font-bold text-[#355872] mb-3">"Quiet Space for Big Ideas."</p>
            <p className="font-serif text-sm leading-relaxed mb-6 flex-grow">Scale your business in a fully furnished, sound-proof suite for teams of 2 to 10. Includes 24/7 access and mail handling.</p>
            <p className="text-sm text-gray-600 border-t border-gray-200 pt-3"><strong>Best for:</strong> Startups and small agencies.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1">Meeting Rooms</h3>
            <h6 className="text-gray-500 text-sm mb-3">The Collaboration Suite</h6>
            <p className="font-bold text-[#355872] mb-3">"Meet, Pitch, and Present."</p>
            <p className="font-serif text-sm leading-relaxed mb-6 flex-grow">Impress clients in tech-enabled spaces with 4K displays and high-end video gear. Catering options available upon request.</p>
            <p className="text-sm text-gray-600 border-t border-gray-200 pt-3"><strong>Best for:</strong> Client pitches and workshops.</p>
          </div>
        </div>
      </section>

      {/* Map Footer */}
      <footer className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.4273160098164!2d120.58460077500938!3d15.134859385417268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f3d7084b279b%3A0x1d649fcbc0e03607!2sOffice%20Hub!5e0!3m2!1sen!2sph!4v1772790477380!5m2!1sen!2sph"
          className="w-full h-[450px] border-0"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </footer>

      {/* Contact Footer */}
      <footer id="contact-section" className="bg-[#355872] text-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="uppercase font-bold text-xl mb-4">OfficeHub 2026</h3>
              <p className="italic text-gray-200 max-w-md">
                Find your perfect workspace with the world's No.1 marketplace: 
                35,000 properties, free expert help, best-price guaranteed.
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h6 className="uppercase font-bold text-lg mb-4">CONTACT</h6>
              <address className="not-italic text-gray-200 leading-loose">
                <em>
                  Saint Joseph Street, Angeles City, Pampanga 2009 Philippines<br />
                  (02) 8271 1411<br />
                  office-hub.com<br />
                  gphilipp@gmail.com<br />
                  0908-384-1752
                </em>
              </address>
            </div>
          </div>

          <div className="text-right text-gray-400 text-sm border-t border-[#466d8f] pt-4">
            © 2026 Copyright
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;