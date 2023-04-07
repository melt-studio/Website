import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./layouts/MainLayout.jsx";
import MainContainer from "./containers/MainContainer.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import "./App.css";

import configService from "./services/config";
import projectService from "./services/projects";
import aboutService from "./services/about";
import miscService from "./services/misc";

function App() {
  const widthCutOff = 800;

  const [config, setConfig] = useState([]);
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});
  const [miscInfo, setMiscInfo] = useState([]);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mobile, setMobile] = useState(viewport.width < widthCutOff);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [initial, setInitial] = useState(true);
  const [history, setHistory] = useState([]);
  const [scroll, setScroll] = useState(0);

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
    setMobile(viewport.width < widthCutOff);
  }, [viewport.width, widthCutOff]);

  useEffect(() => {
    setInitial(mobile && initial ? true : false);
  }, [mobile, initial]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await projectService.getProjects();
        setProjects(response);
      } catch (error) {
        console.log(error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getAboutInfo = async () => {
      try {
        const response = await aboutService.getAbout();
        setAboutInfo(response);
      } catch (error) {
        console.log(error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getMiscInfo = async () => {
      try {
        const response = await miscService.getMisc();
        setMiscInfo(response);
      } catch (error) {
        console.log(error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getConfig = async () => {
      try {
        const response = await configService.getConfig();
        console.log(response);
        setConfig(response);
      } catch (error) {
        console.log(error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    getProjects();
    getAboutInfo();
    getMiscInfo();
    getConfig();
  }, []);

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
      >
        <MainContainer
          initial={initial}
          setInitial={setInitial}
          projects={projects}
          aboutInfo={aboutInfo}
          miscInfo={miscInfo}
          config={config}
          cursor={cursor}
          mobile={mobile}
          viewport={viewport}
          scroll={scroll}
          setScroll={setScroll}
          history={history}
        />
      </Layout>
      {!mobile && <Cursor ref={cursor} />}
    </>
  );
}

export default App;
