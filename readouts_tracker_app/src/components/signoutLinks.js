import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const SignOutLinks = ({ handleLogout }) => (
  <div className="w-100">
    <ul className="d-flex flex-column mb-0">
      <li className="text-center py-2">
        <div tabIndex="0" role="button" aria-pressed="false" onKeyDown={handleLogout} onClick={handleLogout} className="text-white">Logout</div>
      </li>
      <li className="text-center py-2">
        <Link to="/measurements" className="text-white">Measurements</Link>
      </li>
    </ul>


  </div>
);

SignOutLinks.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
export default SignOutLinks;
