import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure this path points to your firebase config file

const UserDashboard: React.FC = () => {
  // --- STATE MANAGEMENT ---
  
  // 1. Create a state to hold the form data
const [profileData, setProfileData] = useState({
  firstName: localStorage.getItem("profile_firstName") || "",
  lastName: localStorage.getItem("profile_lastName") || "",
  phone: localStorage.getItem("profile_phone") || "",
  birthdate: localStorage.getItem("profile_birthdate") || "",
});

// 1.5. This handles the typing in the modal inputs
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;
  setProfileData((prev) => ({
    ...prev,
    [id]: value,
  }));
};

// 2. This is the "saveProfile" function
const saveProfile = (e: React.FormEvent) => {
  e.preventDefault(); // Prevents the page from reloading

  // Save each piece of data to LocalStorage
  localStorage.setItem("profile_firstName", profileData.firstName);
  localStorage.setItem("profile_lastName", profileData.lastName);
  localStorage.setItem("profile_phone", profileData.phone);
  localStorage.setItem("profile_birthdate", profileData.birthdate);

  
  alert("Profile Updated Successfully!");
  setActiveModal(null); // Close the modal after saving
};
  // User State from Firebase
  const [user, setUser] = useState<any>(null);

  // Modal States
  const [activeModal, setActiveModal] = useState<'profile' | 'account' | 'signOut' | 'editProfile' | null>(null);

  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  // Profile Picture Upload States
  const [profileImage, setProfileImage] = useState<string>(
  localStorage.getItem("user_profile_pfp") || "Images/userprofile.png"
);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Listen for Firebase Auth state
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      
      // 1. Check if we have a CUSTOM photo in the "mailbox"
      const savedPhoto = localStorage.getItem("user_profile_pfp");
      
      if (savedPhoto) {
        // If a custom upload exists, use that!
        setProfileImage(savedPhoto);
      } else if (currentUser.photoURL) {
        // Otherwise, use the Google/Firebase photo
        setProfileImage(currentUser.photoURL);
      }
    }
  });
  return () => unsubscribe();
}, []);
  // --- HANDLERS ---

  const closeModal = () => {
    setActiveModal(null);
    setPreviewUrl(null); // Reset preview when closing modal
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSaveProfilePicture = () => {
  if (previewUrl) {
    setProfileImage(previewUrl);
    // CRITICAL: This key must be "user_profile_pfp"
    localStorage.setItem("user_profile_pfp", previewUrl); 
    alert('Profile picture updated successfully!');
    closeModal();
  }
};


  // Sign Out logic
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      closeModal();
      navigate('/'); // Kick them back to the landing page
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out.");
    }
  };

  return (
    // Applied background image to the main wrapper
    <div className="min-h-screen bg-[url('Images/Co-workingSpace.jpeg')] bg-cover bg-fixed flex flex-col">
      
      {/* --- NAVBAR --- */}
      {/* Updated to perfectly match the Landing Page alignment and 70px sizing */}
      <nav className="bg-[#355872] px-4 md:px-8 py-3 relative z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center h-[70px]">
          
          {/* Logo - Fixed alignment to center vertically */}
          <Link to="/" className="flex items-center h-full">
            <img 
              src="Images/officehublogo.png" 
              alt="officehub" 
              className="h-[60px] md:h-[70px] w-auto drop-shadow-sm object-contain" 
            />
          </Link>

          <h2 className="text-white font-bold m-0 text-xl md:text-2xl tracking-wide hidden sm:block">
            USER DASHBOARD
          </h2>

          {/* Profile Picture - Fixed alignment and sizing */}
         <div className="flex items-center justify-center">
      <img 
       src={profileImage} 
        alt="userprofile" 
      className="h-[60px] w-[60px] md:h-[55px] md:w-[55px] rounded-full object-cover shadow-sm border-2 border-white/20 bg-white" 
       />
      </div>
        </div>
      </nav>

      {/* --- MAIN DASHBOARD LAYOUT --- */}
      <div className="flex-1 flex flex-col lg:flex-row items-start bg-gradient-to-b from-[#35587226] to-[#f7f8f0bf] p-6 md:p-12 gap-8 w-full">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="flex-none w-full lg:w-[320px] bg-[#e7e6e6bf] rounded-2xl shadow-xl p-8 flex flex-col gap-8 backdrop-blur-sm border border-white/40">
            <div className="flex flex-col items-center text-center gap-4">
       {/* Now just a div container, no button/link around it */}
      <div 
     onClick={() => setActiveModal('profile')} // Opens the modal when clicking the circle
     className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#35587259] bg-[#ffffffd9] shadow-md transition-all hover:scale-105 hover:border-[#355872] cursor-pointer"
      title="Click to change photo"
      >
      <img 
       src={profileImage} 
       alt="User Profile" 
        className="w-full h-full object-cover block" 
  />
</div>
  
  <div>
    <h2 className="text-[1.7rem] font-bold m-0 text-[#1F2A37]">
      {user?.displayName || "Office Hub User"}
    </h2>
    <h6 className="text-[0.9rem] font-medium text-[#1F2A37]/70 mt-1">
      {user?.email || "YourEmail@gmail.com"}
    </h6>
  </div>
</div>

            <nav className="flex flex-col gap-3">
             
              <button className="py-3 px-4 rounded-xl text-left font-semibold text-[#1F2A37] bg-[#35587214] transition-colors hover:bg-[#35587240] hover:text-[#0B1B2A] border-none cursor-pointer" onClick={() => navigate('/services')}>
                Book Now
             </button>
              <button className="py-3 px-4 rounded-xl text-left font-semibold text-[#1F2A37] bg-[#35587214] transition-colors hover:bg-[#35587240] hover:text-[#0B1B2A] border-none cursor-pointer" onClick={() => setActiveModal('account')}>
                Change Account
              </button>
              <button className="py-3 px-4 rounded-xl text-left font-semibold text-[#1F2A37] bg-[#35587214] transition-colors hover:bg-[#35587240] hover:text-[#0B1B2A] border-none cursor-pointer" onClick={() => navigate('/service-details')}>
                About Services
              </button>
              <button className="py-3 px-4 rounded-xl text-left font-semibold text-[#1F2A37] bg-[#35587214] transition-colors hover:bg-[#35587240] hover:text-[#0B1B2A] border-none cursor-pointer" onClick={() => setActiveModal('signOut')}>
                Sign out
              </button>
            </nav>
          </aside>

         {/* Main Content (Edit Card) */}
<main className="flex-1 w-full flex items-start justify-center">
  <div className="w-full max-w-[860px] bg-[#e7e6e6bf] rounded-[1.4rem] shadow-2xl py-8 px-6 md:px-10 border border-[#35587229] backdrop-blur-sm">
    <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b-4 border-[#35587240] mb-8">
      <h1 className="text-2xl md:text-3xl font-extrabold m-0 text-[#1F2A37]">User Profile</h1>
      <button 
      type="button" // <--- Add this to prevent accidental form submission
        className="bg-[#355872] border-none text-white py-3 px-6 rounded-xl font-bold cursor-pointer transition-all hover:brightness-110 hover:-translate-y-0.5 shadow-md" 
        onClick={() => setActiveModal('editProfile')}
      >
        Edit Profile
      </button>
    </div>

    <form className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold text-[#22303F]">Username</label>
          <input 
            id="username" 
            type="text" 
            value={user?.displayName || "User-Name"} 
            readOnly 
            className="h-14 rounded-2xl border border-[#35587240] px-4 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80" 
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-[#22303F]">Email</label>
          <input 
            id="email" 
            type="email" 
            value={user?.email || "YourEmail@gmail.com"} 
            readOnly 
            className="h-14 rounded-2xl border border-[#35587240] px-4 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80" 
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="firstName" className="font-semibold text-[#22303F]">First Name</label>
          <input 
            id="firstName" 
            type="text" 
            value={profileData.firstName || "Not Set"} 
            readOnly 
            className="h-14 rounded-2xl border border-[#35587240] px-4 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80" 
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="lastName" className="font-semibold text-[#22303F]">Last Name</label>
          <input 
            id="lastName" 
            type="text" 
            value={profileData.lastName || "Not Set"} 
            readOnly 
            className="h-14 rounded-2xl border border-[#35587240] px-4 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80" 
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="birthdate" className="font-semibold text-[#22303F]">Birthdate</label>
          <input 
            id="birthdate" 
            type="text" 
            value={profileData.birthdate || "MM/DD/YYYY"} 
            readOnly 
            className="h-14 rounded-2xl border border-[#35587240] px-4 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80" 
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="phone" className="font-semibold text-[#22303F]">Phone Number</label>
          <input 
            id="phone" 
            type="tel" 
            value={profileData.phone || "0912-345-6789"} 
            readOnly 
            className="h-14 rounded-2xl border border-[#35587240] px-4 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80" 
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-[#22303F]">Password</label>
          <div className="relative w-full">
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              value="***************" 
              readOnly 
              className="h-14 rounded-2xl border border-[#35587240] px-4 pr-12 text-base bg-white/80 text-[#1F2A37] w-full focus:outline-none cursor-not-allowed opacity-80 tracking-widest"
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#1F2A37]/60 text-lg hover:text-[#1F2A37] hover:scale-110 transition-all`} 
              onClick={() => setShowPassword(!showPassword)}
              title="Show/hide password"
            ></i>
          </div>
        </div>
      </div>
    </form>
  </div>
</main>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Profile Picture Modal */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-[500px] text-center relative shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <span className="absolute right-5 top-4 text-gray-400 hover:text-gray-800 text-3xl font-bold cursor-pointer transition-colors" onClick={closeModal}>&times;</span>
            
            <div className="bg-[#355872] py-4 px-6 rounded-lg border-2 border-[#1e3241] flex justify-center items-center mb-6">
              <h2 className="text-white font-bold text-xl m-0">Change Profile Picture</h2>
            </div>
            
            {!previewUrl ? (
              <div 
                className={`border-2 border-dashed rounded-xl p-10 mt-5 cursor-pointer transition-colors duration-200 ${isDragging ? 'border-[#355872] bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-[#355872] hover:bg-gray-100'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-gray-600 m-0 text-lg">Drag & drop an image here or <span className="text-[#355872] underline font-medium">browse</span></p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileInput}
                />
              </div>
            ) : (
              <div className="mt-6 flex justify-center">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-[250px] rounded-xl shadow-md border border-gray-200" />
              </div>
            )}

            <div className="flex justify-center gap-4 mt-8">
              <button className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-6 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer border-none" onClick={() => setPreviewUrl(null)}>Revert Changes</button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-6 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer border-none" onClick={handleSaveProfilePicture}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

     {/* 2. Change Account Modal */}
{activeModal === 'account' && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
    <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-[450px] text-center relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
      
      {/* FIXED: Changed top-4 to top-2 and right-5 to right-4 to pull it away from the blue header */}
      <span 
        className="absolute right-4 top-2 text-gray-400 hover:text-gray-800 text-3xl font-bold cursor-pointer transition-colors z-10" 
        onClick={closeModal}
      >
        &times;
      </span>
      
      {/* Header Container */}
      <div className="bg-[#355872] py-4 px-6 rounded-lg border-2 border-[#1e3241] flex justify-center items-center mb-6 mt-4"> 
        {/* Added mt-4 above to give the close button more "breathing room" */}
        <h2 className="text-white font-bold text-xl m-0">Change Account</h2>
      </div>
      
      <p className="text-gray-700 mb-6 text-lg">Choose an option below:</p>
      <div className="flex flex-col gap-4">
        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors shadow-sm no-underline block">Create New Account</Link>
        <button className="bg-gray-500 hover:bg-gray-600 border-none text-white py-3 px-6 rounded-lg font-bold transition-colors shadow-sm cursor-pointer">Select Existing Account</button>
      </div>
    </div>
  </div>
)}

      {/* 3. Sign Out Modal */}
      {activeModal === 'signOut' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-[450px] text-center relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#355872] py-4 px-6 rounded-lg border-2 border-[#1e3241] flex justify-center items-center mb-6">
              <h2 className="text-white font-bold text-xl m-0">Sign Out</h2>
            </div>
            
            <p className="text-gray-800 text-lg font-medium mt-2">Are you sure you want to sign out?</p>
            
            <div className="flex justify-center my-6">
              <img src="Images/SignOutWarningImg.jpg" alt="Sign Out Warning" className="w-[120px] rounded-lg shadow-sm border border-gray-100" />
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <button className="bg-red-500 hover:bg-red-600 border-none text-white py-2.5 px-8 rounded-lg font-bold transition-colors shadow-sm cursor-pointer" onClick={handleSignOut}>Yes, Sign Out</button>
              <button className="bg-gray-500 hover:bg-gray-600 border-none text-white py-2.5 px-8 rounded-lg font-bold transition-colors shadow-sm cursor-pointer" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Profile Modal */}
{activeModal === 'editProfile' && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
    <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-[700px] text-center relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="bg-[#355872] py-4 px-6 rounded-lg border-2 border-[#1e3241] flex justify-center items-center mb-6">
        <h2 className="text-white font-bold text-xl m-0">Edit Profile Details</h2>
      </div>
      
      <form className="flex flex-col gap-5 text-left mt-2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-semibold text-[#22303F]">First Name</label>
            <input 
              id="firstName"
              type="text" 
              value={profileData.firstName}
              onChange={handleInputChange}
              placeholder="First-Name" 
              className="h-12 rounded-xl border border-gray-300 px-4 text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355872] transition-all w-full" 
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-semibold text-[#22303F]">Last Name</label>
            <input 
              id="lastName"
              type="text" 
              value={profileData.lastName}
              onChange={handleInputChange}
              placeholder="Last-Name" 
              className="h-12 rounded-xl border border-gray-300 px-4 text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355872] transition-all w-full" 
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-semibold text-[#22303F]">Birthdate</label>
            <input 
              id="birthdate"
              type="date" 
              value={profileData.birthdate}
              onChange={handleInputChange}
              className="h-12 rounded-xl border border-gray-300 px-4 text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355872] transition-all w-full" 
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-semibold text-[#22303F]">Phone Number</label>
            <input 
              id="phone"
              type="tel" 
              value={profileData.phone}
              onChange={handleInputChange}
              placeholder="0912-345-6789" 
              className="h-12 rounded-xl border border-gray-300 px-4 text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355872] transition-all w-full" 
            />
          </div>
        </div>
      </form>
      
      <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
        <button className="bg-gray-200 hover:bg-gray-300 border-none text-gray-800 py-3 px-8 rounded-xl font-bold transition-colors cursor-pointer" onClick={closeModal}>Cancel</button>
        {/* Call saveProfile here */}
        <button 
          className="bg-[#355872] hover:brightness-110 border-none text-white py-3 px-8 rounded-xl font-bold transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
          onClick={saveProfile}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserDashboard;