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
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [coverLoading, setCoverLoading] = useState(true);
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

  useLayoutEffect(() => {
    setPageIsLoading(true);
  }, [setPageIsLoading]);

  useEffect(() => {
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

  useEffect(() => {
    const updateProject = (project) => {
      setCoverLoading(true);
      setProject(project);

      // Update cursor color to current project color
      // if (cursor && cursor.current) {
      //   cursor.current.style.backgroundColor = project.fields.textColor;
      //   Array.from(cursor.current.children).forEach((c) => (c.style.fill = project.fields.textColor));
      // }

      // Update root project-color CSS variable
      document.documentElement.style.setProperty("--text-color", project.fields.textColor);
      document.documentElement.style.setProperty("--cursor-color", project.fields.textColor);

      // Instead of using order field just take array from airtable (assuming always returns in row order, then can just rearrange in airtable)
      const order = projects.indexOf(project);

      const prevProject = order === 0 ? projects[projects.length - 1] : projects[order - 1];
      if (prevProject) setPrev(prevProject);
      else setPrev(null);

      const nextProject = order === projects.length - 1 ? projects[0] : projects[order + 1];
      if (nextProject) setNext(nextProject);
      else setNext(null);

      setLoading(false);

      window.scrollTo(0, 0);
    };

    if (projects.length > 0) {
      const project = projects.find((project) => project.fields.projectUrl === id);

      if (!project) {
        setProject(null);
        setPrev(null);
        setNext(null);
        return navigate("/404");
      }

      updateProject(project);
    }
  }, [projects, cursor, id, navigate, setPageIsLoading]);

  // useEffect(() => {
  //   const updateProject = (project) => {
  //     // Update root project-color CSS variable
  //     document.documentElement.style.setProperty("--text-color", project.fields.textColor);
  //     document.documentElement.style.setProperty("--cursor-color", project.fields.textColor);
  //   };

  //   if (projects.length > 0) {
  //     const project = projects.find((project) => project.fields.projectUrl === id);
  //     if (project) updateProject(project);
  //   }
  // }, [projects, cursor, id, mobile]);

  return (
    <Page>
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
                <ProjectText key={`${project.id}_text`} project={project} />
                <ProjectImages key={`${project.id}_images`} project={project} mobile={mobile} viewport={viewport} />
                <ProjectText key={`${project.id}_text_secondary`} project={project} secondary={true} />
                <ProjectImages
                  key={`${project.id}_images_secondary`}
                  project={project}
                  mobile={mobile}
                  viewport={viewport}
                  secondary={true}
                />
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
