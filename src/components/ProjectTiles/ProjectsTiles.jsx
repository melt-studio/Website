import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor";
import ProjectTile from "../ProjectTile/ProjectTile";
import "./ProjectsTiles.css";

export default function ProjectTiles({ projects, cursor, setScroll, setBackgroundColor, setLoaded, mobile, viewport }) {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    if (projects.length) {
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

      // console.log(projects);
      // console.log(projectsMapped);

      setProjectData(projectsMapped);
    }
  }, [projects]);

  const handleClick = (project) => {
    // console.log(project);
    // const p = document.getElementById(`project_${project.id}`);
    // if (p) {
    //   console.log(p);
    //   // p.style.opacity = 1;
    //   // p.classList.add("show");
    // }
    setScroll(window.scrollY);
    navigate(`/project/${project.projectUrl}`);
    cursorEvents.onMouseLeave(project.unofficials ? ["project", "unofficial"] : ["project"]);
    if (cursor.current) {
      cursor.current.classList.add("project-click");
    }
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const handleMouseEnter = (project) => {
    // console.log(project);
    cursorEvents.onMouseEnter(project.unofficials ? ["project", "unofficial"] : ["project"]);
    if (cursor && cursor.current) {
      cursor.current.style.backgroundColor = project.color.cursor;
      // cursor.current.firstElementChild.style.fill = project.color.cursor;
      Array.from(cursor.current.children).forEach((c) => (c.style.fill = project.color.cursor));
    }
    // setBackgroundColor(`${project.color.cursor}, #0000ff`);
    setBackgroundColor(project.color.background);
    // document.body.style.backgroundColor = project.color.cursor;
    // document.documentElement.style.setProperty("background-color", project.color.cursor);
  };

  const handleMouseLeave = (project) => {
    cursorEvents.onMouseLeave(project.unofficials ? ["project", "unofficial"] : ["project"]);
    if (cursor && cursor.current) {
      cursor.current.style.removeProperty("background-color");
      // cursor.current.firstElementChild.style.fill = "transparent";
      Array.from(cursor.current.children).forEach((c) => (c.style.fill = "transparent"));
    }
    setBackgroundColor("#000000");
    // setBackgroundColor("#000000");
    // document.body.style.backgroundColor = "#000000";
    // document.documentElement.style.setProperty("background-color", "#000000");
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
