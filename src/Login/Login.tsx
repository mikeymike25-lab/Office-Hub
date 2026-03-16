import React, { useState } from 'react';
import './Login.css'; 

import { auth, googleProvider } from '../firebase'; 
// NEW: Import FacebookAuthProvider
import { signInWithPopup, signInWithEmailAndPassword, FacebookAuthProvider } from 'firebase/auth';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>(''); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleManualLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg(''); 

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      alert("Manual Login Successful!"); 
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg(''); 

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Success:", result.user);
      alert(`Welcome ${result.user.displayName}! Google Login Successful!`);
    } catch (error: any) {
      console.error("Error during Google Sign-in:", error);
      setErrorMsg("Google Sign-in failed. Please try again.");
    }
  };

  // NEW: Integrated Facebook Sign-In
  const handleFacebookSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Create the Facebook provider instance
    const facebookProvider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Sign-In Success:", result.user);
      alert(`Welcome ${result.user.displayName}! Facebook Login Successful!`);
    } catch (error: any) {
      console.error("Error during Facebook Sign-in:", error);
      // Handle specific Firebase Facebook errors (e.g., account exists with different credential)
      if (error.code === 'auth/account-exists-with-different-credential') {
        setErrorMsg("An account already exists with the same email address but different sign-in credentials.");
      } else {
        setErrorMsg("Facebook Sign-in failed. Please try again.");
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md">
        <a className="navbar-brand" href="/officehub">
          <img src="Images/officehublogo.png" alt="officehub" />
        </a>
        <a className="navbar-brand ml-auto" href="#">
          <img src="Images/userprofile.png" alt="userprofile" id="userprofile" />
        </a>
      </nav>

      <main>
        <div className="card">
          <div className="card-header">
            <h1>Log In</h1>
            <p>Welcome back — your workspace awaits.</p>
          </div>

          {errorMsg && (
            <div style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>
              {errorMsg}
            </div>
          )}

          <div className="field">
            <span className="field-icon">
              {/* SVG omitted for brevity, keep your existing SVG */}
            </span>
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              autoComplete="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <span className="field-icon">
               {/* SVG omitted for brevity, keep your existing SVG */}
            </span>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Password" 
              autoComplete="current-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="toggle-pw" onClick={togglePasswordVisibility} aria-label="Show/hide password">
               {/* SVG omitted for brevity, keep your existing SVG */}
            </button>
          </div>

          <div className="extras">
            <label className="remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          <button className="btn-login" onClick={handleManualLogin}>ENTER</button>

          <div className="divider"><span>Or log in with</span></div>

          <div className="social-row">
            {/* NEW: Attached handleFacebookSignIn to the Facebook button */}
            <a href="#" className="social-btn" onClick={handleFacebookSignIn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#7AAACE">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </a>
            <a href="#" className="social-btn" onClick={handleGoogleSignIn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              Google
            </a>
          </div>

          <p className="card-footer">
            Don't have an account? <a href="#">Sign up</a>
          </p>
          <button 
            type="button" 
            className="btn btn-danger" 
            style={{ width: '20%', marginLeft: '28%' }}
          >
            Cancel
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;