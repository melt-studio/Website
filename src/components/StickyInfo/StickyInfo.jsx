import React, {useState, useEffect} from 'react'
import "./StickyInfo.css"
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { NavHashLink } from 'react-router-hash-link';

// import Logo from "../../assets/DevelopmentAssets/MELT_LOGO BLK_SM.png"
export default function StickyInfo(props) {
  // const [logoText, setLogoText] = useState("MELT")
  const [navColorTheme, setNavColorTheme]=useState("hover-effect")
  // console.log(props.cursorUrl)
  // const cursorUrl = props.cursorUrl
  // console.log('location', window.location.pathname)

  useEffect(() => {
    if (window.location.pathname === "/about") {
      setNavColorTheme("hover-effect-black")
    } else {
      setNavColorTheme("hover-effect")
    }// eslint-disable-next-line
  }, [window.location.pathname])

  
  

  return (
    <Animated className={props.isVis} animationIn="fadeInDown" animationOut="fadeOutUp" animationInDuration={1000} animationOutDuration={2000} isVisible={props.visible}>
      <div className={props.isVis}>
        
        <div className='nav-item__holder'>
          
            <Link to="/" onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera to="/">
              props.visible(false)
              props.isVis(false)
              }}>
                <div className='nav_logo__holder'>
                  <p
                    // onMouseEnter={() => setLogoText("SWEAT THE DETAILS")} onMouseLeave={() => setLogoText("MELT STUDIO")} 
                // style={{ color: `${props.color}` }}
                    // style={{width:'285px'}}
                    className={navColorTheme}>MELT STUDIO</p>
                </div>
            </Link>
             
          
          
          <NavHashLink
            style={{ textDecoration: 'none' }}
            to="/#projects"
            smooth
          >
            <p
              // style={{ color: `${props.color}` }}
              // style={{ textStroke: `2px ${props.color}`, color:'transparent' }}
              onClick={() => {
                props.hideStickyInfo()
                
              }}
              className={navColorTheme}
            >WORK</p>
        </NavHashLink>
            
            <Link onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
              props.visible(false)
              props.isVis(false)
              }} style={{textDecoration:'none'}}  to="/about">
              <p className={navColorTheme}
                // style={{ color: `${props.color}`}}
              >ABOUT US</p>
            </Link>
            
            
        
          <Link onClick={() => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            props.visible(false)
            props.isVis(false)
            }} style={{textDecoration:'none'}}  to="/contact">
            <p className={navColorTheme}
              // style={{ color: `${props.color}`}}
            >CONTACT</p>
          </Link>
          </div>
      
      </div>
  </Animated>
  )
}