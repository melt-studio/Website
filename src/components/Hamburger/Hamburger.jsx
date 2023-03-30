import React, { useState, useEffect } from "react";
import "./Hamburger.css";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
// import Logo from "../../assets/DevelopmentAssets/LogoKnockout.png"
// import { useNavigate } from 'react-router-dom';

import MeltLogo from "../../assets/images/Logo/MELT_LOGO WHT_SM.png";

// import Smiley from "../../assets/DevelopmentAssets/MELT_LOGO_WHT_SM.svg"
// import { Fade } from "react-awesome-reveal";
// window.onscroll = function() {
//   var theta = document.documentElement.scrollTop / 2 % Math.PI;

// document.getElementById('scroll-image').style.transform ='rotate(' + theta + 'rad)';
// }

// window.onscroll = function () {
//   scrollRotate();
// };

// function scrollRotate() {
//   let image = document.getElementById("scroll-image");
//   image.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
// }

export default function Hamburger(props) {
  // const navigate = useNavigate();
  // const HomeClick = () => {
  //   navigate("/")
  //   props.setIsVis("hamburger-menu-not-visible")
  //     document.body.style.background = "#000000"
  //     window.scrollTo(0, 0);
  //   window.scrollBy(0, 0);
  //   props.setShowHamburger("hamburger__holder hidden")
  //   setTimeout(() => {
  //     props.setShowHamburger("hamburger__holder hidden")
  //   }, 1000);
  // }
  // const [meltoLogoStyle, setMeltLogoStyle] = useState("logo__mobile-nav__container");
  // useEffect(() => {
  //   if (window.innerWidth < 850) {
  //     if (window.location.pathname === "/about")
  //       if (props.showHamburger === "hamburger__holder hidden") {
  //         setTimeout(() => {
  //           props.setShowHamburger("hamburger__holder");
  //         }, 2000);
  //       }
  //   }

  //   if (window.location.pathname === "/about") {
  //     setMeltLogoStyle("logo__mobile-nav__container--about");
  //   } else {
  //     setMeltLogoStyle("logo__mobile-nav__container");
  //   }
  // }, []);

  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

  return (
    <div className="hamburger__container">
      {/* <div className="container"> */}
      <Fade
        keyframes={customAnimation}
        direction="up"
        delay={1000}
        duration={800}
        triggerOnce={true}
        className="hamburger_open-container"
      >
        <div className="logo__mobile-nav__container--about">
          {/* <img onClick={props.hamburgerClick} className="logo__mobile-nav" src={props.logoForNavHamburger} alt="logo" /> */}
          <img onClick={props.openMenu} className="logo__mobile-nav" src={MeltLogo} alt="logo" />
        </div>
      </Fade>
      {/* </div> */}
    </div>
  );
}
