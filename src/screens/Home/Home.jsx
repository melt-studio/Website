import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
// import { Fade } from "react-awesome-reveal";
// import { keyframes } from "@emotion/react";
import Projects from "../../components/Projects/Projects";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import FooterSmaller from "../../components/Footer/FooterSmaller/FooterSmaller";
import { useFadeEffect } from "../../components/helpers/fadeEffect.js";
import MobileLogoAnimationStart from "../../components/MobileLogoAnimationStart/MobileLogoAnimationStart";
// import MobileLogoHome from '../../components/MobileLogoHome/MobileLogoHome';

export default function Home(props) {
  const fadeInRef = useRef(null);
  const fadeInTriggerRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState("none");
  const [spacingOnReentry, setSpacingOnReentry] = useState("0px");

  // This is from MobileLogoHome
  // useEffect(() => {
  // //  console.log("mobileIntro", props.mobileIntro)
  //   if (window.innerWidth < 800) {
  //     if(props.mobileIntro === "mobile-logo-home__container"){
  //       document.body.style.overflow = 'hidden';
  //     } else if (props.mobileIntro === "mobile-logo-home__container hide"){
  //       document.body.style.overflow = 'auto';
  //     }
  //   }

  // }, [props.mobileIntro])

  const { effectRef, updateFadeEffect } = useFadeEffect();
  useEffect(() => {
    ////// This was breaking the initial fade in.
    if (window.innerWidth > 800) {
      // if(document.getElementById("fade-in-up-element-holder").classList.contains('.fade-in-up-element')){
      setTimeout(() => {
        document.querySelector(".fade-in-up-element").classList.add("visible");
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // document.querySelector('.fade-in-up-element').classList.remove('no-more');
        // updateFadeEffect(0)
      }
    });

    observer.observe(fadeInTriggerRef.current);

    // return () => observer.unobserve(fadeInTriggerRef.current);
  }, [updateFadeEffect]);

  window.addEventListener("scroll", function () {
    if (window.location.pathname === "/") {
      var distanceFromTop = document.querySelector(".spacer-mobile").getBoundingClientRect().top;
      if (distanceFromTop < 0.345 * window.innerHeight) {
        // document.querySelector('.mobile__info').classList.add('hide');
        // console.log("50%")
      } else {
        // document.querySelector('.mobile__info').classList.remove('hide');
        // document.querySelector('.mobile-logo__holder').classList.remove('mobile-logo__holder-active');
        // console.log("OTHER%")
      }
    }
  });

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

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= window.innerHeight * 0.8) {
        // console.log("100");
        props.setShowHamburger("hamburger__holder");
        // setMobileLogoVisibility("mobile-logo visible")
      } else {
        props.setShowHamburger("hamburger__holder hidden");
        // setMobileLogoVisibility("mobile-logo")
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        // console.log("100vh!");
        props.setStickyIsVis("sticky-info");
        props.setVisible(true);
      } else {
        props.setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   // window.location.reload();
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div
      style={{
        backgroundColor: props.backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="home__container hover-background"
    >
      <div className="mobile-intro__holder">
        <MobileLogoAnimationStart
          fadeInText={props.fadeInText}
          mobileIntroLogo={props.mobileIntroLogo}
          setMobileIntroLogo={props.setMobileIntroLogo}
        />
      </div>

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
          <LogoAnimation
            showHamburger={props.showHamburger}
            setShowHamburger={props.setShowHamburger}
            spacingOnReentry={spacingOnReentry}
            effectRef={effectRef}
          />
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
        showHamburger={props.showHamburger}
        setShowHamburger={props.setShowHamburger}
        setStickyIsVis={props.setStickyIsVis}
        setVisible={props.setVisible}
        projects={props.projects}
        setBackgroundImage={setBackgroundImage}
        setBackgroundColor={props.setBackgroundColor}
        cursor={props.cursor}
      />

      <div className="footer__spacer" />

      {window.location.pathname !== "/working-components" && <FooterSmaller color={props.navTextColor} />}
    </div>
  );
}

// <MobileLogoHome clicks={props.clicks} setClicks={props.setClicks} setFadeInText={props.setFadeInText} setMobileIntro={props.setMobileIntro} />
