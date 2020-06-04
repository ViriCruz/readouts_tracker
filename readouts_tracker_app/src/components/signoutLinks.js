import { Link } from 'react-router-dom'
import React from 'react'

export const SignOutLinks = ({ handleLogout }) => (
  <div className="w-100">
    <ul className="d-flex flex-column mb-0">
      <li className="text-center py-2">
        <a href="#" onClick={handleLogout} className="text-white">Logout</a>
      </li>
      <li className="text-center py-2">
        <Link to="/measurements" className="text-white">Measurements</Link>
      </li>
    </ul>
    
    
  </div>
)