import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./layouts/MainLayout.jsx";
import MainContainer from "./containers/MainContainer.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import "./App.css";

import configService from "./services/config";
import projectService from "./services/projects";
import aboutService from "./services/about";
import embedService from "./services/embeds";
import loginService from "./services/login.js";

function App() {
  const widthCutOff = 800;

  const [config, setConfig] = useState([]);
  const [projects, setProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState([]);
  const [embeds, setEmbeds] = useState([]);
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mobile, setMobile] = useState(viewport.width < widthCutOff);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [initial, setInitial] = useState(true);
  const [history, setHistory] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

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

    // const login = (password) => {
    //   if (password === process.env.REACT_APP_MELT_PASSWORD) {
    //     setLoggedIn(true);
    //     document.body.classList.add("logged-in");
    //   } else {
    //     setLoggedIn(false);
    //     window.localStorage.removeItem("melt_admin_password");
    //     document.body.classList.remove("logged-in");
    //   }
    // };

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

    const getEmbeds = async () => {
      try {
        const response = await embedService.getEmbeds();
        setEmbeds(response);
      } catch (error) {
        console.log(error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    const getConfig = async () => {
      try {
        const response = await configService.getConfig();
        // console.log(response);
        setConfig(response);
      } catch (error) {
        console.log(error.response.data.error ? error.response.data.error : "Server error");
      }
    };

    getProjects();
    getAboutInfo();
    getEmbeds();
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
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        projects={projects}
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
        />
      </Layout>
      {!mobile && <Cursor ref={cursor} />}
      {loggedIn && <AdminNav />}
    </>
  );
}

const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const excludes = ["/admin"];
  if (excludes.some((ex) => location.pathname.includes(ex))) return null;

  return <div onClick={() => navigate("/admin")} id="admin-nav"></div>;
};

export default App;
