import { useState, useEffect } from "react";
import Background from "../../components/Background/Background";
import IntroAnimation from "../../components/IntroAnimation/IntroAnimation.jsx";
import ProjectTiles from "../../components/ProjectTiles/ProjectsTiles.jsx";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import "./Home.css";

export default function Home({ initial, setInitial, projects, cursor, viewport, widthCutOff, scroll, setScroll }) {
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
        window.scrollTo(0, scroll);
      }
    }
  }, [initial, loaded, scroll]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (viewport.width < widthCutOff) return;

    const s = viewport.height / 2.5;

    if (latest >= s) {
      setFadeAnimation(true);
    } else {
      setFadeAnimation(false);
    }
  });

  return (
    <>
      <IntroAnimation initial={initial} setInitial={setInitial} viewport={viewport} widthCutOff={widthCutOff} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        exit={{ opacity: [1, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.25 }}
        onAnimationComplete={() => {
          if (cursor && cursor.current) {
            cursor.current.style.opacity = 1;
          }
        }}
        className="page"
      >
        {projects.length && <Background backgroundColor={backgroundColor} />}

        {viewport.width >= widthCutOff && (
          <div className="logo-animation">
            <LogoAnimation fade={fadeAnimation} />
          </div>
        )}

        {projects.length && (
          <ProjectTiles
            setLoaded={setLoaded}
            projects={projects}
            // setBackgroundImage={setBackgroundImage}
            setBackgroundColor={setBackgroundColor}
            cursor={cursor}
            viewport={viewport}
            widthCutOff={widthCutOff}
            setScroll={setScroll}
          />
        )}
      </motion.div>
    </>
  );
}
