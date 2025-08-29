import React from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
// COMPONENT
import Navbar from './component/Navbar';
import Hero from './component/Hero';

// pages
import About from './component/About';
import Whatsection from './component/Whatsection';
import Work from './component/Work';


const App = () => {
  return (
    <div>
      <HashRouter>
      <Routes>

       <Route path="/" element={
                <main >
                <Navbar/>
                <Hero/>
                <Whatsection/>
                <Work/>
                 
                </main>
                } />

<Route path="about" element={
                <main >
                  <Navbar/>
                {/* <Hero/> */}
                <About/>
                 
                </main>
                } />


                
              <Route path="*" element={<About />} />
                 
</Routes>
      </HashRouter>
     
    </div>
  );
};

export default App; 



