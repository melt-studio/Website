import React, {useRef, useEffect, useState} from 'react'
// import StickyInfo from '../../components/StickyInfo/StickyInfo'
import "./About.css"
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
// import FooterSmaller from '../../components/Footer/FooterSmaller/FooterSmaller';
import { keyframes } from "@emotion/react";
import FadeInUpTags from "../../components/FadeInUpTags/FadeInUpTags"
import FadeInUpDontDo from '../../components/FadeInUpDontDo/FadeInUpDontDo';

export default function About(props) {
  const [lastKnownScrollPosition, setLastKnownScrollPosition] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [imgWidth, setImgWidth]=useState(20)
// console.log("aboutInfo", props.aboutInfo)
  useEffect(() => {

    setTimeout(() => {
      document.querySelector('.transition-fade__about').classList.add('hide');
    }, 1000);

    setTimeout(() => {
      document.querySelector('.about-text-three').classList.add('show');
    }, 3000);


    const ImageGrowScroll = () => {
      setLastKnownScrollPosition(window.scrollY);
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollPosition > window.scrollY) {
            // console.log('up');
            setImgWidth(imgWidth-15)
          } else {
            // console.log('down');
            setImgWidth(imgWidth+15)
           
          }
          setTicking(false);
        });
        setTicking(true);
      }
    }
    window.addEventListener('scroll', ImageGrowScroll);
    return () => {
      window.removeEventListener('scroll', ImageGrowScroll);
    };
  }, [lastKnownScrollPosition, ticking, imgWidth])


  const ref = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      // console.log(loaded)
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              // console.log("Is Visible");
              // const element = 
              if (document.getElementById("about_hr_holder").classList.contains("about__hr-holder")) {
                setTimeout(() => {
                  
                  document.querySelector('.about__hr-holder').classList.add('grow');
                }, 1200);
              }
          } 
    //         else {
    //           if (document.getElementById("about_hr_holder").classList.contains("grow"))
    //           document.querySelector('.about__hr-holder').classList.remove('grow');
    // }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
const customAnimationRight = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 10px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

