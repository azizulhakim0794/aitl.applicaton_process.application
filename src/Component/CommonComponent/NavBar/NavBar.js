import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-light me-auto">
      <div className="container-fluid">
        <a className="navbar-brand mb-0 h1" >AITL</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse nav-right" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/addEmployee" >Add Employee</NavLink>
            </li>
            <li className="nav-item  me-4">
              <NavLink className="nav-link" to="/allEmployee" >All Employee</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar