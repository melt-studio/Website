import { useState, useEffect } from "react";
import Background from "../../components/Background/Background";
import IntroAnimation from "../../components/IntroAnimation/IntroAnimation.jsx";
import Projects from "../../components/Projects/Projects";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import { useFadeEffect } from "../../components/helpers/fadeEffect.js";
import { useScroll, useMotionValueEvent } from "framer-motion";
import "./Home.css";
// import FadeScroll from "../../components/FadeScroll/FadeScroll";

export default function Home({ projects, cursor, viewport, widthCutOff }) {
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  const { effectRef, updateFadeEffect } = useFadeEffect();
  const { scrollY } = useScroll();

  useEffect(() => {
    document.body.classList.add("home-page");

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (viewport.width < widthCutOff) return;

    const s = viewport.height / 2.5;

    if (latest >= s) {
      updateFadeEffect(1);
    } else if (latest < s) {
      updateFadeEffect(0);
    }
  });

  return (
    <div className="page">
      {projects.length && <Background backgroundColor={backgroundColor} />}

      <IntroAnimation viewport={viewport} widthCutOff={widthCutOff} />

      {viewport.width >= widthCutOff && (
        <div className="logo-animation">
          <LogoAnimation effectRef={effectRef} />
        </div>
      )}

      {/* <FadeScroll viewport={{ amount: 0.9 }} onEnter={() => console.log("enter")} onExit={() => console.log("exit")}> */}
      {projects.length && (
        <Projects
          projects={projects}
          // setBackgroundImage={setBackgroundImage}
          setBackgroundColor={setBackgroundColor}
          cursor={cursor}
          viewport={viewport}
          widthCutOff={widthCutOff}
        />
      )}
      {/* </FadeScroll> */}
    </div>
  );
}