const [functionCalled, setFunctionCalled] = useState(false);
  const letsMakeSomethingFadeIn = () => {
    if (functionCalled) {
      // console.log("This is the second time the function is being called.");
      setTimeout(() => {
        
        document.querySelector('.nothing').classList.add('lets-make-something');
      }, 2500);
    } else {
      // console.log("This is the first time the function is being called.");
      setFunctionCalled(true);
     
    }
  }

  function sendEmail() {
    window.location.href = "mailto:hello@melt.works";
  }
  const [circleDiameter, setCircleDiameter] = useState("35px")
  const [cursorColor, setCursorColor]=useState("black")
  // console.log("circleDiameter", circleDiameter)
  useEffect(() => {
    const circle = document.createElement("span");
    circle.style.width = circleDiameter;
    circle.style.height = circleDiameter;
    // circle.style.transition= "all 1s"
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = cursorColor
    // circle.style.backgroundImage =
      // "url('https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_25/v1678491780/MELT%20Works/ezgif.com-resize_ey9p34.gif')";
    circle.style.backgroundSize = "cover";
    circle.style.backgroundPosition = "center";
    circle.style.position = "fixed"; // Use fixed position to prevent the circle from moving when the page is scrolled
    circle.style.zIndex = "9999"; // Make the circle appear above other elements on the page
    circle.style.pointerEvents = "none"; // Disable mouse events on the circle so that they pass through to the underlying elements
    document.body.appendChild(circle);

    const updateCirclePos = (e) => {
      const circleWidth = circle.offsetWidth;
      const circleHeight = circle.offsetHeight;
      const circleCenterX = e.clientX - circleWidth / 2;
      const circleCenterY = e.clientY - circleHeight / 2;
      circle.style.left = `${circleCenterX}px`;
      circle.style.top = `${circleCenterY}px`;
    };

    document.addEventListener("mousemove", updateCirclePos);

    return () => {
      document.removeEventListener("mousemove", updateCirclePos);
      circle.remove();
    };
  }, [circleDiameter]);


  return (
    
    <div style={{ cursor: "none" }} className='about__container page'>
      <div className='transition-fade__about' />
    <Helmet>
    <meta charSet="utf-8" />
    <title>MELLLLLLT - About</title>
        </Helmet>
       
      <div style={{ cursor: "none" }} className='inner-container'>
        
      <div  style={{ cursor: "none" }} className='about__description-text jumbo-text'>
            
            {props.aboutInfo.length && (
              <>
              {props.aboutInfo[0].fields.aboutText &&
                <Fade
                // className='lets-make-something'
            direction="up"
            delay={1500}
            duration={2500}
            triggerOnce={true}
            // fraction={.4}
            cascade
            keyframes={customAnimation}
                >
                  <p>{props.aboutInfo[0].fields.aboutText}</p>
                  </Fade>
                }
              {props.aboutInfo[0].fields.aboutTextTwo &&
                <Fade
              // className='lets-make-something'
          direction="up"
          delay={2000}
          duration={2500}
          triggerOnce={true}
          // fraction={.4}
          cascade
          keyframes={customAnimation}
                >
                  <p>{props.aboutInfo[0].fields.aboutTextTwo}</p>
                  </Fade>
                }


              {props.aboutInfo[0].fields.aboutTextThree &&
                <div
                  // className='about-text-three'
                  // direction="up"
                  // delay={2500}
                  // duration={2500}
                  // triggerOnce={true}
                  // // fraction={.4}
                  // cascade
                  // keyframes={customAnimation}
                >
                  <p className='about-text-three'>{props.aboutInfo[0].fields.aboutTextThree}</p>
                  </div>
                }
              
                {props.aboutInfo[0].fields.aboutTextFour &&
                  <Fade
                  direction="up"
                // delay={500}
                duration={3500}
                triggerOnce={true}
                // fraction={.4}
                  keyframes={customAnimation}
                  onVisibilityChange={()=> letsMakeSomethingFadeIn()}
                >
                  <p
                    className='nothing'
                    onClick={() => sendEmail()}
                  >
                  {props.aboutInfo[0].fields.aboutTextFour}
                  </p>
                  </Fade>
                }
              </>
            )}
        </div>
        <div className='inner-container__right'>
          <div className='about__right'>
          <Fade
          // className='lets-make-something'
      direction="up"
      delay={3000}
      duration={1000}
      triggerOnce={true}
      // fraction={.4}
      cascade
      keyframes={customAnimationRight}
            >
              <h1>Contact</h1>
              <hr className='underline-mobile-only' />
            </Fade>
            <Fade
          // className='lets-make-something'
      direction="up"
      delay={3300}
      duration={1000}
      triggerOnce={true}
      // fraction={.4}
      cascade
      keyframes={customAnimationRight}
            >
              <div style={{ marginBottom:'-2px', width:'fit-content' }}>
            
                <a
                target="_blank" rel="noopener noreferrer"
                style={{textDecoration:'none',color:`${props.color}`, cursor:'none'}} 
                href="mailto:hello@melt.works"
                >
                <h3
                onMouseEnter={()=>{
                  const hoverFill = document.querySelector(".hello-underline");
                  hoverFill.classList.add("hovered")
                  setCircleDiameter("40px")
                }}  
                onMouseLeave={()=>{
                  const hoverFill = document.querySelector(".hello-underline");
                  hoverFill.classList.add("mouse-leave")
                  setTimeout(() => {
                    hoverFill.classList.remove("mouse-leave")
                    hoverFill.classList.remove("hovered")
                    setCircleDiameter("25px")
                   
                  }, 300);
                }}  
                >Say Hello</h3>
                </a>
              <div className="hello-underline ">
                <hr
                  style={{ backgroundColor: 'black' }}
                />
                </div>
              </div>
              <div  style={{ marginBottom:'-2px', width:'fit-content' }}>
              <a
              target="_blank" rel="noopener noreferrer"
              style={{textDecoration:'none',color:`${props.color}`, cursor:'none'}} 
              href="mailto:careers@melt.works"
              >
              <h3
              onMouseEnter={()=>{
                      setCircleDiameter("10px")
                      setCursorColor("yellow")
                const hoverFill = document.querySelector(".join-underline");
                hoverFill.classList.add("hovered")
              }}  
              onMouseLeave={()=>{
                setCircleDiameter("25px")
                setCursorColor("black")
                const hoverFill = document.querySelector(".join-underline");
                hoverFill.classList.add("mouse-leave")
                setTimeout(() => {
                  hoverFill.classList.remove("mouse-leave")
                  hoverFill.classList.remove("hovered")
                }, 300);
              }}  
              >Join Our Team</h3>
              </a>
              <div className="join-underline ">
              <hr
              style={{ backgroundColor: 'black' }}
              />
              </div>
              </div>
              
              <div  style={{ marginBottom:'-20px', width:'fit-content' }}>
              <a style={{ textDecoration: 'none', color: `${props.color}` }} href="tel:+347-249-0123">
              <h3
              onMouseEnter={()=>{
                const hoverFill = document.querySelector(".about-phone-underline");
                hoverFill.classList.add("hovered")
              }}  
              onMouseLeave={()=>{
                const hoverFill = document.querySelector(".about-phone-underline");
                hoverFill.classList.add("mouse-leave")
                setTimeout(() => {
                  hoverFill.classList.remove("mouse-leave")
                  hoverFill.classList.remove("hovered")
                }, 300);
              }}  
              >P/ 347.249.0123</h3>
              </a>
              <div className="about-phone-underline ">
              <hr
              style={{ backgroundColor: 'black' }}
              />
              </div>
              </div>
              ///////////////
            </Fade>
            <br />
            <Fade
          // className='lets-make-something'
      direction="up"
      delay={3000}
      duration={1000}
      triggerOnce={true}
      // fraction={.4}
      cascade
      keyframes={customAnimationRight}
            >
              <h1>Follow</h1>
              <hr className='underline-mobile-only' />
            </Fade>
            <Fade
          // className='lets-make-something'
      direction="up"
      delay={3300}
      duration={1000}
      triggerOnce={true}
      // fraction={.4}
      cascade
      keyframes={customAnimationRight}
            >
            <div  style={{  width:'fit-content' }}>
              <a style={{textDecoration:'none', cursor:'none'}} target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/mellllllllllt/">
              <h3
              onMouseEnter={()=>{
                const hoverFill = document.querySelector(".about-instagram-underline");
                hoverFill.classList.add("hovered")
              }}  
              onMouseLeave={()=>{
                const hoverFill = document.querySelector(".about-instagram-underline");
                hoverFill.classList.add("mouse-leave")
                setTimeout(() => {
                  hoverFill.classList.remove("mouse-leave")
                  hoverFill.classList.remove("hovered")
                }, 300);
              }}  
              >Instagram</h3>
              </a>
              <div className="about-instagram-underline ">
              <hr
              style={{ backgroundColor: 'black' }}
              />
              </div>
              </div>
            </Fade>
           <br />
            <Fade
          // className='lets-make-something'
      direction="up"
      delay={3000}
      duration={1000}
      triggerOnce={true}
      // fraction={.4}
      cascade
      keyframes={customAnimationRight}
            >
              <h1>What We Do</h1>
              <hr className='underline-mobile-only' />
            </Fade>
            
            {props.aboutInfo.length && (
              <>
                {props.aboutInfo[0].fields.whatWeDo && (
                  <>
                 
            <FadeInUpTags aboutInfo={props.aboutInfo} />
                   
                  </>
              )}
              </>
            )}
            <br />
            <Fade
          // className='lets-make-something'
      direction="up"
      delay={3000}
      duration={1000}
      triggerOnce={true}
      // fraction={.4}
      cascade
      keyframes={customAnimationRight}
            >
              <h1> What We Don't Do</h1>
              <hr className='underline-mobile-only' />
            </Fade>
            {props.aboutInfo.length && (
              <>
                {props.aboutInfo[0].fields.whatWeDontDo && (
                  <>
                 
            <FadeInUpDontDo aboutInfo={props.aboutInfo} />
                   
                  </>
              )}
              </>
            )}
          </div>
        </div>
      </div>

    
      
    

      
      </div>
      
      )
    }
  
    
    // <FooterSmaller
    // color={props.navTextColor}
    // />
    
