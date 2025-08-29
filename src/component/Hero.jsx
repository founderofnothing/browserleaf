import React from 'react'
import Herosphere from './herosphere'
import Carosal from './Carosal'

import'./hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Background 3D */}
      <div className="hero-background">
        <Herosphere />
      </div>

      {/* Overlay content */}
      <div className="hero-content">
        <h1 className="title">Where Ideas Hatch </h1>
        <h1 className="title2">Into Stunning Websites</h1>
       

      </div>
      <div className="tagbox">
          <p className='paratag'>From first sketch to live site — all in one place.</p>
          <div className="cta-container">
          <p className='cta1'>lets chat</p>
          <p className='cta2'>more</p>
          </div>

        </div>
        <div className="c-container">
          <Carosal/>

        </div>
    </div>
  )
}

export default Hero

