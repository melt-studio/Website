import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Helmet } from "react-helmet";
import Background from "../../components/Background/Background";
import IntroAnimation from "../../components/IntroAnimation/IntroAnimation.jsx";
import ProjectTiles from "../../components/ProjectTiles/ProjectsTiles.jsx";
import LogoAnimation from "../../components/LogoAnimation/index.jsx";
import Page from "../Page";
import Scroll from "../../components/Scroll/Scroll";
import "./Home.css";
import { useSearchParams } from "react-router-dom";
// import Marquee from "react-fast-marquee";

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
  projectTags,
  other,
  setPageIsLoading,
  navMenuOpen,
}) {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [fadeAnimation, setFadeAnimation] = useState(false);
  const [fromProject, setFromProject] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [fromNav, setFromNav] = useState(false);

  const { scrollY } = useScroll();

  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  let filteredProjects = projects;
  if (filter !== null && projectTags.length > 0) {
    const f = filter.toLowerCase().trim();
    if (projectTags.map((t) => t.toLowerCase()).includes(f)) {
      filteredProjects = projects.filter((p) => p.fields.tag !== undefined && p.fields.tag.toLowerCase().trim() === f);
      projectTags
        .map((t) => t.toLowerCase())
        .forEach((tag) => {
          document.body.classList.remove(`filter-${tag}`);
        });
      document.body.classList.add("filtered", `filter-${f}`);
    } else {
      document.body.classList.remove("filtered");
    }
  } else {
    document.body.classList.remove("filtered");
    projectTags
      .map((t) => t.toLowerCase())
      .forEach((tag) => {
        document.body.classList.remove(`filter-${tag}`);
      });
  }

  const filtered = filteredProjects.length !== projects.length;

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
    // console.log(history);
    // if (history.length > 1 && history[0] !== history[1]) {
    if (history.length > 1) {
      document.body.classList.add("from-nav");
      // if (document.body.classList.contains("nav-menu-open")) setFromNav(true);
    }

    return () => {
      document.body.classList.remove("from-nav");
      // setFromNav(false);
    };
  }, [history]);

  useEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    if (loaded) {
      // window.scrollTo(0, 0);
      setPageIsLoading(false);
    }
  }, [loaded, setPageIsLoading]);

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
      // console.log("scrolling to 0 0");
      // console.log("scrolling to 0 0 initial");
      window.scrollTo(0, 0);
    } else {
      if (loaded) {
        // Only scroll to project if coming from project page
        // NB: Chrome retains previous scroll positon using back navigation, however this happens instantly / before project page has faded out, so get "jump" in content

        if (!document.body.classList.contains("filtered")) {
          if (
            history &&
            history.length > 1 &&
            history[1].includes("/project/") &&
            history[0] === history[2] &&
            scroll > 0
          ) {
            // console.log("scrolling to", scroll);
            window.scrollTo(0, scroll);
          }
        } else {
          // if (!mobile && history && history.length > 1 && history[0] !== history[1]) {
          if (!mobile && history && history.length > 1) {
            // console.log("scrolling to window.innerHeight * 0.9");
            window.scrollTo(0, window.innerHeight * 0.9);
          }
        }
      }
    }
  }, [initial, loaded, scroll, history, mobile]);

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
        <title>{title}</title>
      </Helmet>

      {mobile && <IntroAnimation initial={initial} setInitial={setInitial} mobile={mobile} viewport={viewport} />}

      {!mobile && <Scroll scroll={scroll} loaded={loaded} other={other} />}

      <Page>
        {!mobile && projects.length > 0 ? <Background backgroundColor={backgroundColor} /> : null}
        {!mobile && (
          <div className="logo-animation">
            <LogoAnimation serverConfig={config} fade={fadeAnimation} fromProject={fromProject} cursor={cursor} />
          </div>
        )}
        {filteredProjects.length > 0 ? (
          <ProjectTiles
            setLoaded={setLoaded}
            projects={filteredProjects}
            projectsAll={projects}
            setBackgroundColor={setBackgroundColor}
            cursor={cursor}
            history={history}
            mobile={mobile}
            viewport={viewport}
            setScroll={setScroll}
            filtered={filtered}
            navMenuOpen={navMenuOpen}
            // key={`projectTiles${filtered ? "-filtered" : ""}-${filtered ? filter : ""}`}
          />
        ) : null}
      </Page>
    </>
  );
}
