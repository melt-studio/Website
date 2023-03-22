import React from 'react'
import "./Footer.css"
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
 
export default function Footer(props) {

//   const hoverFill = document.querySelector(".hover-fill");
// hoverFill.addEventListener("mouseover", function() {
//     hoverFill.classList.add("hover-fill-active");
// });
// hoverFill.addEventListener("mouseout", function() {
//     hoverFill.classList.remove("hover-fill-active");
// });

  return (
    <div style={{ backgroundColor:`${props.BackgroundColor}`, color:`${props.ColorTheme}`}} className='footer__container'>
    <Fade
      direction="up"
      duration={1000}
      triggerOnce={true}
      fraction={.4}
      // cascade
        >
        <div className='footer__left'>
          <p>
            <Link style={{ textDecoration: 'none' }} to="/" onClick={() => {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera to="/">
          }}><span style={{textDecoration:'none', color:`${props.ColorTheme}`, fontWeight:'800'}}>MELT studio</span> </Link>
             </p>
             <Link style={{ textDecoration: 'none',color:`${props.ColorTheme}` }} to="/working-components" onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera to="/">
          }}>
          <p style={{lineHeight: ".1"}}>No egos → sweat the details.</p>
          </Link>
        <p className='footer__copywrite'>2023 © MELT</p>
    </div>
      <div className='footer__right'>
        <span style={{ fontWeight: '800' }}><p>SAY HI</p></span>
        <div className='footer__link-holder'>


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
              <p id="phone-link" className='footer__links'>347.946.0249</p>
              <div className='cell-underline'>
              <hr style={{backgroundColor:`${props.ColorTheme}`, opacity:'1'}} />
              </div>
        </a>


        </div>
      </div>
      </Fade>
    </div>
  )
}
