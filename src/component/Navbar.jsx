import React, { useState } from 'react';
import { Link ,NavLink} from 'react-router-dom';
import logo from "../../public/agancylogo.svg"; 
import './navbar.css'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='nav_container'>
        {/* left side of navbar */}
      <div className="nav_lhs">
      <img src={logo} alt="Logo" />
      <h1 className='mob-domain-name'>ps</h1>
      <h1 className='domain_name'>prasanna</h1>
      </div>
{/* rght side of the nav */}

{!menuOpen && (
    <svg   className="ham-icon" onClick={() => setMenuOpen(true)} xmlns="http://www.w3.org/2000/svg"  viewBox="-5 -7 24 24">
        <path fill="#000" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"></path>
            </svg>
  )}


<div className={`nav_rhs ${menuOpen ? "show" : "hide"}`}>
  {/* Show Ham only if menu is closed */}

  {/* Show Cancel only if menu is open */}
    {menuOpen && (
<svg    className="cancel-icon" onClick={() => setMenuOpen(false)}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
  )} 
         <NavLink to={'/'} className='menu-list'>home</NavLink>
        <NavLink  to={"*"} className='menu-list'>about</NavLink>
        <NavLink to={'*'} className='menu-list'>Projects</NavLink>
        <NavLink to={'*'} className='menu-list'>contact</NavLink>
    </div>
     
    </div>
  )
}

export default Navbar
