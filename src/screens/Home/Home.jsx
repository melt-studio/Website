import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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
  const [loaded, setLoaded] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    document.body.classList.add("home-page");

    if (cursor && cursor.current) {
      if (cursor && cursor.current) {
        cursor.current.style.opacity = 0;
      }
      cursor.current.classList.remove("link");
      cursor.current.classList.remove("video");
    }

    return () => {
      document.body.classList.remove("home-page");
    };
  }, [cursor]);

  useEffect(() => {
    if (initial) {
      window.scrollTo(0, 0);
    } else {
      if (loaded && scroll > 0) {
        // Only scroll to project if coming from project page
        if (history && history.length > 1 && history[1].includes("/project/")) {
          window.scrollTo(0, scroll);
        }
      }
    }
  }, [initial, loaded, scroll, history]);

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
      {mobile && <IntroAnimation initial={initial} setInitial={setInitial} mobile={mobile} viewport={viewport} />}

      <Page
        onAnimationComplete={() => {
          if (cursor && cursor.current) {
            cursor.current.style.opacity = 1;
          }
        }}
      >
        {projects.length && <Background backgroundColor={backgroundColor} />}
        {!mobile && (
          <div className="logo-animation">
            <LogoAnimation serverConfig={config} fade={fadeAnimation} />
          </div>
        )}
        {projects.length && (
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
        )}
      </Page>
    </>
  );
}
