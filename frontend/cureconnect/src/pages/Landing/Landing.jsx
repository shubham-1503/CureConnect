import React from 'react'
import LandingNavbar from './LandingNavbar'
import MainContent from './MainContent'
import Analytics from './Analytics'
import Features from './Features'
import Testimonial from './Testimonial'
import Footer from './Footer'


function Landing() {
  
  return (
    <div className=' bg-primaryColor'>
      <LandingNavbar location={"home"} />
      <MainContent />
      <Analytics />
      <Features />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Landing;
