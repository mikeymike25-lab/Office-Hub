import React, { useState } from 'react';
import './Login.css'; 

import { auth, googleProvider } from '../firebase'; 
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  // NEW: State to hold validation errors
  const [errorMsg, setErrorMsg] = useState<string>(''); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // NEW: Manual Login Validation & Execution
  const handleManualLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg(''); // Clear old errors

    // 1. Check if fields are empty
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    // 2. Check if email is valid format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // 3. Check password length (Firebase requires at least 6 characters)
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    // If it passes validation, try to log in!
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      // Redirect your user here (e.g., window.location.href = '/dashboard')
      alert("Manual Login Successful!"); 
    } catch (error: any) {
      // Catch Firebase errors (like wrong password or user not found)
      setErrorMsg(error.message);
    }
  };

  // NEW: Integrated Google Sign-In
  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg(''); // Clear old errors

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Success:", result.user);
      // Redirect your user here 
      alert(`Welcome ${result.user.displayName}! Google Login Successful!`);
    } catch (error: any) {
      console.error("Error during Google Sign-in:", error);
      setErrorMsg("Google Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      {/* NAV (Unchanged) */}
      <nav className="navbar navbar-expand-md">
        <a className="navbar-brand" href="/officehub">
          <img src="Images/officehublogo.png" alt="officehub" />
        </a>
        <a className="navbar-brand ml-auto" href="#">
          <img src="Images/userprofile.png" alt="userprofile" id="userprofile" />
        </a>
      </nav>

      {/* MAIN */}
      <main>
        <div className="card">

          {/* HEADER */}
          <div className="card-header">
            <h1>Log In</h1>
            <p>Welcome back — your workspace awaits.</p>
          </div>

          {/* NEW: Error Message Display */}
          {errorMsg && (
            <div style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>
              {errorMsg}
            </div>
          )}

          {/* EMAIL */}
          <div className="field">
            <span className="field-icon">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7l10 7 10-7" />
              </svg>
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

          {/* PASSWORD */}
          <div className="field">
            <span className="field-icon">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
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
              <svg id="eye-icon" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* EXTRAS */}
          <div className="extras">
            <label className="remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          {/* CTA: Now connected to handleManualLogin */}
          <button className="btn-login" onClick={handleManualLogin}>ENTER</button>

          {/* DIVIDER */}
          <div className="divider"><span>Or log in with</span></div>

          {/* SOCIAL */}
          <div className="social-row">
            <a href="#" className="social-btn">
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

          {/* FOOTER */}
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