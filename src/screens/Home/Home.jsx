import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Helmet } from "react-helmet";
import Background from "../../components/Background/Background";
import IntroAnimation from "../../components/IntroAnimation/IntroAnimation.jsx";
import ProjectTiles from "../../components/ProjectTiles/ProjectsTiles.jsx";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import Page from "../Page";
import "./Home.css";

export default function Home({
  initial,
  setInitial,
  projects,
  config,
  cursor,
  mobile,
  viewport,
  scroll,
  setScroll,
  history,
}) {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const [fromProject, setFromProject] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    document.body.classList.add("home-page");

    // Update root project-color CSS variable
    document.documentElement.style.setProperty("--text-color", "#ffffff");

    // if (cursor && cursor.current) {
    //   if (cursor && cursor.current) {
    //     cursor.current.style.opacity = 0;
    //   }
    //   // cursor.current.classList.remove("link");
    //   // cursor.current.classList.remove("video");
    //   cursor.current.className = "cursor";
    // }

    // console.log("HOME mount");

    return () => {
      document.body.classList.remove("home-page");

      // console.log("HOME unmount");

      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      // setTimeout(() => window.scrollTo(0, 0), 1);
      // window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (cursor.current) {
      cursor.current.style.removeProperty("background-color");
      cursor.current.className = "cursor";
    }
  }, [cursor]);

  useEffect(() => {
    if (initial) {
      window.scrollTo(0, 0);
    } else {
      if (loaded && scroll > 0) {
        // Only scroll to project if coming from project page
        if (history && history.length > 1 && history[1].includes("/project/")) {
          // console.log("scrolling to", scroll);
          window.scrollTo(0, scroll);
          // NB: Chrome retains previous scroll positon using back navigation, however this happens instantly / before project page has faded out, so get "jump" in content
        }
      }
    }
  }, [initial, loaded, scroll, history]);

  // useEffect(() => {
  //   console.log("loaded!", loaded);
  // }, [loaded]);

  useEffect(() => {
    if (history && history.length > 1 && history[1].includes("/project/")) {
      setFromProject(true);
    } else {
      setFromProject(false);
    }
  }, [history]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobile) return;

    const s = viewport.height / 2.5;

    if (latest >= s) {
      setFadeAnimation(true);
    } else {
      setFadeAnimation(false);
    }
  });

  return (
    <>
      <Helmet>
        <title>MELT • a creative design studio</title>
      </Helmet>

      {mobile && <IntroAnimation initial={initial} setInitial={setInitial} mobile={mobile} viewport={viewport} />}

      <Page
      // onAnimationComplete={() => {
      //   if (cursor && cursor.current) {
      //     cursor.current.style.opacity = 1;
      //   }
      // }}
      // style={{ minHeight: "100dvh" }}
      >
        {!mobile && projects.length > 0 ? <Background backgroundColor={backgroundColor} /> : null}
        {!mobile && (
          <div className="logo-animation">
            <LogoAnimation
              serverConfig={config}
              fade={fadeAnimation}
              fromProject={fromProject}
              cursor={cursor}
              // projectsLoaded={loaded}
            />
          </div>
        )}
        {projects.length > 0 ? (
          <ProjectTiles
            setLoaded={setLoaded}
            projects={projects}
            // setBackgroundImage={setBackgroundImage}
            setBackgroundColor={setBackgroundColor}
            cursor={cursor}
            mobile={mobile}
            viewport={viewport}
            setScroll={setScroll}
          />
        ) : null}
      </Page>
    </>
  );
}
