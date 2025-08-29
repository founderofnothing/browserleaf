import React from 'react'
import './about.css'
import { NavLink } from 'react-router-dom'
const About = () => {
  return (
    <div className='error-conatiner'>
    <div className="errorpage"> under development</div>
      <NavLink className='not-found' to={'/'}>back</NavLink>
    </div>
  )
}

export default About
