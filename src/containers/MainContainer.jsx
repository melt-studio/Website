import React from 'react'
import { Routes, Route } from "react-router-dom";
import About from '../screens/About/About';
import Contact from '../screens/Contact/Contact';
import Home from '../screens/Home/Home';
// import Project from '../screens/Project/Project';
import ProjectFullPage from '../screens/Project/ProjectFullPage/ProjectFullPage';
import ProtectedPage from '../screens/ProtectedPage/ProtectedPage';
import TempLandingPage from '../screens/TempLandingPage/TempLandingPage';

export default function MainContainer(props) {
  // console.log('from Main Container', props.projects)
  return (
    <Routes>
    <Route path="/temporary-landing-page" element={<TempLandingPage />} />
    <Route path="/working-components" element={<ProtectedPage miscPageInfo={props.miscPageInfo} />} />
    <Route path="/contact" element={<Contact navTextColor={props.navTextColor} />} />
    <Route path="/about" element={<About aboutInfo={props.aboutInfo} navTextColor={props.navTextColor} />} />
    <Route path="/:id" element={<ProjectFullPage setBackgroundColor={props.setBackgroundColor} showHamburger={props.showHamburger} setShowHamburger={props.setShowHamburger} navTextColor={props.navTextColor} setNavColor={props.setNavColor} projects={props.projects} setVisible={props.setVisible}  />}  />
    <Route path="/" element={<Home clicks={props.clicks} setClicks={props.setClicks} fadeInText={props.fadeInText} setFadeInText={props.setFadeInText} setShowHamburger={props.setShowHamburger} mobileIntroLogo={props.mobileIntroLogo} setMobileIntroLogo={props.setMobileIntroLogo} backgroundColor={props.backgroundColor} setBackgroundColor={props.setBackgroundColor} scroll={props.scroll} showHamburger={props.showHamburger} navTextColor={props.navTextColor} projects={props.projects} setVisible={props.setVisible} setStickyIsVis={props.setStickyIsVis} />} />
    
    </Routes>
    ) 
  }
  // <Route path="/" element={ <TempLandingPage />}/>