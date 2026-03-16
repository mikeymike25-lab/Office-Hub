import React from 'react';
import Login from './Login/Login'; // Make sure this path matches your folder structure!

const App: React.FC = () => {
  return (
    <div>
      {/* This renders your Login page to the screen */}
      <Login /> 
    </div>
  );
};

export default App;