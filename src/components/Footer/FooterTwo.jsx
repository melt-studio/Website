import React from 'react'
import "./FooterTwo.css"
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
 
export default function FooterTwo(props) {



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

// <Animated className={props.isVis} animationIn="fadeInUp" animationOut="fadeOutDown" animationInDuration={1000} animationOutDuration={2000} isVisible={props.visible}>
      
//       <div className='nav-with-footer__Footer'>
//         <div className='nav-with-footer__Footer-container'>
//             <div>
//             <Link style={{ textDecoration: 'none',color:`${props.ColorTheme}` }} to="/working-components" onClick={() => {
//               document.body.scrollTop = 0; // For Safari
//               document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera to="/">
//               }}>
//               <p
//               style={{color:props.color}}
//               className={navColorTheme}
//               onMouseEnter={()=>{
//                 const hoverFill = document.querySelector(".sweat-underline");
//                 hoverFill.classList.add("hovered")
//               }}  
//               onMouseLeave={()=>{
//                 const hoverFill = document.querySelector(".sweat-underline");
//                 hoverFill.classList.remove("hovered")
//               }}  >SWEAT THE DETAILS</p>
//               </Link>
//           <div className='sweat-underline'>
//         <hr style={{backgroundColor:props.color}}  />
//         </div>
//           </div>
//           <div>
//               <p
//               style={{color:props.color}}
//               className={navColorTheme}
//             onMouseEnter={()=>{
//               const hoverFill = document.querySelector(".copywrite-underline");
//               hoverFill.classList.add("hovered")
//             }}  
//             onMouseLeave={()=>{
//               const hoverFill = document.querySelector(".copywrite-underline");
//               hoverFill.classList.remove("hovered")
//             }} >2023 © MELT STUDIO</p>
//           <div className='copywrite-underline'>
//         <hr style={{backgroundColor:props.color}}  />
//         </div>
//           </div>
//         </div>
//         </div>
//         </Animated>