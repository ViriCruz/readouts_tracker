import { Link } from 'react-router-dom';
import React from 'react';

const SignInLinks = () => (
  <div className="container d-flex flex-column">
    <Link to="/" className="navbar-brand text-white font-weight-bold">Readouts Tracker</Link>
    <Link to="/signin" className="text-white">Login</Link>
  </div>
);

export default SignInLinks;
