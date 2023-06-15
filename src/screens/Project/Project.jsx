import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import ProjectCover from "../../components/ProjectCover/ProjectCover.jsx";
import ProjectText from "../../components/ProjectText/ProjectText.jsx";
import ProjectImages from "../../components/ProjectImages/ProjectImages.jsx";
import ProjectNav from "../../components/ProjectNav/ProjectNav.jsx";
import Page from "../Page.jsx";
import "./Project.css";

const Project = ({ projects, cursor, mobile, viewport, history, setPageIsLoading }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [coverLoading, setCoverLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  const overlay = useRef();

  useEffect(() => {
    document.body.classList.add("project-page");

    // console.log("PROJECT mount");
    // window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove("project-page");

      // console.log(history);
      // console.log("PROJECT unmount");
    };
  }, []);

  useLayoutEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
    // console.log("loading", loading);
    // console.log("coverLoading", coverLoading);
    if (!loading && !coverLoading) {
      window.scrollTo(0, 0);
      setPageIsLoading(false);
    }
  }, [loading, coverLoading, setPageIsLoading]);

  useEffect(() => {
    if (cursor && cursor.current) {
      cursor.current.className = "cursor";
    }
  }, [cursor]);

  // useEffect(() => {
  //   console.log("coverLoading", coverLoading);
  // }, [coverLoading]);

  useEffect(() => {
    const updateProject = (project) => {
      setCoverLoading(true);
      setProject(project);

      // Update cursor color to current project color
      if (cursor && cursor.current) {
        cursor.current.style.backgroundColor = project.fields.cursorColor;
        Array.from(cursor.current.children).forEach((c) => (c.style.fill = project.fields.cursorColor));
      }

      // Update root project-color CSS variable
      document.documentElement.style.setProperty("--text-color", project.fields.colorText);
      document.documentElement.style.setProperty("--cursor-color", project.fields.cursorColor);

      // Instead of using order field just take array from airtable (assuming always returns in row order, then can just rearrange in airtable)
      const order = projects.indexOf(project);

      const prevProject = order === 0 ? projects[projects.length - 1] : projects[order - 1];
      if (prevProject) setPrev(prevProject);
      else setPrev(null);

      const nextProject = order === projects.length - 1 ? projects[0] : projects[order + 1];
      if (nextProject) setNext(nextProject);
      else setNext(null);

      setLoading(false);

      // // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      // // setTimeout(() => window.scrollTo(0, 0), 1);
      // window.scrollTo(0, 0);

      // setPageIsLoading(false);
    };

    if (projects.length > 0) {
      const project = projects.find((project) => project.fields.projectUrl === id);

      if (!project) {
        setProject(null);
        setPrev(null);
        setNext(null);
        return navigate("/404");
      }

      // if (overlay && overlay.current) {
      //   overlay.current.addEventListener("transitionend", () => {
      //     console.log("ok");
      //     // overlay.current.removeEventListener("transitionend", handleTransition, false);
      //     // console.log("removed");
      //     overlay.current.classList.remove("show");
      //     // overlay.current.removeAttribute("style");
      //     updateProject(project);
      //   });
      // }

      // overlay.current.style.backgroundColor = project.fields.cursorColor;
      // overlay.current.classList.add("show");

      updateProject(project);

      // if (overlay && overlay.current) {
      //   overlay.current.style.backgroundColor = project.fields.cursorColor;
      //   overlay.current.classList.add("show");
      // }

      // setTimeout(() => {
      //   updateProject(project);
      //   if (overlay && overlay.current) {
      //     overlay.current.classList.remove("show");
      //     // overlay.current.removeAttribute("style");
      //   }
      // }, 1000);
    }
    // }, [projects, cursor, id, navigate]);
    // }, [projects, cursor, id, navigate, viewport.width]);
  }, [projects, cursor, id, navigate, mobile, setPageIsLoading]);

  return (
    // <Page style={!loading && project ? { color: project.fields.colorText } : null}>
    <Page
    // onAnimationStart={() => {
    //   console.log(scrollY.current, window.scrollY);
    // }}
    >
      <div className={`page-container${loading || coverLoading ? " loading" : ""}`}>
        {!loading && project && (
          <>
            <Helmet>
              <title>MELT • {project.fields.name}</title>
            </Helmet>

            <ProjectCover
              overlay={overlay}
              key={`${project.id}_cover`}
              project={project}
              loading={coverLoading}
              setLoading={setCoverLoading}
              mobile={mobile}
              viewport={viewport}
              cursor={cursor}
            />
            {!coverLoading && (
              <>
                <ProjectText key={`${project.id}_text`} project={project} mobile={mobile} />
                <ProjectImages key={`${project.id}_images`} project={project} mobile={mobile} viewport={viewport} />
                <ProjectNav prev={prev} next={next} />
              </>
            )}
          </>
        )}
      </div>
    </Page>
  );
};

export default Project;
