import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor";
import FadeScroll from "../FadeScroll/FadeScroll";
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
    cursorEvents.onMouseLeave(project.unofficials ? "unofficial" : "project");
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const handleMouseEnter = (project) => {
    // console.log(project);
    cursorEvents.onMouseEnter(project.unofficials ? "unofficial" : "project");
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
    cursorEvents.onMouseLeave(project.unofficials ? "unofficial" : "project");
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

  // const customAnimationProjectImg = keyframes`
  //   0% {
  //     opacity: 0;
  //     transform: translateY(0px) scale(0.8);
  //   }
  //   50% {
  //     transform: translateY(0) scale(1);
  //   }
  //   100% {
  //     opacity: 1;
  //     transform: translateY(0) scale(1);
  //   }
  // `;

  return (
    <div className="projects" id="projects">
      {/* <Fade
        keyframes={customAnimationProjectImg}
        duration={3000}
        delay={0}
        triggerOnce={false}
        // fraction={0.5}
        style={
          {
            // transformOrigin: "center center",
          }
        }
      > */}
      {projectData.map((project, i) => {
        const width = mobile ? 85 : project.width;
        const style = {
          left: mobile ? 0 : `${project.yAxis}%`,
          marginTop: mobile ? 0 : `${project.xAxis}px`,
          width: `${width}vw`,
          height: `${((viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
        };

        // console.log(project.url);

        return (
          // <motion.div
          //   key={project.id}
          //   initial={{ opacity: 0, scale: 0.9 }}
          //   whileInView={{ opacity: [0, 1, 1, 1], scale: [0.9, 0.9, 1, 1] }}
          //   transition={{ times: [0, 0.1, 0.75, 1], duration: 2, ease: "easeInOut" }}
          //   // transition={{ type: "spring", stiffness: 50 }}
          //   // viewport={{ amount: 0.5 }}
          // >
          <FadeScroll id={`project_${project.id}`} key={project.id} viewport={{ amount: mobile ? 0.15 : 0.25 }}>
            <div className="project">
              <img
                src={project.cover.url}
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={() => handleMouseLeave(project)}
                className="project__cover-img"
                loading="lazy"
                alt={project.name}
                style={style}
                onClick={() => handleClick(project)}
                onLoad={() => {
                  if (i === 0) setLoaded(true);
                }}
                // onClick={() => {
                // console.log(e.target.getBoundingClientRect());
                // const rect = e.target.getBoundingClientRect();
                // const { left, top } = rect;
                // const w = rect.width;
                // const h = rect.height;
                // const x = -left + (viewport.width - w) / 2;
                // const y = -top + (viewport.height - h) / 2;
                // const s = h / viewport.height;
                // console.log(s);
                // // e.target.style.transform = `translate(${-project.yAxis + 50 - project.width / 2}vw, 0)`;
                // e.target.style.transform = `translate(${x}px, ${y}px) scale(${1 + s})`;
                // e.target.style.transition = "transform 1s ease-in-out";
                // }}
                // style={{ width: "100%", height: "auto" }}
              />
            </div>
          </FadeScroll>
        );
      })}
      {/* </Fade> */}
    </div>
  );
}