//     <br />
//     <Fade
//   // className='lets-make-something'
// direction="up"
// delay={3000}
// duration={1000}
// triggerOnce={true}
// // fraction={.4}
// cascade
// keyframes={customAnimationRight}
//     >
//       <h1>Special Projects</h1>
//       <hr className='underline-mobile-only' />
//     </Fade>
//     <Fade
//   // className='lets-make-something'
// direction="up"
// delay={3300}
// duration={1000}
// triggerOnce={true}
// // fraction={.4}
// cascade
// keyframes={customAnimationRight}
//     >
//       <div style={{ marginBottom: '-10px', width: 'fit-content' }}>
//       <a style={{textDecoration:'none', cursor:'none', }} href="/unofficials">
//       <h3
      
//       onMouseEnter={()=>{
//         const hoverFill = document.querySelector(".about-unofficials-underline");
//         hoverFill.classList.add("hovered")
//       }}  
//       onMouseLeave={()=>{
//         const hoverFill = document.querySelector(".about-unofficials-underline");
//         hoverFill.classList.add("mouse-leave")
//         setTimeout(() => {
//           hoverFill.classList.remove("mouse-leave")
//           hoverFill.classList.remove("hovered")
//         }, 300);
//       }}  
//       >Unnofficials</h3>
//       </a>
//       <div className="about-unofficials-underline ">
//       <hr
//       style={{ backgroundColor: 'black', marginBottom:'-10px' }}
//       />
//       </div>
//       </div>
//       <h3>More to come…</h3>
//     </Fade>
//     <br />