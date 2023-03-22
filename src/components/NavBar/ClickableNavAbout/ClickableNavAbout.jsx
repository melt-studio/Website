import React, {useEffect, useState} from 'react'
import "./ClickableNavAbout.css"

import { Animated } from "react-animated-css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function ClickableNavAbout(props) {
  const navigate = useNavigate();
  const [aboutUnderline, setAboutUnderline]=useState('about-underline')

  useEffect(() => {
    if (window.location.pathname === "/about") {
      // setAboutUnderline("always-underlined")
    }
  }, [])
  


  const homeCLick = () => {
    navigate("/");
    props.homeClick()
  }


  return (
    <Animated style={{cursor:'none'}} className={props.isVis} animationIn="fadeInDown" animationOut="fadeOutUp" animationInDuration={1000} animationOutDuration={2000} isVisible={props.visible}>
      <div style={{cursor:'none'}} className={props.isVis}>
        <div style={{cursor:"none"}} className='nav-item__holder'>
          <div style={{cursor:'none'}} className='nav_logo__holder'>
            <p
              className={props.navColorTheme}
              onClick={() => homeCLick()}
              style={{
                color: props.color,
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
              <div className='melt-underline'>
                <hr style={{backgroundColor:props.color}} />
            </div>
          </div>

          <div className='right-side__nav-with-footer'>
            <div
              style={{cursor:'none'}}
              className='contact-holder__clickable-nav'
              onMouseEnter={()=>{
                const hoverFill = document.querySelector(".contact-underline");
                hoverFill.classList.add("hovered")
              }}  
              onMouseLeave={()=>{
                const hoverFill = document.querySelector(".contact-underline");
                hoverFill.classList.add("mouse-leave")
                setTimeout(() => {
                hoverFill.classList.remove("mouse-leave")
                hoverFill.classList.remove("hovered")
                }, 300);
                const contactDropdown = document.querySelector(".contact-dropdown");
                contactDropdown.classList.remove("visible")
              }}  
            >
              <p
                style={{
                  color: props.color,
                  // cursor: 'pointer'
                }}
                onClick={()=>{
                  const contactDropdown = document.querySelector(".contact-dropdown");
                    if(contactDropdown.classList.contains("visible")){
                    contactDropdown.classList.remove("visible")
                  }else {
                    contactDropdown.classList.add("visible")
                    const hoverFill = document.querySelector(".contact-underline");
                    hoverFill.classList.add("hovered")
                  }
                }}
              >CONTACT</p>
                <div className='contact-underline'>
                  <hr style={{backgroundColor:props.color}} />
                </div>
                <div style={{cursor:'none'}} className='contact-dropdown'>
                <div>
                <a
                target="_blank" rel="noopener noreferrer"
                style={{textDecoration:'none',color:`${props.color}`}} 
                    href="mailto:hello@melt.works"
                  >
                  
                    <p
                    style={{cursor:'none'}}
                    onMouseEnter={()=>{
                    const hoverFill = document.querySelector(".email-underline");
                    hoverFill.classList.add("hovered")
                    }}  
                    onMouseLeave={()=>{
                      const hoverFill = document.querySelector(".email-underline");
                      hoverFill.classList.add("mouse-leave")
                      setTimeout(() => {
                      hoverFill.classList.remove("mouse-leave")
                      hoverFill.classList.remove("hovered")
                      }, 300);
                    }}  
                    >SAY HELLO</p>
                    </a>
                      <div className='email-underline'>
                        <hr style={{backgroundColor:props.color}} />
                      </div>
                  </div>
                <div>
                <a
                
                target="_blank" rel="noopener noreferrer"
                style={{textDecoration:'none',color:`${props.color}`, cursor:'none'}} 
                    href="mailto:careers@melt.works"
                  >
                  <p
                  onMouseEnter={()=>{
                    const hoverFill = document.querySelector(".careers-underline");
                    hoverFill.classList.add("hovered")
                    }}  
                    onMouseLeave={()=>{
                      const hoverFill = document.querySelector(".careers-underline");
                      hoverFill.classList.add("mouse-leave")
                      setTimeout(() => {
                      hoverFill.classList.remove("mouse-leave")
                      hoverFill.classList.remove("hovered")
                      }, 300);
                    }}  
                  >CAREERS</p></a>
                  <div className='careers-underline'>
                        <hr style={{backgroundColor:props.color}} />
                      </div>
                </div>
                <div>
                  <a style={{ textDecoration: 'none',color:`${props.color}`, cursor:'none' }} href="tel:+347-946-0249">
                  
                  <p
                  onMouseEnter={()=>{
                    const hoverFill = document.querySelector(".phone-underline");
                    hoverFill.classList.add("hovered")
                    }}  
                    onMouseLeave={()=>{
                      const hoverFill = document.querySelector(".phone-underline");
                      hoverFill.classList.add("mouse-leave")
                      setTimeout(() => {
                      hoverFill.classList.remove("mouse-leave")
                      hoverFill.classList.remove("hovered")
                      }, 300);
                    }}  
                  >P/347.946.0249</p></a>
                  <div className='phone-underline'>
                        <hr style={{backgroundColor:props.color}} />
                      </div>
                  </div>
                </div>
            </div>


           
            
            <div>
            <a style={{textDecoration:'none', cursor:'none'}} target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/mellllllllllt/">
                <p
                style={{color:props.color}}
                className={props.navColorTheme}
            onMouseEnter={()=>{
              const hoverFill = document.querySelector(".follow-underline");
              hoverFill.classList.add("hovered")
            }}  
            onMouseLeave={()=>{
              const hoverFill = document.querySelector(".follow-underline");
               hoverFill.classList.add("mouse-leave")
                  setTimeout(() => {
                    hoverFill.classList.remove("mouse-leave")
                    hoverFill.classList.remove("hovered")
                  }, 300);
            }}  
            >FOLLOW</p>
            </a>
        <div className='follow-underline'>
        <hr style={{backgroundColor:props.color}}  />
        </div>
          </div>
            
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
              <div className={aboutUnderline }>
    <hr style={{backgroundColor:props.color}} />
    </div>
            </div>
            
          </div>
        </div>
      </div>
    </Animated>
  )
}
