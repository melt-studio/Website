import React from 'react'
import "./Contact.css"
import { Fade } from "react-awesome-reveal";
// import Footer from '../../components/Footer/Footer';
import { Helmet } from "react-helmet";
import { keyframes } from "@emotion/react";
import StickyInfo from '../../components/StickyInfo/StickyInfo';
import FooterTwo from '../../components/Footer/FooterTwo';

export default function Contact() {

  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  
  
  return (
    <div style={{color:'white'}}>
    <Helmet>
    <meta charSet="utf-8" />
    <title>MELLLLLLT - Contact</title>
      </Helmet>
      
      <StickyInfo
      // hideStickyInfo={hideStickyInfo}
      visible={true}
      isVis="sticky-info"
      cursorUrl="https://res.cloudinary.com/bobalobbadingdong/image/upload/v1670881191/Cherry/Cherry%20Clients/Graphic%20Assets/MELT-Yellow-ICON-BIG-PLUS_gsiugq"
      color="white"
      text="ABOUT"
      linkTo="/about" 
      />
      
    <div className='say-hello__info'>
    
    <Fade
    className='contact-section__email'
    direction="up"
    delay={1000}
          duration={500}
          keyframes={customAnimation}
          triggerOnce={true}
          fraction={.8}
          cascade
        >
      
        

      <div className='contact-section__email'>
      
       
        <a style={{textDecoration:'none'}} href="mailto:hello@melt.works">
        <p className="contact-section__info ">Email</p>
        </a>
            
        
        
          </div>
          
      <div className='contact-section__email more'>
      
      
        <a
        style={{textDecoration:'none'}}
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/melt.works/"
        >
                <p className="contact-section__info">Inst<span style={{letterSpacing:"-2px"}}>ag</span>ram</p>
        </a>
            
           
      </div>
      <div className='contact-section__email'>
      
       
        <a
        style={{textDecoration:'none'}}
        href="tel:+347-946-0249"
        >
        <p className="contact-section__info">347.946.0249</p>
        </a>
           
      </div>
      </Fade> 
      </div>
      
      <FooterTwo
      ColorTheme="white"
      />
    </div>
  )
}
