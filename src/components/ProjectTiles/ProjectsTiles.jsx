import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor";
import ProjectTile from "../ProjectTile/ProjectTile";
import "./ProjectsTiles.css";

export default function ProjectTiles({
  projects,
  projectsAll,
  cursor,
  setScroll,
  setBackgroundColor,
  setLoaded,
  history,
  mobile,
  viewport,
  filtered,
}) {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (filtered && history.length > 1) {
      window.scrollTo(0, window.innerHeight * 0.9);
    }
  }, [filtered, history]);

  // useEffect(() => {
  //   console.log("rendering projectTiles");

  //   return () => console.log("unmount projectTiles");
  // }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const projectsMapped = projects.map((project) => {
        const { id } = project;
        const {
          textColor,
          // colorTheme,
          backgroundColor,
          name,
          projectUrl,
          // order,
          coverImg,
          // xAxis,
          // yAxis,
          width,
          random,
          tag,
          unofficials,
        } = project.fields;

        let thumbnail = null;
        if (coverImg !== undefined && coverImg[0].thumbnails) {
          if (coverImg[0].thumbnails.large) {
            thumbnail = coverImg[0].thumbnails.large;
          }
        }

        const cover = {
          type: coverImg === undefined ? null : coverImg[0].type,
          url: thumbnail ? thumbnail.url : coverImg === undefined ? null : coverImg[0].url,
          width: thumbnail ? thumbnail.width : coverImg === undefined ? null : coverImg[0].width,
          height: thumbnail ? thumbnail.height : coverImg === undefined ? null : coverImg[0].height,
        };

        cover.aspect = cover.width / cover.height;

        return {
          id,
          color: {
            cursor: textColor,
            text: textColor,
            background: backgroundColor,
            // theme: colorTheme,
          },
          name,
          projectUrl,
          // order,
          cover,
          // xAxis,
          // yAxis,
          width,
          random,
          tag,
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

  useEffect(() => {
    if (!mobile && filtered && projectData.length > 0) {
      // if (viewport.width >= 1280) {
      const filter = projectData[0].tag;
      const f = filter !== undefined && filter.length > 0 ? filter.trim().toLowerCase() : "print";
      let sw = 0.3;
      let mw = 400;
      if (f === "motion") {
        sw = 0.475;
        mw = 1000;
      }
      // const wv = Math.min(3480, viewport.width);
      const wv = Math.min(3480, document.body.clientWidth);
      const p = Math.min(80, 0.05 * wv);
      // const g = p;
      const wa = wv - 2 * p;
      const g = Math.min(80, 0.05 * wa);
      // const g = 0;
      const wi = Math.min(mw, sw * wa);
      const n = (wv - 2 * p + g) / (wi + g);
      // console.log(wv, sw, mw, wi, wa, Math.floor(n), n);
      setCount(Math.floor(n));
      // } else {
      //   setCount(2);
      // }
    } else {
      setCount(1);
    }
  }, [viewport, mobile, filtered, projectData]);

  return (
    <div className={`projects${filtered ? " filtered" : ""}`} id="projects">
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
          projectsAll={projectsAll}
          filtered={filtered}
          count={count}
        />
      ))}
    </div>
  );
}
