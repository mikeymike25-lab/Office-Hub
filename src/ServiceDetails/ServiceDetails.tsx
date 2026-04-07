import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth"; // Fixed: User is a Type
import { auth } from '../firebase'; 
import "./ServiceDetails.css";

const ServiceDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("offers");
  const [user, setUser] = useState<User | null>(null);
  
  // MATCHING DASHBOARD LOGIC: Get the saved pfp or fallback to default
  const [profileImage, setProfileImage] = useState<string>(
    localStorage.getItem("user_profile_pfp") || "Images/userprofile.png"
  );
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // SYNC WITH DASHBOARD: Check localStorage first, then Firebase
        const savedPhoto = localStorage.getItem("user_profile_pfp");
        
        if (savedPhoto) {
          setProfileImage(savedPhoto);
        } else if (currentUser.photoURL) {
          setProfileImage(currentUser.photoURL);
        }
      } else {
        // If no user is logged in, send them to login (Safety check)
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]); // Added navigate here to clear the "yellow" warning
  

  const backgroundStyle = {
    backgroundImage: "url('/Images/Co-workingSpace.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const renderTab = () => {
    switch (activeTab) {
      case "offers":
        return (
          <div className="tab-pane fade show active">
            <h3 className="tab-pane-header">Service Offers</h3>
            <h5><strong>Here are the services we offer:</strong></h5>
            <ul>
              <li>Office Space Rental</li>
              <li>Meeting Room Bookings</li>
              <li>Virtual Office Services</li>
              <li>Mail Handling</li>
              <li>Administrative Support</li>
            </ul>
            <br />
            <br />
            <p><strong>Contact us for more details on pricing and availability.</strong></p>
          </div>
        );
      case "policies":
        return (
          <div className="tab-pane fade show active">
            <h3 className="tab-pane-header">Website Policies</h3>
            <h5><strong>Confidentiality Agreements:</strong></h5>
            <h5>
                All members must sign a confidentiality agreement before accessing any proprietary information.
            </h5>
             <br />
            <h5><strong>Payment Terms:</strong></h5>
            <ul>
              <li>Payments must be made in advance for all services.</li>
              <li>
                We accept credit cards, bank transfers, e-cash, and cash payments.
                (ie. GCash, MasterCard, BPI, BDO)
              </li>
            </ul>

            <h5>Cancellation and Refund Policies:

            </h5>
            <ul>
              <li>
                Cancellations made more than 24 hours before the scheduled time
                will be eligible for a full refund.
              </li>
              <li>
                Cancellations made within 24 hours of the scheduled time will not
                be eligible for a refund.
              </li>
            </ul>
          </div>
        );
      case "guidelines":
        return (
          <div className="tab-pane fade show active">
            <h3 className="tab-pane-header">Guidelines</h3>
            <h5><strong>Please follow these guidelines while using our facilities:</strong></h5>
            <ul>
              <li>No smoking policy</li>
              <li>Keep common areas clean</li>
              <li>Book resources in advance</li>
              <li>Report any issues promptly</li>
              <li>Use equipment responsibly</li>
            </ul>
          </div>
        );
      case "contact":
        return (
          <div className="tab-pane fade show active">
            <h3 className="tab-pane-header">Contact Information</h3>
            <h5><strong>Get in touch with us:</strong></h5>
            <p>
              <strong>Address:</strong> Saint Joseph Street, Angeles City,
              Pampanga 2009 Philippines
            </p>
            <p>
              <strong>Phone:</strong> (02) 8271 1411
            </p>
            <p>
              <strong>Email:</strong> office-hub@gmail.com
            </p>
            <p>
              <strong>Additional:</strong> 4HMP+WV Angeles City, Pampanga,
              mtlim@gmail.com, 0908-384-1752
            </p>
          </div>
        );
      case "faq":
        return (
          <div className="tab-pane fade show active">
            <h3 className="tab-pane-header">Frequently Asked Questions</h3>
            <p>
              <strong>Q: How do I book a meeting room?</strong>
            </p>
            <p>
              A: You can book through our online portal or contact our admin team.
            </p>
            <p>
              <strong>Q: What are the available hours?</strong>
            </p>
            <p>A: We are open from Monday to Saturday, 8 AM-7 PM.</p>
            <p>
              <strong>Q: Is parking available?</strong>
            </p>
            <p>A: Yes, we have on-site parking for members.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
  <div className="min-h-screen w-full bg-[url('/Images/Co-workingSpace.jpeg')] bg-cover bg-center bg-fixed bg-no-repeat flex flex-col font-sans">
       {/* --- NAVBAR --- */}
      <nav className="bg-[#355872] px-4 md:px-8 py-3 relative z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center h-[70px]">
          
          <Link to="/dashboard" className="flex items-center h-full">
            <img 
              src="Images/officehublogo.png" 
              alt="officehub" 
              className="h-[60px] md:h-[70px] w-auto drop-shadow-sm object-contain" 
            />
          </Link>

          <h2 className="text-white font-bold m-0 text-xl md:text-2xl tracking-wide hidden sm:block">
            SERVICE DETAILS
          </h2>

          <div className="flex items-center justify-center">
            <Link to="/dashboard">
            <img 
              src={profileImage} 
              alt="userprofile" 
              className="h-[60px] w-[60px] md:h-[55px] md:w-[55px] rounded-full object-cover shadow-sm border-2 border-white/20 bg-white" 
            />
            </Link>
          </div>
        </div>
      </nav>  

    
     
      {/* --- CONTENT WRAPPER --- */}
{/* 1. Removed flex-grow so it doesn't force full-screen height */}
{/* 2. Added pt-4 to keep it very close to the navbar */}
<div className="flex justify-center pt-4 p-4">
  <div className="container mx-auto max-w-4xl"> {/* Switched to max-w-4xl to make it even narrower */}
    <div className="row g-3 justify-content-center items-start">

      {/* Sidebar */}
      <div className="col-md-3">
        {/* Added shadow and rounded corners to match the Dashboard style */}
        <div className="service-details-nav shadow-xl rounded-2xl bg-white/90 backdrop-blur-sm">
          <div className="nav flex-column nav-pills p-3">
            <button
              className={`nav-link mb-2 rounded-lg ${activeTab === "offers" ? "active" : ""}`}
              onClick={() => setActiveTab("offers")}
            >
              Service Offers
            </button>
            <button
              className={`nav-link mb-2 rounded-lg ${activeTab === "policies" ? "active" : ""}`}
              onClick={() => setActiveTab("policies")}
            >
              Website Policies
            </button>
            <button
              className={`nav-link mb-2 rounded-lg ${activeTab === "guidelines" ? "active" : ""}`}
              onClick={() => setActiveTab("guidelines")}
            >
              Guidelines
            </button>
            <button
              className={`nav-link mb-2 rounded-lg ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              Contact Info
            </button>
            <button
              className={`nav-link rounded-lg ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="col-md-8">
        <div className="tab-content shadow-xl rounded-2xl bg-white/95 backdrop-blur-sm min-h-[500px]">
          {renderTab()}
        </div>
      </div>
        </div>
      </div>
    </div>

    

     
      
    </div>
  );
};

export default ServiceDetails;