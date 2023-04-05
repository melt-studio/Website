import { useState, useEffect, useRef, useMemo } from "react";
import Layout from "./layouts/MainLayout.jsx";
import MainContainer from "./containers/MainContainer.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import "./App.css";

import projectService from "./services/projects";
import aboutService from "./services/about";
import miscService from "./services/misc";
// import { useLocation } from "react-router-dom";

function App() {
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});
  const [miscInfo, setMiscInfo] = useState([]);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [initial, setInitial] = useState(true);
  const [scroll, setScroll] = useState(0);

  // console.log(location);

  // const overlay = useRef();

  // useEffect(() => {
  //   // eslint-disable-next-line no-restricted-globals
  //   console.log(history);
  //   console.log(location);
  //   console.log(location.state);
  // }, [location]);

  // useEffect(() => {
  //   console.log(scroll);
  // }, [scroll]);

  // useEffect(() => {
  //   if (location.pathname === "/" && initial) {
  //     setInitial(false);
  //   }
  // }, [location, initial]);

  const cursor = useRef();

  const widthCutOff = useMemo(() => {
    return 800;
  }, []);

  const scrollCutOff = useMemo(() => {
    return viewport.height * 0.8;
  }, [viewport]);

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

    getProjects();
    getAboutInfo();
    getMiscInfo();
  }, []);

  return (
    <>
      <Layout
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
        cursor={cursor}
        viewport={viewport}
        widthCutOff={widthCutOff}
        scrollCutOff={scrollCutOff}
      >
        <MainContainer
          initial={initial}
          setInitial={setInitial}
          projects={projects}
          aboutInfo={aboutInfo}
          miscInfo={miscInfo}
          cursor={cursor}
          viewport={viewport}
          widthCutOff={widthCutOff}
          scroll={scroll}
          setScroll={setScroll}
        />
      </Layout>
      {viewport.width >= widthCutOff && <Cursor ref={cursor} />}
    </>
  );
}

export default App;
