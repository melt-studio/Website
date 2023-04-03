import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import Projects from "../../components/Projects/Projects";
import MobileAnimation from "../../components/MobileAnimation/MobileAnimation.jsx";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import { useFadeEffect } from "../../components/helpers/fadeEffect.js";

export default function Home(props) {
  const fadeInRef = useRef(null);
  const fadeInTriggerRef = useRef(null);
  // const [backgroundImage, setBackgroundImage] = useState("none");
  const [spacingOnReentry, setSpacingOnReentry] = useState("0px");

  useEffect(() => {
    // console.log("hello");
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.body.classList.add("home-page");

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  const { effectRef, updateFadeEffect } = useFadeEffect();
  useEffect(() => {
    ////// This was breaking the initial fade in.
    if (window.innerWidth > 800) {
      // if(document.getElementById("fade-in-up-element-holder").classList.contains('.fade-in-up-element')){
      setTimeout(() => {
        if (document.querySelector(".fade-in-up-element")) {
          document.querySelector(".fade-in-up-element").classList.add("visible");
        }
      }, 1000);
      // }
    }

    window.addEventListener("scroll", function () {
      if (window.location.pathname === "/") {
        var distanceFromTop = document.querySelector(".test").getBoundingClientRect().top;
        if (distanceFromTop < 0.1 * window.innerHeight) {
          // document.querySelector('.mobile__info').classList.add('hide');
          // console.log("50%")
          updateFadeEffect(1);
          setSpacingOnReentry("0px");
        } else {
          // document.querySelector('.mobile__info').classList.remove('hide');
          // document.querySelector('.mobile-logo__holder').classList.remove('mobile-logo__holder-active');
          // console.log("OTHER%")
          updateFadeEffect(0);
          setSpacingOnReentry("0px");
        }
      }
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // document.querySelector('.fade-in-up-element').classList.add('no-more');
        // document.querySelector('.fade-in-up-element.visible').classList.remove('visible');
        // updateFadeEffect(1)
      } else {
        //
      }
    });

    observer.observe(fadeInRef.current);

    // return () => observer.unobserve(fadeInRef.current);
  }, [updateFadeEffect]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       // document.querySelector('.fade-in-up-element').classList.remove('no-more');
  //       // updateFadeEffect(0)
  //     }
  //   });

  //   observer.observe(fadeInTriggerRef.current);

  //   // return () => observer.unobserve(fadeInTriggerRef.current);
  // }, [updateFadeEffect]);

  const scrollRef = useRef();
  useEffect(() => {
    if (window.innerWidth > 800) {
      if (props.scroll) {
        if (scrollRef.current) {
          window.scrollTo({
            top: scrollRef.current.offsetTop + 0,
            behavior: "smooth",
          });
        }
      }
    }
  }, [props.scroll]);

  return (
    <div
      style={
        {
          // backgroundColor: props.backgroundColor,
          // backgroundImage: `url(${backgroundImage})`,
        }
      }
      className="home__container hover-background"
    >
      <MobileAnimation />

      <div className="spacer-mobile"></div>

      <div
        className="test"
        style={{
          position: "relative",
          top: "60vh",
          // height: '50px', width: '50px',
          // backgroundColor: 'red',
          zIndex: "999",
        }}
        ref={fadeInTriggerRef}
      />
      <div id="fade-in-up-element-holder" className="logo_knockout__holder fade-in-up-element">
        <div className="shrinker">
          <LogoAnimation spacingOnReentry={spacingOnReentry} effectRef={effectRef} />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          top: "250px",
          // height: '50px', width: '50px',
          // backgroundColor: 'red', zIndex: '999'
        }}
        ref={fadeInRef}
      />

      <div ref={scrollRef} id="projects" className="proj-tag" />
      <div className="project-anchor" />

      <Projects
        projects={props.projects}
        // setBackgroundImage={setBackgroundImage}
        setBackgroundColor={props.setBackgroundColor}
        cursor={props.cursor}
        viewport={props.viewport}
        widthCutOff={props.widthCutOff}
      />
    </div>
  );
}
