import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Helmet } from "react-helmet";
import Background from "../../components/Background/Background";
import IntroAnimation from "../../components/IntroAnimation/IntroAnimation.jsx";
import ProjectTiles from "../../components/ProjectTiles/ProjectsTiles.jsx";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import Page from "../Page";
// import Scroll from "../../components/Scroll/Scroll";
import "./Home.css";
import { useSearchParams } from "react-router-dom";
import Marquee from "react-fast-marquee";

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
  title,
  aboutInfo,
}) {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const [fromProject, setFromProject] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [aboutTextNav, setAboutTextNav] = useState(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    document.body.classList.add("home-page");

    // Update root project-color CSS variable
    document.documentElement.style.setProperty("--text-color", "#ffffff");

    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  useEffect(() => {
    if (cursor.current) {
      cursor.current.style.removeProperty("background-color");
      cursor.current.className = "cursor";
    }
  }, [cursor]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     document.body.style.height = "101vh";
  //   }, 3000);
  // }, []);

  useEffect(() => {
    if (initial) {
      window.scrollTo(0, 0);
    } else {
      if (loaded && scroll > 0) {
        // Only scroll to project if coming from project page
        if (history && history.length > 1 && history[1].includes("/project/")) {
          window.scrollTo(0, scroll);
          // NB: Chrome retains previous scroll positon using back navigation, however this happens instantly / before project page has faded out, so get "jump" in content
        }
      }
    }
  }, [initial, loaded, scroll, history]);

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

  useEffect(() => {
    if (aboutInfo) {
      if (aboutInfo.length) {
        const { aboutTextNav } = aboutInfo[0].fields;
        setAboutTextNav(aboutTextNav);
      }
    }
  }, [aboutInfo]);

  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  let filteredProjects = projects;
  if (filter !== null) {
    const f = filter.toLowerCase().trim();
    if (["print", "gfx"].includes(f))
      filteredProjects = projects.filter((p) => p.fields.tag !== undefined && p.fields.tag.toLowerCase().trim() === f);
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {mobile && <IntroAnimation initial={initial} setInitial={setInitial} mobile={mobile} viewport={viewport} />}

      {/* {!mobile && <Scroll scroll={scroll} loaded={loaded} />} */}

      <Page>
        {!mobile && projects.length > 0 ? <Background backgroundColor={backgroundColor} /> : null}
        {!mobile && (
          <div className="logo-animation">
            <LogoAnimation serverConfig={config} fade={fadeAnimation} fromProject={fromProject} cursor={cursor} />
            {aboutTextNav && (
              <div className={`intro-text${loaded ? "" : " loading"}`}>
                <Marquee speed={60}>{`${aboutTextNav}\u00A0\u00A0\u00A0`}</Marquee>
              </div>
            )}
          </div>
        )}
        {filteredProjects.length > 0 ? (
          <ProjectTiles
            setLoaded={setLoaded}
            projects={filteredProjects}
            projectsAll={projects}
            setBackgroundColor={setBackgroundColor}
            cursor={cursor}
            mobile={mobile}
            viewport={viewport}
            setScroll={setScroll}
            filtered={filteredProjects.length !== projects.length}
          />
        ) : null}
      </Page>
    </>
  );
}
