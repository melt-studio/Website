import React, { useState, useEffect } from "react";
import "./App.css";
import MainContainer from "./containers/MainContainer";
import Layout from "./layouts/MainLayout.jsx";

import { getAllProjects } from "./services/projects";
import { getAllAboutInfo } from "./services/about";
// import { getAllUnofficials } from "./services/unofficials";
import { getAllMiscInfo } from "./services/miscPages";

import MeltLogo from "./assets/images/Logo/MELT_LOGO WHT_SM.png";
import xForOpenMenu from "./assets/Cursors/MELT_WEBSITE ICONS__X.png";

const unofficials = [];
function App() {
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});
  // const [unofficials, setUnofficials] = useState([]);
  const [miscPageInfo, setMiscPageInfo] = useState([]);
  const [navTextColor, setNavColor] = useState("white");
  const [stickyisVis, setStickyIsVis] = useState("sticky-info");
  const [visible, setVisible] = useState(false);
  const [hamburgerMenuIsVis, sethamburgerMenuIsVis] = useState(
    "hamburger-menu-not-visible"
  );
  // const [lastKnownScrollPosition, setLastKnownScrollPosition] = useState(0);
  const [showHamburger, setShowHamburger] = useState(
    "hamburger__holder hidden"
  ); ///hidden
  // const [ticking, setTicking] = useState(false);
  const [projectBackgroundColors, setColors] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [mobileIntroLogo, setMobileIntroLogo] = useState(
    "drippy-logo__mobile-intro"
  );
  const [fadeInText, setFadeInText] = useState("none"); //inline to activate
  const [clicks, setClicks] = useState(0);
  const [navColorTheme, setNavColorTheme] = useState(
    "nav__with__footer__hover-effect"
  );
  const [logoForNavHamburger, setLogoForNavHamburger] = useState(MeltLogo);
  // console.log("projects", projects)
  // console.log("backgroundColor", backgroundColor)

  const homeClick = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const logoXToggle = () => {
    if (logoForNavHamburger === MeltLogo) {
      setLogoForNavHamburger(xForOpenMenu);
    } else {
      setLogoForNavHamburger(MeltLogo);
    }
  };

  // useEffect(() => { ///// This is to show / hide nav bar Desktop
  //   function handleScroll() {
  //     setLastKnownScrollPosition(window.scrollY);
  //     if (!ticking) {
  //       if ( window.location.pathname !== "/working-components") {
  //         window.requestAnimationFrame(() => {
  //           if (lastKnownScrollPosition > window.scrollY) {
  //             // console.log('up');
  // setStickyIsVis("sticky-info")
  // setVisible(true)
  //           } else {
  //             // console.log('down');
  //              // setStickyIsVis("isNotVis")
  //             setVisible(false)
  //           }
  //           setTicking(false);
  //         });
  //         setTicking(true);
  //       }
  //       }

  //   }
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [lastKnownScrollPosition, ticking]);

  // console.log("navTextColor", navTextColor)
  useEffect(() => {
    const fetchProjects = async () => {
      const projArray = await getAllProjects();
      setProjects(projArray);
    };

    const fetchAboutInfo = async () => {
      const aboutInfo = await getAllAboutInfo();
      setAboutInfo(aboutInfo);
    };
    // const fetchUnofficials = async () => {
    //   const unofficialInfo = await getAllUnofficials();
    //   setUnofficials(unofficialInfo);
    // };

    const fetchMiscPageInfo = async () => {
      const miscInfo = await getAllMiscInfo();
      setMiscPageInfo(miscInfo);
    };

    fetchProjects();
    fetchAboutInfo();
    // fetchUnofficials()
    fetchMiscPageInfo();
    setTimeout(() => {
      setMobileIntroLogo("drippy-logo__mobile-intro-fade-in");

      setTimeout(() => {
        setMobileIntroLogo("drippy-logo__mobile-intro-fade-out");

        setTimeout(() => {
          setMobileIntroLogo("drippy-logo__mobile-intro-gone");
          setFadeInText("inline");
          // setTimeout(() => {
          // }, 500);
        }, 800);
      }, 3000);
    }, 1000);
  }, []);
  // console.log('App About', aboutInfo)
  setTimeout(() => {
    if (projects.length) {
      const theColors = projects.map((project) => project.fields.colorTheme);
      setColors(theColors);
      // console.log("projectBackgroundColors", projectBackgroundColors)
    }
  }, 2000);

  useEffect(() => {
    document.body.style.background = backgroundColor;
  }, [backgroundColor]);

  // console.log("miscPageInfo", miscPageInfo)
  return (
    <Layout
      logoForNavHamburger={logoForNavHamburger}
      hamburgerMenuIsVis={hamburgerMenuIsVis}
      sethamburgerMenuIsVis={sethamburgerMenuIsVis}
      fadeInText={fadeInText}
      setFadeInText={setFadeInText}
      setScroll={setScroll}
      showHamburger={showHamburger}
      setShowHamburger={setShowHamburger}
      setVisible={setVisible}
      visible={visible}
      stickyisVis={stickyisVis}
      setStickyIsVis={setStickyIsVis}
      navTextColor={navTextColor}
      setNavColor={setNavColor}
      // mobileIntro={mobileIntro}
      // setMobileIntro={setMobileIntro}
      navColorTheme={navColorTheme}
      setNavColorTheme={setNavColorTheme}
      homeClick={homeClick}
      logoXToggle={logoXToggle}
    >
      <MainContainer
        fadeInText={fadeInText}
        setFadeInText={setFadeInText}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        scroll={scroll}
        projectBackgroundColors={projectBackgroundColors}
        showHamburger={showHamburger}
        setShowHamburger={setShowHamburger}
        aboutInfo={aboutInfo}
        navTextColor={navTextColor}
        setStickyIsVis={setStickyIsVis}
        setVisible={setVisible}
        projects={projects}
        unofficials={unofficials}
        setNavColor={setNavColor}
        mobileIntroLogo={mobileIntroLogo}
        setMobileIntroLogo={setMobileIntroLogo}
        clicks={clicks}
        setClicks={setClicks}
        miscPageInfo={miscPageInfo}
      />
    </Layout>
  );
}

export default App;
