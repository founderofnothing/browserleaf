import React from 'react'
import myImage from "../../public/specialimg.png"; 
import './work.css'





const Work = () => {
  return (
    <div className='work-container'>
        <div className="work-lhs">
            <h1 className='work-title'>what is special </h1>
            <p className='work-para'>
                We specialize in front-end development with React and back-end 
            solutions using Node.js and MongoDB,
             delivering secure and efficient applications tailored to your business needs.
             </p>
             <p className='work-list'>Interactive design & modern UI/UX that engages your users.</p>
             <p className='work-list'>Reliable support & maintenance to ensure long-term success.</p>
             <p className='work-list'>Seamless integration across technologies for faster, smoother workflows.</p>
        </div>
        <div className="work-rhs">
        <img className='what-sec-bg' src={myImage} alt="Example" />
        </div>
    </div>
  )
}

export default Work
