import { Link } from 'react-router-dom';
import React from 'react';

const SignInLinks = () => (
  <div className="w-100">
    <ul className="d-flex flex-column mb-0">
      <li className="text-center py-2">
        <Link to="/" className="navbar-brand text-white font-weight-bold">Readouts Tracker</Link>
      </li>
      <li className="text-center py-2">
        <Link to="/signin" className="text-white">Login</Link>
      </li>
    </ul>
  </div>
);

export default SignInLinks;
