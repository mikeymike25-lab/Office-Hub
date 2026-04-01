import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; 
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

const SignUp: React.FC = () => {
  // State Management
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(''); 
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleManualSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg(''); 

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      // Create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Immediately update their profile with their full name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });

      console.log("Registered user:", userCredential.user);
      
      // Redirect to dashboard upon successful registration
      navigate('/dashboard'); 
    } catch (error: any) {
      // Handle specific Firebase errors to make them user-friendly
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("This email is already registered. Please log in.");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  const handleGoogleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg(''); 

    if (!agreedToTerms) {
      setErrorMsg("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-Up Success:", result.user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error during Google Sign-up:", error);
      setErrorMsg("Google Sign-up failed. Please try again.");
    }
  };

  const handleFacebookSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!agreedToTerms) {
      setErrorMsg("You must agree to the Terms & Conditions.");
      return;
    }

    const facebookProvider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Sign-Up Success:", result.user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error during Facebook Sign-up:", error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setErrorMsg("An account already exists with the same email but different credentials.");
      } else {
        setErrorMsg("Facebook Sign-up failed. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Custom Keyframes for Card Animation */}
      <style>
        {`
          @keyframes floatIn {
            from { opacity: 0; transform: translateY(28px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float-in {
            animation: floatIn .55s cubic-bezier(.22, 1, .36, 1) both;
          }
        `}
      </style>

      {/* Main Layout Wrapper */}
      <div className="min-h-screen font-sans bg-[#355872] flex flex-col">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center p-2 px-8 bg-[#355872] bg-cover shadow-sm">
          <Link className="font-bold text-white cursor-pointer" to="/">
            <img src="Images/officehublogo.png" alt="officehub" className="h-[70px] w-auto drop-shadow-sm" />
          </Link>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(122,170,206,.22)_0%,transparent_70%),#355872]">
          
          {/* Card */}
          <div className="relative w-full max-w-[440px] bg-[#F7F8F0]/5 backdrop-blur-[18px] border border-[#9CD5FF]/20 rounded-[24px] px-8 md:px-10 pt-11 pb-10 shadow-[inset_0_0_0_1px_rgba(154,213,255,.05),0_32px_64px_rgba(0,0,0,.35),0_8px_16px_rgba(0,0,0,.2)] animate-float-in">
            
            {/* Back Arrow Button */}
            <Link 
              to="/" 
              className="absolute top-6 left-6 text-[#9CD5FF]/60 hover:text-white transition-colors duration-200"
              aria-label="Go back"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </Link>

            <div className="text-center mb-8">
              <h1 className="font-['Syne',sans-serif] text-[1.75rem] font-extrabold text-[#F7F8F0] tracking-[-.5px] mt-2">Create Account</h1>
              <p className="mt-1.5 text-[.83rem] text-[#9CD5FF]/65 font-light">Join our community of professionals.</p>
            </div>

            {errorMsg && (
              <div className="text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-sm text-center mb-5 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Full Name Field */}
            <div className="relative mb-4">
              <span className="absolute left-[.95rem] top-1/2 -translate-y-1/2 text-[#7AAACE] pointer-events-none flex">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full py-[.85rem] pr-[1rem] pl-[2.75rem] bg-[#F7F8F0]/5 border-[1.5px] border-[#9CD5FF]/20 rounded-xl text-[#F7F8F0] font-sans text-[.9rem] outline-none transition-colors duration-200 placeholder:text-[#F7F8F0]/35 placeholder:text-[.85rem] placeholder:tracking-wide focus:border-[#9CD5FF] focus:bg-[#9CD5FF]/10"
              />
            </div>

            {/* Email Field */}
            <div className="relative mb-4">
              <span className="absolute left-[.95rem] top-1/2 -translate-y-1/2 text-[#7AAACE] pointer-events-none flex">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-[.85rem] pr-[1rem] pl-[2.75rem] bg-[#F7F8F0]/5 border-[1.5px] border-[#9CD5FF]/20 rounded-xl text-[#F7F8F0] font-sans text-[.9rem] outline-none transition-colors duration-200 placeholder:text-[#F7F8F0]/35 placeholder:text-[.85rem] placeholder:tracking-wide focus:border-[#9CD5FF] focus:bg-[#9CD5FF]/10"
              />
            </div>

            {/* Password Field */}
            <div className="relative mb-4">
              <span className="absolute left-[.95rem] top-1/2 -translate-y-1/2 text-[#7AAACE] pointer-events-none flex">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-[.85rem] pr-[2.8rem] pl-[2.75rem] bg-[#F7F8F0]/5 border-[1.5px] border-[#9CD5FF]/20 rounded-xl text-[#F7F8F0] font-sans text-[.9rem] outline-none transition-colors duration-200 placeholder:text-[#F7F8F0]/35 placeholder:text-[.85rem] placeholder:tracking-wide focus:border-[#9CD5FF] focus:bg-[#9CD5FF]/10"
              />
              <button 
                className="absolute right-[.95rem] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#9CD5FF]/50 flex p-0 transition-colors duration-200 hover:text-[#9CD5FF]" 
                onClick={togglePasswordVisibility} 
                type="button"
              >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-5">
              <span className="absolute left-[.95rem] top-1/2 -translate-y-1/2 text-[#7AAACE] pointer-events-none flex">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-[.85rem] pr-[1rem] pl-[2.75rem] bg-[#F7F8F0]/5 border-[1.5px] border-[#9CD5FF]/20 rounded-xl text-[#F7F8F0] font-sans text-[.9rem] outline-none transition-colors duration-200 placeholder:text-[#F7F8F0]/35 placeholder:text-[.85rem] placeholder:tracking-wide focus:border-[#9CD5FF] focus:bg-[#9CD5FF]/10"
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center mb-6 text-[.8rem]">
              <label className="flex items-center gap-2 text-[#F7F8F0]/50 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="accent-[#4ADE80] w-[14px] h-[14px] cursor-pointer" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                /> 
                <span>I agree to the <a href="#" className="text-[#9CD5FF] hover:text-white transition-colors">Terms & Conditions</a></span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button 
              className="w-full p-3.5 bg-[#4ADE80] border-none rounded-xl text-[#0f2e1a] font-['Syne',sans-serif] text-base font-extrabold tracking-wide cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(74,222,128,.3)] hover:bg-[#22c55e] hover:-translate-y-[1px] hover:shadow-[0_8px_28px_rgba(74,222,128,.4)] active:translate-y-0" 
              onClick={handleManualSignUp}
            >
              CREATE ACCOUNT
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6 before:content-[''] before:flex-1 before:h-[1px] before:bg-[#9CD5FF]/15 after:content-[''] after:flex-1 after:h-[1px] after:bg-[#9CD5FF]/15">
              <span className="text-xs text-[#F7F8F0]/35 whitespace-nowrap">Or sign up with</span>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 justify-center">
              <button className="flex-1 flex items-center justify-center gap-2 p-[.7rem] bg-[#F7F8F0]/5 border-[1.5px] border-[#9CD5FF]/15 rounded-[11px] text-[#F7F8F0]/65 font-sans text-[.8rem] font-medium cursor-pointer transition-all duration-200 hover:bg-[#9CD5FF]/10 hover:border-[#9CD5FF]/30 hover:text-[#F7F8F0]" onClick={handleFacebookSignUp}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#7AAACE">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-[.7rem] bg-[#F7F8F0]/5 border-[1.5px] border-[#9CD5FF]/15 rounded-[11px] text-[#F7F8F0]/65 font-sans text-[.8rem] font-medium cursor-pointer transition-all duration-200 hover:bg-[#9CD5FF]/10 hover:border-[#9CD5FF]/30 hover:text-[#F7F8F0]" onClick={handleGoogleSignUp}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Google
              </button>
            </div>

            {/* Footer Links */}
            <p className="text-center mt-7 text-[.82rem] text-[#F7F8F0]/40">
              Already have an account? <Link to="/login" className="text-[#9CD5FF] no-underline font-medium transition-colors hover:text-white">Log in</Link>
            </p>
            
          </div>
        </main>
      </div>
    </>
  );
};

export default SignUp;