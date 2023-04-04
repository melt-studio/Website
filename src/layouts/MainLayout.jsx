import React from "react";
import "./MainLayout.css";
import Hamburger from "../components/Hamburger/Hamburger";
import HamburgerMenu from "../components/HamburgerMenu/HamburgerMenu";
import DrippyAndAboutNav from "../components/NavBar/DrippyAndAboutNav/DrippyAndAboutNav";
import DrippyAndAboutNavForAbout from "../components/NavBar/DrippyAndAboutNavForAbout/DrippyAndAboutNavForAbout";

export default function Layout(props) {
  const hamburgerClick = () => {
    props.logoXToggle();
    // console.log("Click")
    if (props.hamburgerMenuIsVis === "hamburger-menu-visible") {
      props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
      document.body.style.overflow = "auto";
      // enableScroll()
    } else {
      props.sethamburgerMenuIsVis("hamburger-menu-visible");
      // disableScroll()
      document.body.style.overflow = "hidden";
    }
  };

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
      <nav style={{ display: "none", pointerEvents: "none" }}>
        <div className="sticky-info-holder">
          {window.location.pathname === "/about" ? (
            <DrippyAndAboutNavForAbout
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
          ) : (
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
          )}
        </div>
        <div className={props.hamburgerMenuIsVis}>
          <HamburgerMenu
            setFadeInText={props.setFadeInText}
            setShowHamburger={props.setShowHamburger}
            HamburgerMenuLinkClickAbout={HamburgerMenuLinkClickAbout}
            HamburgerMenuLinkClickWork={HamburgerMenuLinkClickWork}
          />
        </div>
        <div className={props.showHamburger}>
          <Hamburger
            showHamburger={props.showHamburger}
            setIsVis={props.sethamburgerMenuIsVis}
            setShowHamburger={props.setShowHamburger}
            hamburgerClick={hamburgerClick}
            logoForNavHamburger={props.logoForNavHamburger}
          />
        </div>
      </nav>

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
