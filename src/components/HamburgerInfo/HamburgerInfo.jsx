import React from 'react'
import "./HamburgerInfo.css"
import { Link } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

export default function HamburgerInfo(props) {
 const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  return (
    <div className='hamburger-info__container'>

     
      <div className='hamburger-info__mobile-smaller'>
        <Fade
          keyframes={customAnimation}
          direction="up"
          delay={1000}
          duration={800}
          triggerOnce={true}
          // fraction={.4}
          cascade
        >
        <NavHashLink
        style={{textDecoration:'none'}}
        onClick={props.HamburgerMenuLinkClickWork}
        smooth to="/#projects"
        >
        <p className='hamburger-info__link '>Work</p>
        </NavHashLink>
        </Fade>
        
        <Fade
          keyframes={customAnimation}
          direction="up"
          delay={1100}
          duration={800}
          triggerOnce={true}
          // fraction={.4}
          cascade
        >
        <Link style={{textDecoration:'none'}} to="/about" onClick={props.HamburgerMenuLinkClickAbout}>
        <p className='hamburger-info__link '>About Us</p>
          </Link>
          </Fade>
          <Fade
          keyframes={customAnimation}
          direction="up"
          delay={1150}
          duration={800}
          triggerOnce={true}
          // fraction={.4}
          cascade
        >
        <a  style={{textDecoration:'none'}} href="mailto:hello@melt.works">
        <p  className='hamburger-info__link '>Say Hello</p>
          </a>
          </Fade>
          <Fade
          keyframes={customAnimation}
          direction="up"
          delay={1200}
          duration={800}
          triggerOnce={true}
          // fraction={.4}
          cascade
        >
          <a style={{textDecoration:'none'}} href="https://www.instagram.com/mellllllllllt/" target="_blank" rel="noreferrer">
          <p className='hamburger-info__link '>Follow</p>
          </a>
          </Fade>
         
         
        </div>
     
    </div>
  )
}






// <Fade
// keyframes={customAnimation}
// direction="up"
// delay={1250}
// duration={800}
// triggerOnce={true}
// // fraction={.4}
// cascade
// >
// <a style={{textDecoration:'none'}} href="tel:3479460249" title="347.946.0249">
// <p className='hamburger-info__link underline'>P/ 347.289.7129</p>
// </a>
// </Fade>