import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Ensure this path matches your project structure
import { onAuthStateChanged, signOut } from 'firebase/auth';

const LandingPage: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState<any>(null);

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

  // Listen for Firebase Auth state to update the dropdown menu
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Sign Out from the landing page dropdown
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false); // Close dropdown after signing out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    // Added smooth scrolling so the navbar anchor links glide nicely
    <div className="min-h-screen bg-[#F7F8F0] font-sans flex flex-col scroll-smooth">
      
      {/* Top Navbar */}
      <nav id="top" className="bg-[#355872] px-4 md:px-8 py-3 relative z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center h-[70px]">
          
          {/* Logo - Fixed alignment to center vertically */}
          <Link to="/" className="flex items-center h-full">
            <img 
              src="Images/officehublogo.png" 
              alt="officehub" 
              className="h-[60px] md:h-[70px] w-auto drop-shadow-sm object-contain" 
            />
          </Link>
          
          {/* Profile & Dropdown */}
          <div className="relative flex items-center h-full">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="focus:outline-none transition-transform hover:scale-105 flex items-center justify-center p-0 bg-transparent border-none"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              {/* Profile Image - Fixed alignment */}
              <img 
                src={user?.photoURL || "Images/PlaceHolderOH.jpg"} 
                alt="userprofile" 
                className="h-[60px] w-[60px] md:h-[70px] md:w-[70px] cursor-pointer rounded-full object-cover shadow-sm border-2 border-white/20" 
              />
            </button>
            
            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[80px] w-56 bg-white rounded-lg shadow-2xl py-2 z-50 border border-gray-200 overflow-hidden transform origin-top-right transition-all">
                {user ? (
                  /* Show these options if the user IS logged in */
                  <>
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-[#355872] truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#355872] hover:text-white font-bold transition-colors no-underline">
                      DASHBOARD
                    </Link>
                    <button 
                      onClick={handleSignOut} 
                      className="w-full text-left block px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors border-t border-gray-100 cursor-pointer bg-transparent border-none"
                    >
                      SIGN OUT
                    </button>
                  </>
                ) : (
                  /* Show these options if the user IS NOT logged in */
                  <>
                    <Link to="/register" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#355872] hover:text-white font-bold transition-colors no-underline">
                      SIGN UP
                    </Link>
                    <Link to="/login" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#355872] hover:text-white font-bold transition-colors no-underline">
                      LOG IN
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto flex justify-center py-4">
          <ul className="flex space-x-6 md:space-x-16 text-[#000000] font-bold text-xs md:text-sm tracking-widest m-0 p-0 list-none">
            <li><a href="#top" className="hover:text-[#355872] transition-colors no-underline">HOME</a></li>
            <li><a href="#services-section" className="hover:text-[#355872] transition-colors no-underline">SERVICES</a></li>
            <li><a href="#contact-section" className="hover:text-[#355872] transition-colors no-underline">CONTACT</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Carousel Section */}
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#355872]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlay & Text */}
        <div className="absolute inset-0 bg-[#355872]/60 z-20"></div>
        <div className="relative z-30 text-center text-white px-4 flex flex-col items-center">
          <h1 className="font-['Georgia',serif] italic font-bold text-4xl md:text-6xl mb-6 tracking-wide drop-shadow-lg leading-tight">
            WELCOME TO OFFICE HUB
          </h1>
          <p className="font-['Georgia',serif] italic font-medium text-xl md:text-2xl drop-shadow-md bg-black/20 px-6 py-2 rounded-full inline-block">
            Discover Your Perfect Workspace
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section id="services-section" className="container mx-auto my-24 px-6 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="font-['Georgia',serif] italic font-bold text-4xl text-[#355872] mb-4">OUR SERVICES</h2>
          <div className="w-24 h-1 bg-[#4ADE80] mx-auto mb-4 rounded-full"></div>
          <p className="text-[#355872] text-lg font-medium">Tailored workspaces designed for your productivity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(53,88,114,0.15)] group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#355872] transition-colors duration-300 group-hover:bg-[#4ADE80]"></div>
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1 group-hover:text-[#4ADE80] transition-colors mt-2">Hot Desk</h3>
            <h6 className="text-gray-400 text-xs mb-4 uppercase tracking-widest font-bold">The Flexible Nomad</h6>
            <p className="font-bold text-[#355872] mb-4 text-lg">"Your Instant Workspace."</p>
            <p className="font-serif text-base leading-relaxed mb-6 flex-grow text-gray-600">Drop in, plug in, and get to work. Our Hot Desks offer ultimate flexibility for freelancers who need a professional environment without long-term commitment.</p>
            <p className="text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto"><strong>Best for:</strong> Digital nomads, students, and travelers.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(53,88,114,0.15)] group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#355872] transition-colors duration-300 group-hover:bg-[#4ADE80]"></div>
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1 group-hover:text-[#4ADE80] transition-colors mt-2">Dedicated Desk</h3>
            <h6 className="text-gray-400 text-xs mb-4 uppercase tracking-widest font-bold">The Professional Home</h6>
            <p className="font-bold text-[#355872] mb-4 text-lg">"Your Desk, Your Way."</p>
            <p className="font-serif text-base leading-relaxed mb-6 flex-grow text-gray-600">Stop searching for a spot and start building your routine. You get a reserved workstation that’s yours alone, featuring a secure locker and fixed address.</p>
            <p className="text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto"><strong>Best for:</strong> Solopreneurs and remote employees.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(53,88,114,0.15)] group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#355872] transition-colors duration-300 group-hover:bg-[#4ADE80]"></div>
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1 group-hover:text-[#4ADE80] transition-colors mt-2">Private Office</h3>
            <h6 className="text-gray-400 text-xs mb-4 uppercase tracking-widest font-bold">The Growth Hub</h6>
            <p className="font-bold text-[#355872] mb-4 text-lg">"Quiet Space for Big Ideas."</p>
            <p className="font-serif text-base leading-relaxed mb-6 flex-grow text-gray-600">Scale your business in a fully furnished, sound-proof suite for teams of 2 to 10. Includes 24/7 access and mail handling.</p>
            <p className="text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto"><strong>Best for:</strong> Startups and small agencies.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border-2 border-[#355872] rounded-[15px] p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(53,88,114,0.15)] group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#355872] transition-colors duration-300 group-hover:bg-[#4ADE80]"></div>
            <h3 className="font-['Georgia',serif] italic font-bold text-2xl text-[#355872] mb-1 group-hover:text-[#4ADE80] transition-colors mt-2">Meeting Rooms</h3>
            <h6 className="text-gray-400 text-xs mb-4 uppercase tracking-widest font-bold">The Collaboration Suite</h6>
            <p className="font-bold text-[#355872] mb-4 text-lg">"Meet, Pitch, and Present."</p>
            <p className="font-serif text-base leading-relaxed mb-6 flex-grow text-gray-600">Impress clients in tech-enabled spaces with 4K displays and high-end video gear. Catering options available upon request.</p>
            <p className="text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto"><strong>Best for:</strong> Client pitches and workshops.</p>
          </div>
        </div>
      </section>

      {/* Map Footer - Using a working Google Maps Embed for Angeles City */}
      <footer className="w-full border-t-4 border-[#355872]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15418.572183216171!2d120.5843!3d15.1385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f24eb14b9a3f%3A0x6b441dc41c59e728!2sAngeles%2C%20Pampanga%2C%20Philippines!5e0!3m2!1sen!2sus!4v1714580000000!5m2!1sen!2sus"
          className="w-full h-[450px] border-0 grayscale hover:grayscale-0 transition-all duration-700"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </footer>

      {/* Contact Footer */}
      <footer id="contact-section" className="bg-[#355872] text-white py-16 border-t-[10px] border-[#4ADE80]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            {/* Quick Links */}
            <div className="flex flex-col justify-center">
              <h3 className="uppercase font-bold text-3xl mb-4 tracking-wider flex items-center gap-3">
                <img src="Images/officehublogo.png" alt="logo" className="h-10 w-auto brightness-0 invert opacity-80" />
                OfficeHub 2026
              </h3>
              <p className="italic text-gray-300 max-w-md leading-relaxed text-lg">
                Find your perfect workspace with the world's No.1 marketplace: 
                35,000 properties, free expert help, best-price guaranteed.
              </p>
            </div>

            {/* Contact Details */}
            <div className="md:text-right flex flex-col justify-center">
              <h6 className="uppercase font-bold text-xl mb-5 text-[#4ADE80] tracking-widest">CONTACT INFO</h6>
              <address className="not-italic text-gray-300 leading-loose text-base">
                Saint Joseph Street, Angeles City, Pampanga 2009 Philippines<br />
                <a href="tel:0282711411" className="hover:text-white transition-colors text-gray-300 no-underline inline-block mt-2">(02) 8271 1411</a><br />
                <a href="https://office-hub.com" className="hover:text-white transition-colors text-gray-300 no-underline inline-block">office-hub.com</a><br />
                <a href="mailto:gphilipp@gmail.com" className="hover:text-white transition-colors text-gray-300 no-underline inline-block">gphilipp@gmail.com</a><br />
                <a href="tel:09083841752" className="hover:text-white transition-colors text-gray-300 no-underline inline-block font-bold">0908-384-1752</a>
              </address>
            </div>
          </div>

          <div className="text-center md:text-right text-gray-400 text-sm border-t border-white/10 pt-8 mt-4 font-medium tracking-wider">
            © 2026 OFFICE HUB COPYRIGHT. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;