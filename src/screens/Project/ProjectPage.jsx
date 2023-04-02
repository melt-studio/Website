import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import ProjectCover from "../../components/ProjectCover/ProjectCover.jsx";
import ProjectText from "../../components/ProjectText/ProjectText.jsx";
import ProjectImages from "../../components/ProjectImages/ProjectImages.jsx";
import ProjectNav from "../../components/ProjectNav/ProjectNav.jsx";
import "./ProjectPage.css";

const ProjectFullPage = ({ projects, cursor, viewport, widthCutOff }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    document.body.classList.add("project-page");

    return () => {
      document.body.classList.remove("project-page");
    };
  }, []);

  useEffect(() => {
    if (projects.length) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      const project = projects.find((project) => project.fields.projectUrl === id);

      if (!project) {
        setProject(null);
        setPrev(null);
        setNext(null);
        return navigate("/");
      }

      setProject(project);

      // Update cursor color to current project color
      if (cursor && cursor.current) {
        cursor.current.style.backgroundColor = project.fields.cursorColor;
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
    }
  }, [projects, cursor, id, navigate]);

  return (
    <div className="page" style={loading ? null : { color: `${project.fields.colorText}` }}>
      <div className={`page-container${loading ? " loading" : ""}`}>
        {!loading && (
          <>
            <Helmet>
              <title>MELLLLLLT - {project.fields.name}</title>
            </Helmet>

            <ProjectCover project={project} viewport={viewport} widthCutOff={widthCutOff} />
            <ProjectText project={project} />
            <ProjectImages project={project} viewport={viewport} widthCutOff={widthCutOff} />
            <ProjectNav prev={prev} next={next} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectFullPage;
