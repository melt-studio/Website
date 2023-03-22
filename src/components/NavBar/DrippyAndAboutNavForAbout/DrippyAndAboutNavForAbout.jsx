import React, {useEffect, useState} from 'react'
import "./DrippyAndAboutNavForAbout.css"

import { Animated } from "react-animated-css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Drippy from "../../../assets/images/Logo/MELT_DRIPPY WHT.png"
import MeltStudioLogo from "../../../assets/images/Logo/MELT_MELT STUDIO.svg"
export default function DrippyAndAboutNavForAbout(props) {
  const navigate = useNavigate();
  // const [aboutUnderline, setAboutUnderline]=useState('about-underline')

  useEffect(() => {
    if (window.location.pathname === "/about") {
      // setAboutUnderline("always-underlined")
      // props.setStickyIsVis("sticky-info")
      setTimeout(() => {
        props.setVisible(true)
      }, 3000);
    }
  }, [])
  


  const homeCLick = () => {
    navigate("/");
    props.homeClick()
  }



  return (
    <Animated style={{cursor:'none'}} className={props.isVis} animationIn="fadeInDown" animationOut="fadeOutUp" animationInDuration={1000} animationOutDuration={2000} isVisible={props.visible}>
    <div style={{cursor:'none'}}  className={props.isVis}>
      <div  className='nav-item__holder'>
        <div  className='nav_logo__holder'>
        <p
        src={MeltStudioLogo}
        alt="melt logo"
        className="melt_nav"
        onClick={() => homeCLick()}
        style={{
          // color: props.color,
          cursor: 'none'
        }}
        onMouseEnter={()=>{
          const hoverFill = document.querySelector(".melt-underline");
          hoverFill.classList.add("hovered")
        }}  
        onMouseLeave={()=>{
          const hoverFill = document.querySelector(".melt-underline");
          hoverFill.classList.add("mouse-leave")
          setTimeout(() => {
            hoverFill.classList.remove("mouse-leave")
            hoverFill.classList.remove("hovered")
          }, 300);
        }}  
          >MELT STUDIO</p>
          <div className="melt-underline">
  <hr style={{backgroundColor:props.color}} />
  </div>
        </div>
        <div className='logo-holder__nav'>
        <img onClick={() => { 
          window.scrollTo({top: 0, behavior: 'smooth'});
        }} className="drippy__nav" style={{ cursor:'none'}} src={Drippy} alt="logo" />
      </div>
        <div className='right-side__nav-with-footer'>
          

         
          
        <div>
        <Link onClick={() => {
          
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      props.visible(false)
      props.isVis(false)
      
      }}
      onMouseEnter={()=>{
        const hoverFill = document.querySelector(".about-underline");
        hoverFill.classList.add("hovered")
      }}  
      onMouseLeave={()=>{
        const hoverFill = document.querySelector(".about-underline");
        hoverFill.classList.add("mouse-leave")
        setTimeout(() => {
          hoverFill.classList.remove("mouse-leave")
          hoverFill.classList.remove("hovered")
        }, 300);
      }}  
        style={{ textDecoration: 'none', cursor:'none' }} to="/about">
          <p
            style={{ color: props.color }} className={props.navColorTheme}
    // style={{ color: `${props.color}`}}
    >ABOUT US</p>
      </Link>
            <div className="about-underline">
  <hr style={{backgroundColor:props.color}} />
  </div>
          </div>
          
        </div>
      </div>
    </div>
  </Animated>
  )
}
