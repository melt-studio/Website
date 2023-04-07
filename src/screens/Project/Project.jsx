import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import ProjectCover from "../../components/ProjectCover/ProjectCover.jsx";
import ProjectText from "../../components/ProjectText/ProjectText.jsx";
import ProjectImages from "../../components/ProjectImages/ProjectImages.jsx";
import ProjectNav from "../../components/ProjectNav/ProjectNav.jsx";
import Page from "../Page.jsx";
import "./Project.css";

const Project = ({ projects, cursor, mobile, viewport }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  const overlay = useRef();

  useEffect(() => {
    document.body.classList.add("project-page");

    return () => {
      document.body.classList.remove("project-page");
    };
  }, []);

  useEffect(() => {
    const updateProject = (project) => {
      setProject(project);

      // Update cursor color to current project color
      if (cursor && cursor.current) {
        cursor.current.style.backgroundColor = project.fields.cursorColor;
        Array.from(cursor.current.children).forEach((c) => (c.style.fill = project.fields.cursorColor));
      }

      // Instead of using order field just take array from airtable (assuming always returns in row order, then can just rearrange in airtable)
      const order = projects.indexOf(project);

      const prevProject = order === 0 ? projects[projects.length - 1] : projects[order - 1];
      if (prevProject) setPrev(prevProject);
      else setPrev(null);

      const nextProject = order === projects.length - 1 ? projects[0] : projects[order + 1];
      if (nextProject) setNext(nextProject);
      else setNext(null);

      setLoading(false);

      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      // setTimeout(() => window.scrollTo(0, 0), 1);
      window.scrollTo(0, 0);
    };

    if (projects.length) {
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
  }, [projects, cursor, id, navigate, mobile]);

  return (
    <Page style={!loading && project ? { color: project.fields.colorText } : null}>
      <div className={`page-container${loading ? " loading" : ""}`}>
        {!loading && project && (
          <>
            <Helmet>
              <title>MELLLLLLT - {project.fields.name}</title>
            </Helmet>

            <ProjectCover
              overlay={overlay}
              key={`${project.id}_cover`}
              project={project}
              mobile={mobile}
              viewport={viewport}
              cursor={cursor}
            />
            <ProjectText key={`${project.id}_text`} project={project} />
            <ProjectImages key={`${project.id}_images`} project={project} mobile={mobile} viewport={viewport} />
            <ProjectNav prev={prev} next={next} />
          </>
        )}
      </div>
    </Page>
  );
};

export default Project;
