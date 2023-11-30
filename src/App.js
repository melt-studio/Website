import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./layouts/MainLayout.jsx";
import MainContainer from "./containers/MainContainer.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import "./App.css";

import configService from "./services/config";
import projectService from "./services/projects";
import aboutService from "./services/about";
import embedService from "./services/embeds";
import loginService from "./services/login.js";
import otherService from "./services/other.js";
import menuService from "./services/menu.js";

// import favicon from "./favicon.ico";

function App() {
  const widthCutOff = 800;

  const [config, setConfig] = useState([]);
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState([]);
  const [menuInfo, setMenuInfo] = useState([]);
  const [embeds, setEmbeds] = useState([]);
  const [other, setOther] = useState([]);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mobile, setMobile] = useState(viewport.width < widthCutOff);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [initial, setInitial] = useState(true);
  const [history, setHistory] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [title, setTitle] = useState("MELT");
  const [projectTags, setProjectTags] = useState([]);

  const location = useLocation();

  const scrollCutOff = useMemo(() => {
    return viewport.height * 0.8;
  }, [viewport]);

  useEffect(() => {
    setHistory((h) => [location.pathname, ...h]);
  }, [location]);

  const cursor = useRef();

  useEffect(() => {
    const handleResize = () => {
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

  useEffect(() => {
    const password = window.localStorage.getItem("melt_admin_password");

    const login = async (password) => {
      try {
        await loginService.login(password);
        setLoggedIn(true);
        document.body.classList.add("logged-in");
      } catch (error) {
        setLoggedIn(false);
        window.localStorage.removeItem("melt_admin_password");
        document.body.classList.remove("logged-in");
      }
    };

    if (password) login(password);
  }, []);

  useEffect(() => {
    setMobile(viewport.width < widthCutOff);
  }, [viewport.width, widthCutOff]);

  useEffect(() => {
    setInitial(mobile && initial ? true : false);
  }, [mobile, initial]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await projectService.getProjects();
        const sortedProjects = response.map((r) => r).sort((a, b) => a.fields.order - b.fields.order);
        setProjects(sortedProjects);
      } catch (error) {
        console.log("Projects", error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getAboutInfo = async () => {
      try {
        const response = await aboutService.getAbout();
        setAboutInfo(response);
      } catch (error) {
        console.log("About", error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getEmbeds = async () => {
      try {
        const response = await embedService.getEmbeds();
        setEmbeds(response);
      } catch (error) {
        console.log("Embeds", error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getConfig = async () => {
      try {
        const response = await configService.getConfig();
        setConfig(response);
      } catch (error) {
        console.log("Config", error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getOther = async () => {
      try {
        const response = await otherService.getOther();
        setOther(response);
      } catch (error) {
        console.log("Other", error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getMenu = async () => {
      try {
        const response = await menuService.getMenu();
        setMenuInfo(response);
        console.log(response);
      } catch (error) {
        console.log("Other", error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    getProjects();
    getAboutInfo();
    getEmbeds();
    getConfig();
    getOther();
    getMenu();
  }, []);

  useEffect(() => {
    if (other.length > 0) {
      if (other[0].fields) {
        const { homeTitle, favicon } = other[0].fields;

        if (homeTitle) setTitle(homeTitle);

        if (favicon[0] && favicon[0].url && favicon[0].type === "image/vnd.microsoft.icon") {
          let link = document.querySelector("link[rel=icon]");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
          }
          link.href = favicon[0].url;
        }
      }
    }
  }, [other]);

  useEffect(() => {
    if (projects.length > 0) {
      // Get tag options from project data - ignore undefined, blank, non string tags
      const tags = projects
        .filter((p) => p.fields.tag !== undefined && typeof p.fields.tag === "string" && p.fields.tag.trim().length > 0)
        .map((p) => p.fields.tag);

      const tagSet = new Set(tags);
      // console.log(tagSet);
      setProjectTags([...tagSet]);
    }
  }, [projects]);

  return (
    <>
      <Layout
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
        cursor={cursor}
        mobile={mobile}
        viewport={viewport}
        scrollCutOff={scrollCutOff}
        initial={initial}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        projects={projects}
        pageIsLoading={pageIsLoading}
        menuInfo={menuInfo}
        projectTags={projectTags}
      >
        <MainContainer
          initial={initial}
          setInitial={setInitial}
          projects={projects}
          aboutInfo={aboutInfo}
          embeds={embeds}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          config={config}
          cursor={cursor}
          mobile={mobile}
          viewport={viewport}
          scroll={scroll}
          setScroll={setScroll}
          history={history}
          scrollCutOff={scrollCutOff}
          setPageIsLoading={setPageIsLoading}
          title={title}
          projectTags={projectTags}
        />
      </Layout>
      {!mobile && <Cursor ref={cursor} />}
    </>
  );
}

export default App;
