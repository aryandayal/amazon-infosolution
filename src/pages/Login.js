import React, { useState } from 'react';
import './login.css';
import Logo from '../assets/logos.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login Submitted');
    }, 1500);
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Blue Section */}
        <div className="login-blue">
          <img src={Logo} alt="Logo" className="login-logo" />
          <h2 className="login-title">Amazon Infosolution</h2>
          <p className="login-desc">Advanced GPS Location Monitoring System</p>
        </div>
        
        {/* Login Form Section */}
        <div className="login-form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <h3>User Login</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <span className="login-helper">Login to continue.</span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;