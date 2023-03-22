import React, {useState, useEffect} from 'react'
import "./Unofficials.css"

import { useNavigate } from 'react-router-dom';

import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react"; 


export default function Unofficials(props) {
  // console.log("props", props)
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const goToProject = (id) => {
    // document.getElementById("mobile-logo__div-z-index").style.zIndex = "0";
    navigate(`/${id}`);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // props.setShowHamburger("hamburger__holder hidden")
    // document.body.style.cursor = 'default';
    // document.body.style.overflow = 'hidden';
    // props.setShowHamburger("hamburger__holder hidden")
    // setTimeout(() => {
    //   props.setShowHamburger("hamburger__holder hidden")
    // }, 1000);
  }

  useEffect(() => {

    setTimeout(() => {
      document.querySelector(".unofficials-blurb__container").classList.add("show")
    }, 1000);

    setTimeout(() => {
      // props.setShowHamburger("hamburger__holder")
      props.setVisible(true)
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight / 3) {
        // console.log("50vh!");
        // const hoverFill = document.querySelector(".unofficials-blurb__holder");
        document.querySelector(".unofficials-blurb__holder").classList.add("hide")
      } else {
        // console.log("under50vh!");
        document.querySelector(".unofficials-blurb__holder").classList.remove("hide")
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const customAnimationProjectTitle = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  `;

  const rolloverPosterShow = (poster) => {
    console.log("Works!", poster)
  }

  // console.log("props", props.miscPageInfo[0].fields.unofficialsCopy)

  return (
    <div className=' unofficials__container'>
      <div className='unofficials-blurb__container'>
        <div className='unofficials-blurb__holder page'>
          {props.miscPageInfo.length && (
            <h1 className=' jumbo-text'>
       {props.miscPageInfo[0].fields.unofficialsCopy}
        </h1>
          )}
        
        </div>
      </div>
      {props.unofficials && (
        <>
          {props.unofficials.map((project, index) => (
            <Fade
            key={index+project.fields.name+"fade"}
            className='unofficials-project__container'
            keyframes={customAnimationProjectTitle}
            opposite
            // direction="up"
            duration={3000}
            delay={1000}
              triggerOnce={true}
              cascade
      // fraction={0.5}
            >
              <div
            key={index+project.fields.name+"div"}
                onMouseEnter={() =>
                {
                  setHoveredIndex(index);
                  rolloverPosterShow(project.fields.mainImage )
                }
                }
            onMouseLeave={()=> setHoveredIndex(null)}
            className='unofficials-project__container'>
            <h1
            id={index + project.fields.name}
            key={index+project.fields.name}
            onClick={()=> goToProject(project.fields.projectUrl )}
            className='unofficials-title'
            style={{ 
              color: hoveredIndex === index ? project.fields.colorText : 'initial'
            }}>
            {project.fields.name}
            </h1>
            </div>
            </Fade>
      ))}
        </>
      )}
    </div>
  )
}
