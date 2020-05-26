import { Link } from 'react-router-dom'
import React from 'react'

export const SignInLinks = () => (
  <div className="container d-flex flex-column">
    <Link to="/" className="navbar-brand">Readouts Tracker</Link>
    <Link to="/signin">Login</Link>
  </div>
)