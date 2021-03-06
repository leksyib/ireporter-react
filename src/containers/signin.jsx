/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { successToast, failureToast } from '../actions/toast';
import { signinUser } from '../actions/auth';
import Spinner from '../components/spinner';
import 'react-toastify/dist/ReactToastify.css';

const fields = [
  { name: 'username', placeholder: 'username', type: 'text' },
  { name: 'password', placeholder: 'password', type: 'password' },
];

const Signin = (props) => {
  const [userData, setUserData] = useState({
    username: null,
    password: null,
  });

  const [loading, setLoading] = useState(false);

  const updateInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const completeSignin = () => {
    props.signinUser(userData).then((res) => {
      const { error, isadmin } = res;
      if (error) {
        setLoading(false);
        if (Array.isArray(error)) {
          return error.forEach(err => props.failureToast(err));
        }
        return props.failureToast(error);
      }
      if (isadmin) {
        return props.history.push('/admin');
      }
      return props.history.push('/profile');
    });
  };

  const validateUserData = (e) => {
    e.preventDefault();
    setLoading(true);
    const fieldsArr = Object.entries(userData);
    const errors = [];
    fieldsArr.forEach((field) => {
      if (!field[1]) {
        errors.push(`${field[0]} is required.`);
        props.failureToast(`${field[0]} is required.`);
      }
    });
    return errors.length < 1 ? completeSignin() : setLoading(false);
  };


  return (
    <div className="boxes">
      <div className="welcome-box">
        <h1 className="welcome"> Welcome to iReporter!</h1>
      </div>
      <ToastContainer autoClose={5000} />
      <form className="login-box">
        <h2> Sign In </h2>
        {
            fields.map(field => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                onChange={updateInput}
              />
            ))
          }
        <div className="btns">
          <button
              className="auth-button"
              onClick={e => validateUserData(e)}
              disabled={loading}
            >
            {
                loading ? <Spinner loading={loading} /> : <h3 className="signin-txt"> sign In </h3>
              }
          </button>
        </div>
        <div className="socials">
          <p>
            New here?
            <Link to="/signup"> Sign Up </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

Signin.propTypes = {
  signinUser: PropTypes.func.isRequired,
  failureToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(() => ({}), { successToast, failureToast, signinUser })(Signin);
