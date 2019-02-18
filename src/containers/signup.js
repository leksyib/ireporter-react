import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='boxes'>
      <div className='welcome-box'>
        <h1 className='welcome'> Welcome to iReporter!</h1>
      </div>
      <form className="login-box">
        <h2> Sign Up </h2>
        <input 
          type="email"
          placeholder="Email"
          required
        />
        <input 
          type="tel"
          placeholder="Phone"
          required
        />
        <input
          type="password"
          placeholder="Password"
          required
        />
        <div className="btns">
          <button
            className="auth-button"
          >
            <h3 className="signin-txt"> sign Up </h3>
          </button>
        </div>
        <div className="socials">
          <p>Already have an account? <Link to='/signin'> Sign In </Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
