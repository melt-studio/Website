import React, {useState, useEffect} from 'react'
import "./Hamburger.css"
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
// import Logo from "../../assets/DevelopmentAssets/LogoKnockout.png"
// import { useNavigate } from 'react-router-dom';


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
const [meltoLogoStyle, setMeltLogoStyle]=useState("logo__mobile-nav__container")
  useEffect(() => {

    if (window.innerWidth < 850) {
      if(window.location.pathname === "/about")
        if (props.showHamburger === "hamburger__holder hidden") {
        setTimeout(() => {
          props.setShowHamburger("hamburger__holder")
        }, 2000);
      }
    }



    if (window.location.pathname === "/about") {
      setMeltLogoStyle("logo__mobile-nav__container--about")
    } else {
      setMeltLogoStyle("logo__mobile-nav__container")
    }
  }, [])
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
    <div className='hamburger__container'>
      <div className="container">
        
            {props.logoForNavHamburger === "data:image/png;base64,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" ? (
              <div className={meltoLogoStyle}>
              <img onClick={props.hamburgerClick} className='logo__mobile-nav' src={props.logoForNavHamburger} alt="logo" />
              </div>
            ) : (
                <>
              <Fade
              // className='logo__mobile-nav-x'
                keyframes={customAnimation}
                direction="up"
                duration={1000}
                triggerOnce={true}
                fraction={.4}
                // cascade
                  >
                  <img onClick={props.hamburgerClick} className='logo__mobile-nav-x' src={props.logoForNavHamburger} alt="logo" />
                  </Fade>
                </>
          )}
            
         
    
</div>
    </div>
  )
}

// <input type="checkbox" id="checkbox3" className="checkbox3 visuallyHidden"/> 
//     <label htmlFor="checkbox3">
//         <div onClick={props.hamburgerClick} className="hamburger hamburger3">
//             <span className="bar bar1"></span>
//             <span className="bar bar2"></span>
//             <span className="bar bar3"></span>
//             <span className="bar bar4"></span>
//         </div>
//     </label>

// <img  className="smiley-hamburger" src={Smiley} alt='hamburger-smiley' />

// <span className="bar bar1"></span>
// <span className="bar bar2"></span>
// <span className="bar bar3"></span>
// <span className="bar bar4"></span>