import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return(
    <nav className="navbar">
      <div className="container d-flex flex-column">
        <Link to="/" className="navbar-brand">Readouts Tracker</Link>
        <Link to="/signin">Login</Link>
        <Link to="/">Logout</Link>
        <Link to="/">Measurements</Link>
      </div>
    </nav>
  )
}

export default Navbar