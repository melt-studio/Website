import React, { useEffect} from 'react'
import "./NavBarWithFooter.css"
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useNavigate } from 'react-router-dom';

export default function NavBarWithFooter(props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (window.location.pathname === "/about") {
      // setNavColorTheme("nav__with__footer__hover-effect-black")
      props.setNavColor("#000")
    }else if (window.location.pathname === "/working-components") {
      // setNavColorTheme("nav__with__footer__hover-effect-black")
      props.setNavColor("#ffff")
      props.setVisible(false)
    } else {
      props.setNavColorTheme("nav__with__footer__hover-effect")
    }// eslint-disable-next-line
  }, [window.location.pathname])
  // console.log("props.color", props.color)

  const projectClick = () => {
    if (window.location.pathname === "/about") {
      props.setScroll(true);
      navigate('/');
      // navigate("/#projects")
      props.setNavColor("#FFFFFF")
      document.body.style.background = "#000000"
      // window.scrollTo(0, 0);
      // window.scrollBy(0, 3000);
      
    } else{

      navigate("/")
      props.setNavColor("#FFFFFF")
      document.body.style.background = "#000000"
      window.scrollTo(0, 0);
      window.scrollBy(0, window.innerHeight);
    }
    
  }
  

  return (
    
    <Animated className={props.isVis} animationIn="fadeInDown" animationOut="fadeOutUp" animationInDuration={1000} animationOutDuration={2000} isVisible={props.visible}>
    <div className={props.isVis}>
      
        <div className='nav-item__holder'>
          
          
          
        
        
              <div className='nav_logo__holder'>
              <p
                onClick={() => projectClick()}
                style={{color:props.color, cursor:'pointer'}}
                onMouseEnter={()=>{
                  const hoverFill = document.querySelector(".melt-underline");
                  hoverFill.classList.add("hovered")
                }}  
                onMouseLeave={()=>{
                  const hoverFill = document.querySelector(".melt-underline");
                  hoverFill.classList.remove("hovered")
                }}  
                  className={props.navColorTheme}>MELT STUDIO</p>
                  <div className='melt-underline'>
                <hr style={{backgroundColor:props.color}} />
              </div>
              </div>
      
           
        <div className='right-side__nav-with-footer'>
        
          
          <div>
          <a
          target="_blank" rel="noopener noreferrer"
          style={{textDecoration:'none',color:`${props.ColorTheme}`}} 
          href="mailto:hello@melt.works"
          onMouseEnter={()=>{
            const hoverFill = document.querySelector(".email-underline");
            hoverFill.classList.add("hovered")
          }}  
          onMouseLeave={()=>{
            const hoverFill = document.querySelector(".email-underline");
            hoverFill.classList.remove("hovered")
          }}  
          >
          <p style={{color:props.color}} className={props.navColorTheme}
          // style={{ color: `${props.color}`}}
          >SAY HELLO</p>
          </a>
          <div className='email-underline'>
        <hr style={{backgroundColor:props.color}}  />
        </div>
            </div>
            
            <div>
            <a style={{textDecoration:'none'}} href="tel:+347-946-0249">
                <p
                style={{color:props.color}}
                className={props.navColorTheme}
            onMouseEnter={()=>{
              const hoverFill = document.querySelector(".phone-underline");
              hoverFill.classList.add("hovered")
            }}  
            onMouseLeave={()=>{
              const hoverFill = document.querySelector(".phone-underline");
              hoverFill.classList.remove("hovered")
            }}  
            >P/ 347.946.0249</p>
            </a>
        <div className='phone-underline'>
        <hr style={{backgroundColor:props.color}}  />
        </div>
            </div>
            
            <div>
            <a style={{textDecoration:'none'}} target="_blank"
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
              hoverFill.classList.remove("hovered")
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
              hoverFill.classList.remove("hovered")
            }}  
              style={{ textDecoration: 'none' }} to="/about">
                <p
                  style={{ color: props.color }} className={props.navColorTheme}
          // style={{ color: `${props.color}`}}
          >ABOUT US</p>
            </Link>
            <div className='about-underline'>
        <hr style={{backgroundColor:props.color}} />
        </div>
          </div>
          </div>
          </div>
    
      </div>
      
</Animated>
  )
}


