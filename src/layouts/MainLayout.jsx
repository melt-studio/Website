import React, { useEffect, useRef, useState } from "react";
// import "./MainLayout.css";
import NavMenuLogo from "../components/NavMenuLogo/NavMenuLogo.jsx";
import NavMenu from "../components/NavMenu/NavMenu.jsx";
// import DrippyAndAboutNav from "../components/NavBar/DrippyAndAboutNav/DrippyAndAboutNav";
import NavBar from "../components/NavBar/NavBar.jsx";
// import "../components/StickyInfo/StickyInfo.css";

export default function Layout(props) {
  // const navMenu = useRef();

  // console.log(props.navMenuOpen);

  // useEffect(() => {

  // }, []);

  // const openMenu = () => {
  //   if (navMenu && navMenu.current) {
  //     navMenu.current.classList.add("visible");
  //     document.body.style.overflow = "hidden";
  //   }
  // };

  // const closeMenu = () => {
  //   if (navMenu && navMenu.current) {
  //     navMenu.current.classList.remove("visible");
  //     document.body.style.overflow = "auto";
  //   }
  // };

  const HamburgerMenuLinkClickWork = () => {
    props.logoXToggle();
    // console.log("WERK")
    // document.getElementById("checkbox3").checked = false;
    props.setShowHamburger("hamburger__holder hidden");
    document.body.style.overflow = "auto";
    props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
    props.setMobileIntro("mobile-logo-home__container hide");
    setTimeout(() => {
      // console.log("Should be hidden...")
      props.setMobileIntro("mobile-logo-home__container hide none");
      props.setShowHamburger("hamburger__holder");
      props.setFadeInText("inline");
    }, 1000);
  };

  const HamburgerMenuLinkClickAbout = () => {
    // props.setShowHamburger("hamburger__holder")
    //     document.getElementById("checkbox3").checked = false;
    props.setShowHamburger("hamburger__holder hidden");
    document.body.style.overflow = "auto";
    props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setTimeout(() => {
      props.logoXToggle();
      props.setShowHamburger("hamburger__holder");
    }, 2500);
  };

  const hideStickyInfo = () => {
    props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
    props.setVisible(false);
  };

  return (
    <div style={{ height: "100%" }}>
      {/* {window.location.pathname === "/about" ? ( */}
      <NavBar
        // homeClick={props.homeClick}
        // setScroll={props.setScroll}
        // setVisible={props.setVisible}
        // setNavColor={props.setNavColor}
        // hideStickyInfo={hideStickyInfo}
        // visible={props.visible}
        // isVis={props.stickyisVis}
        // cursorUrl="https://res.cloudinary.com/bobalobbadingdong/image/upload/v1670881191/Cherry/Cherry%20Clients/Graphic%20Assets/MELT-Yellow-ICON-BIG-PLUS_gsiugq"
        // color={props.navTextColor}
        // text="ABOUT"
        // linkTo="/about"
        // navColorTheme={props.navColorTheme}
        // setNavColorTheme={props.setNavColorTheme}
        viewport={props.viewport}
        widthCutOff={props.widthCutOff}
        scrollCutOff={props.scrollCutOff}
      />
      {/* ) : (
          <DrippyAndAboutNav
            homeClick={props.homeClick}
            setScroll={props.setScroll}
            setVisible={props.setVisible}
            setNavColor={props.setNavColor}
            hideStickyInfo={hideStickyInfo}
            visible={props.visible}
            isVis={props.stickyisVis}
            cursorUrl="https://res.cloudinary.com/bobalobbadingdong/image/upload/v1670881191/Cherry/Cherry%20Clients/Graphic%20Assets/MELT-Yellow-ICON-BIG-PLUS_gsiugq"
            color={props.navTextColor}
            text="ABOUT"
            linkTo="/about"
            navColorTheme={props.navColorTheme}
            setNavColorTheme={props.setNavColorTheme}
          />
        )} */}

      {/* <div className={props.showHamburger}> */}
      <NavMenuLogo
        // showHamburger={props.showHamburger}
        // setIsVis={props.sethamburgerMenuIsVis}
        // setShowHamburger={props.setShowHamburger}
        // hamburgerClick={hamburgerClick}
        // openMenu={openMenu}
        // logoForNavHamburger={props.logoForNavHamburger}
        // navMenuRef={navMenu}
        setNavMenuOpen={props.setNavMenuOpen}
        viewport={props.viewport}
        widthCutOff={props.widthCutOff}
        scrollCutOff={props.scrollCutOff}
        // navMenuLogoShow={props.navMenuLogoShow}
      />

      {/* <div className={props.hamburgerMenuIsVis}> */}

      {/* {props.navMenuOpen && (}
        // <div ref={navMenu} className="hamburger-menu"> */}
      <NavMenu
        // setFadeInText={props.setFadeInText}
        // setShowHamburger={props.setShowHamburger}
        // HamburgerMenuLinkClickAbout={HamburgerMenuLinkClickAbout}
        // HamburgerMenuLinkClickWork={HamburgerMenuLinkClickWork}
        // closeMenu={closeMenu}
        navMenuOpen={props.navMenuOpen}
        setNavMenuOpen={props.setNavMenuOpen}
      />
      {/* )} */}

      <main>{props.children}</main>
    </div>
  );
}

// {window.location.pathname === "/about" ? (
//   <DrippyAndAboutNavForAbout
//   homeClick={props.homeClick}
//   setScroll={props.setScroll}
//   setVisible={props.setVisible}
//   setNavColor={props.setNavColor}
//   hideStickyInfo={hideStickyInfo}
//   visible={props.visible}
//   isVis={props.stickyisVis}
//   cursorUrl="https://res.cloudinary.com/bobalobbadingdong/image/upload/v1670881191/Cherry/Cherry%20Clients/Graphic%20Assets/MELT-Yellow-ICON-BIG-PLUS_gsiugq"
//   color={props.navTextColor}
//   text="ABOUT"
//   linkTo="/about"
//   navColorTheme={props.navColorTheme}
//   setNavColorTheme={props.setNavColorTheme}
// />
// ): (
// )}
