import React from 'react'
import "./FooterOutlined.css"
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

export default function FooterOutlined(props) {
  return (
   <div style={{ backgroundColor:`${props.BackgroundColor}`, color:`${props.ColorTheme}`}} className='footer__container'>
      
    <div className='footer__container-holder'>
      <Fade
      direction="up"
      duration={1000}
      triggerOnce={true}
      fraction={.4}
      // cascade
      >
       
       
         
             <Link style={{ textDecoration: 'none',color:`${props.ColorTheme}` }} to="/working-components" onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera to="/">
          }}>
          <p className='footer-text'>sweat the details</p>
          </Link>
        
    
   
        
       


        <a 
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
        <p className='footer__links'>hello@melt.works</p>
        <div className='email-underline'>
              <hr style={{backgroundColor:`${props.ColorTheme}`, opacity:'1'}} />
              </div>
        </a>


        <a
        style={{textDecoration:'none', color:`${props.ColorTheme}`}}
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/mellllllllllt/"
        onMouseEnter={()=>{
            const hoverFill = document.querySelector(".insta-underline");
            hoverFill.classList.add("hovered")
          }}  
          onMouseLeave={()=>{
            const hoverFill = document.querySelector(".insta-underline");
            hoverFill.classList.remove("hovered")
          }}  
        >
        <p className='footer__links'>Instagram</p>
        <div className='insta-underline'>
              <hr style={{backgroundColor:`${props.ColorTheme}`, opacity:'1'}} />
              </div>
          </a>


          <a
          onMouseEnter={()=>{
            const hoverFill = document.querySelector(".cell-underline");
            hoverFill.classList.add("hovered")
          }}  
          onMouseLeave={()=>{
            const hoverFill = document.querySelector(".cell-underline");
            hoverFill.classList.remove("hovered")
          }}  
        style={{textDecoration:'none', color:`${props.ColorTheme}`}}
        href="tel:+347-946-0249"
        >
              <p id="phone-link" className='footer__links'>P. 347.946.0249</p>
              <div className='cell-underline'>
              <hr style={{backgroundColor:`${props.ColorTheme}`, opacity:'1'}} />
              </div>
        </a>
        <p className='footer-text'>2023 © MELT</p>

        
      
        </Fade>
        </div>
    </div>
  )
}
