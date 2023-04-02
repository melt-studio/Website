import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import MainContainer from "./containers/MainContainer";
import Layout from "./layouts/MainLayout.jsx";
import Background from "./components/Background/Background";

import { getAllProjects } from "./services/projects";
import { getAllAboutInfo } from "./services/about";
import { getAllMiscInfo } from "./services/miscPages";

import Cursor from "./components/Cursor/Cursor";
import { useLocation } from "react-router-dom";

function App() {
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});
  const [miscPageInfo, setMiscPageInfo] = useState([]);
  const [navTextColor, setNavColor] = useState("white");
  const [visible, setVisible] = useState(false);
  const [hamburgerMenuIsVis, sethamburgerMenuIsVis] = useState("hamburger-menu-not-visible");
  const [showHamburger, setShowHamburger] = useState("hamburger__holder hidden"); ///hidden
  const [scroll, setScroll] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [navColorTheme, setNavColorTheme] = useState("nav__with__footer__hover-effect");

  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const location = useLocation();

  const widthCutOff = useMemo(() => {
    return 800;
  }, []);

  const scrollCutOff = useMemo(() => {
    return viewport.height * 0.8;
  }, [viewport]);

  useEffect(() => {
    const handleResize = () => {
      console.log("viewport");
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const homeClick = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const cursor = useRef();

  useEffect(() => {
    const fetchProjects = async () => {
      const projArray = await getAllProjects();
      setProjects(projArray);
    };

    const fetchAboutInfo = async () => {
      const aboutInfo = await getAllAboutInfo();
      setAboutInfo(aboutInfo);
    };

    const fetchMiscPageInfo = async () => {
      const miscInfo = await getAllMiscInfo();
      setMiscPageInfo(miscInfo);
    };

    fetchProjects();
    fetchAboutInfo();
    fetchMiscPageInfo();
  }, []);

  const background = useRef();
  const background1 = useRef();
  const background2 = useRef();
  useEffect(() => {
    const color = backgroundColor;
    let c = [];
    if (color && typeof color === "string" && color.length > 0) {
      c = color.split(",").map((hex) => hex.trim());
    }

    if (background1 && background1.current) {
      if (c[0]) {
        background1.current.style.backgroundColor = c[0];
      } else {
        background1.current.style.backgroundColor = "#000000";
      }
    }

    if (background2 && background2.current) {
      if (c[1]) {
        background2.current.style.backgroundColor = c[1];
      } else {
        background2.current.style.backgroundColor = background1.current.style.backgroundColor;
      }
    }

    // if (background2.current) {
    //   background2.current.style.backgroundColor = backgroundColor;
    // }
    // console.log(backgroundColor);
    // document.body.style.backgroundColor = backgroundColor;
    // setBackground(backgroundColor, background);
  }, [backgroundColor]);

  return (
    <>
      {location.pathname === "/" && (
        <>
          <div id="background">
            <div ref={background1}></div>
            <div ref={background2}></div>
          </div>
          <Background background={background} background1={background1} background2={background2} />
        </>
      )}
      <Layout
        // logoForNavHamburger={logoForNavHamburger}
        hamburgerMenuIsVis={hamburgerMenuIsVis}
        sethamburgerMenuIsVis={sethamburgerMenuIsVis}
        setScroll={setScroll}
        showHamburger={showHamburger}
        setShowHamburger={setShowHamburger}
        setVisible={setVisible}
        visible={visible}
        navTextColor={navTextColor}
        setNavColor={setNavColor}
        navColorTheme={navColorTheme}
        setNavColorTheme={setNavColorTheme}
        homeClick={homeClick}
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
        cursor={cursor}
        viewport={viewport}
        widthCutOff={widthCutOff}
        scrollCutOff={scrollCutOff}
      >
        <MainContainer
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          scroll={scroll}
          showHamburger={showHamburger}
          setShowHamburger={setShowHamburger}
          aboutInfo={aboutInfo}
          navTextColor={navTextColor}
          setVisible={setVisible}
          projects={projects}
          setNavColor={setNavColor}
          clicks={clicks}
          setClicks={setClicks}
          miscPageInfo={miscPageInfo}
          cursor={cursor}
          viewport={viewport}
          widthCutOff={widthCutOff}
        />
      </Layout>
      {viewport.width >= widthCutOff && <Cursor ref={cursor} />}
    </>
  );
}

export default App;
