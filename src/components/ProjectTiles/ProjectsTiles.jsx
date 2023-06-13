import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor";
import ProjectTile from "../ProjectTile/ProjectTile";
import "./ProjectsTiles.css";

export default function ProjectTiles({ projects, cursor, setScroll, setBackgroundColor, setLoaded, mobile, viewport }) {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    if (projects.length > 0) {
      const projectsMapped = projects.map((project) => {
        const { id } = project;
        const {
          cursorColor,
          colorText,
          colorTheme,
          backgroundColor,
          name,
          projectUrl,
          order,
          coverImg,
          xAxis,
          yAxis,
          width,
          unofficials,
        } = project.fields;

        let thumbnail = null;
        if (coverImg[0].thumbnails) {
          if (coverImg[0].thumbnails.large) {
            thumbnail = coverImg[0].thumbnails.large;
          }
        }

        const cover = {
          type: coverImg[0].type,
          url: thumbnail ? thumbnail.url : coverImg[0].url,
          width: thumbnail ? thumbnail.width : coverImg[0].width,
          height: thumbnail ? thumbnail.height : coverImg[0].height,
        };

        cover.aspect = cover.width / cover.height;

        return {
          id,
          color: {
            cursor: cursorColor,
            text: colorText,
            background: backgroundColor,
            theme: colorTheme,
          },
          name,
          projectUrl,
          order,
          cover,
          xAxis,
          yAxis,
          width,
          unofficials: unofficials ? true : false,
        };
      });

      setProjectData(projectsMapped);
    }
  }, [projects]);

  const handleClick = (project) => {
    setScroll(window.scrollY);
    navigate(`/project/${project.projectUrl}`);
    cursorEvents.onMouseLeave(project.unofficials ? ["project", "unofficial"] : ["project"]);
    if (cursor.current) {
      cursor.current.classList.add("project-click");
    }
  };

  const handleMouseEnter = (project) => {
    cursorEvents.onMouseEnter(project.unofficials ? ["project", "unofficial"] : ["project"]);
    if (cursor && cursor.current) {
      cursor.current.style.backgroundColor = project.color.cursor;
      Array.from(cursor.current.children).forEach((c) => (c.style.fill = project.color.cursor));
    }

    setBackgroundColor(project.color.background);
  };

  const handleMouseLeave = (project) => {
    cursorEvents.onMouseLeave(project.unofficials ? ["project", "unofficial"] : ["project"]);
    if (cursor && cursor.current) {
      cursor.current.style.removeProperty("background-color");
      Array.from(cursor.current.children).forEach((c) => (c.style.fill = "transparent"));
    }
    setBackgroundColor("#000000");
  };

  return (
    <div className="projects" id="projects">
      {projectData.map((project, i) => (
        <ProjectTile
          key={project.id}
          i={i}
          project={project}
          mobile={mobile}
          viewport={viewport}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleClick={handleClick}
          setLoaded={setLoaded}
        />
      ))}
    </div>
  );
}
