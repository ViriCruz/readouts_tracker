import { Link } from 'react-router-dom'
import React from 'react'

export const SignOutLinks = ({ handleLogout }) => (
  <div className="container d-flex flex-column">
    <a href="#" onClick={handleLogout}>Logout</a>
    <Link to="/">Measurements</Link>
  </div>
)