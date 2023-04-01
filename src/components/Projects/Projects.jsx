import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { Fade } from "react-awesome-reveal";
// import { keyframes } from "@emotion/react";
import { cursorEvents } from "../Cursor/Cursor";
import "./Projects.css";

export default function Projects(props) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (props.projects.length) {
      const projectsMapped = props.projects.map((project) => {
        const { id } = project;
        const {
          cursorColor,
          colorText,
          colorTheme,
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

      console.log(props.projects);
      console.log(projectsMapped);

      setProjects(projectsMapped);
    }
  }, [props.projects]);

  const goToProject = (id) => {
    if (id === "Unofficials") {
      props.setBackgroundColor("#000000");
      navigate(`/${id}`);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } else {
      // document.getElementById("mobile-logo__div-z-index").style.zIndex = "0";
      navigate(`/${id}`);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      props.setShowHamburger("hamburger__holder hidden");
      document.body.style.cursor = "default";
      document.body.style.overflow = "hidden";
      props.setShowHamburger("hamburger__holder hidden");
      setTimeout(() => {
        props.setShowHamburger("hamburger__holder hidden");
      }, 1000);
    }
  };

  const handleClick = (project) => {
    console.log(project);
    navigate(`/${project.projectUrl}`);
    cursorEvents.onMouseLeave(project.unofficials ? "unofficial" : "project");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  // console.log("hello");

  const handleMouseEnter = (project) => {
    cursorEvents.onMouseEnter(project.unofficials ? "unofficial" : "project");
    if (props.cursor && props.cursor.current) {
      props.cursor.current.style.backgroundColor = project.color.cursor;
    }
    // props.setBackgroundColor(project.color.cursor);
    document.body.style.backgroundColor = project.color.cursor;
    // document.documentElement.style.setProperty("background-color", project.color.cursor);
  };

  const handleMouseLeave = (project) => {
    cursorEvents.onMouseLeave(project.unofficials ? "unofficial" : "project");
    if (props.cursor && props.cursor.current) {
      props.cursor.current.style.removeProperty("background-color");
    }
    // props.setBackgroundColor("#000000");
    document.body.style.backgroundColor = "#000000";
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
    <div className="projects">
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
      {projects.map((project) => {
        const mobile = props.viewport.width < props.widthCutOff;
        const width = mobile ? 85 : project.width;
        const style = {
          left: mobile ? 0 : `${project.yAxis}%`,
          marginTop: mobile ? 0 : `${project.xAxis}px`,
          width: `${width}vw`,
          height: `${((props.viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
        };

        // console.log(project.url);

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: [0, 0, 1, 1], scale: [0.9, 1, 1] }}
            transition={{ times: [0, 0.1, 0.75, 1], duration: 2, ease: "easeInOut" }}
            // transition={{ type: "spring", stiffness: 50 }}
            // viewport={{ amount: 0.5 }}
          >
            {/* <div className="project" key={project.id}> */}
            {/* <div className="project" style={style}> */}
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
                // onClick={() => {
                // console.log(e.target.getBoundingClientRect());
                // const rect = e.target.getBoundingClientRect();
                // const { left, top } = rect;
                // const w = rect.width;
                // const h = rect.height;
                // const x = -left + (props.viewport.width - w) / 2;
                // const y = -top + (props.viewport.height - h) / 2;
                // const s = h / props.viewport.height;
                // console.log(s);
                // // e.target.style.transform = `translate(${-project.yAxis + 50 - project.width / 2}vw, 0)`;
                // e.target.style.transform = `translate(${x}px, ${y}px) scale(${1 + s})`;
                // e.target.style.transition = "transform 1s ease-in-out";
                // }}
                // style={{ width: "100%", height: "auto" }}
              />
            </div>
          </motion.div>
        );
      })}
      {/* </Fade> */}
    </div>
  );
}
//   return (
//     <div className="projects__container">
//       {props.projects.length && (
//         <div className="pro-length-div">
//           {props.projects.map((proj, index) => (
//             <div className="proj-map-div" key={index + proj.fields.name}>
//               {width > 800 ? (
//                 <div className="width-over-800-div">
//                   {proj.fields.rolloverVid ? (
//                     <div className="rollover-vid-div">
//                       {/* <Fade
//                     className='project-cover-img'
//               keyframes={customAnimationProjectImg}
//               opposite
//               // direction="up"
//               duration={3000}
//               delay={0}
//               triggerOnce={false}
//               // fraction={0.5}
//                     >
//                     <img
//                     id={proj.fields.id}
//                     className='project-cover-img'
//                     // ref={ref.current[index]}
//                         onMouseEnter={() => {
//                           hoverEvent(proj.fields.cursorColor, proj.fields.rolloverVid[0].url);
//                           function hexToRgb(hex) {
//                             let r = parseInt(hex.substring(0, 2), 16);
//                             let g = parseInt(hex.substring(2, 4), 16);
//                             let b = parseInt(hex.substring(4, 6), 16);
//                             return "rgb(" + r + ", " + g + ", " + b + ")";
//                           }
//                           let color = proj.fields.cursorColor.substring(1);
//                           let rgbColor = hexToRgb(color);
//                           document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"32\" height=\"32\"><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"" + rgbColor + "\" /></svg>'), auto";

//                         }}
//                     onMouseLeave={hoverLeaveEvent}
//                         onClick={
//                           () => {

//                             goToProject(proj.fields.projectUrl );
//                             setTimeout(() => {
//                               props.setShowHamburger("hamburger__holder hidden")
//                               props.setVisible(false)
//                             }, 5);
//                           }
//                         }
//                     // style={{ position: 'relative', left: `${proj.fields.yAxis}%`, marginTop: `${proj.fields.xAxis}px`, width:`${proj.fields.width}vw` }}
//                     style={{ position: 'relative', left: `${proj.fields.yAxis}%`, marginTop: `${proj.fields.xAxis}px`, width:`${proj.fields.width}vw`, height: `${window.innerWidth * proj.fields.width / 100 * (proj.fields.coverImg[0].height / proj.fields.coverImg[0].width)}px`, backgroundColor: 'red' }}
//                     // src={proj.fields.coverImg[0].url} alt={proj.fields.name}
//                     />
//                     </Fade> */}
//                     </div>
//                   ) : (
//                     <div>
//                       <Fade
//                         keyframes={customAnimationProjectImg}
//                         opposite
//                         // direction="up"
//                         duration={3000}
//                         delay={0}
//                         triggerOnce={false}
//                         // fraction={0.5}
//                       >
//                         <img
//                           id={proj.fields.id}
//                           // ref={ref.current[index]}
//                           onMouseEnter={() => {
//                             if (proj.fields.unofficials === true) {
//                               hoverEvent(proj.fields.cursorColor, "none", "unofficial");
//                             } else {
//                               hoverEvent(proj.fields.cursorColor, "none", "project");
//                             }
//                           }}
//                           onMouseLeave={() => {
//                             if (proj.fields.unofficials === true) {
//                               hoverLeaveEvent("unofficial");
//                             } else {
//                               hoverLeaveEvent("project");
//                             }

//                             document.body.style.cursor = "default"; // Set cursor back to default
//                             clearInterval(intervalId);
//                             let cursor = "default";
//                             document.body.style.cursor = cursor;
//                             // cursorImg.style.display = "none"; // hide the cursor image
//                           }}
//                           onClick={() => {
//                             clearInterval(intervalId);
//                             document.body.style.cursor = "default";
//                             goToProject(
//                               proj.fields.projectUrl,
//                               proj.fields.name,
//                               proj.fields.description,
//                               proj.fields.colorTheme,
//                               proj.fields.colorText
//                             );
//                             setTimeout(() => {
//                               props.setShowHamburger("hamburger__holder hidden");
//                               props.setVisible(false);
//                             }, 5);
//                           }}
//                           style={{
//                             position: "relative",
//                             left: `${proj.fields.yAxis}%`,
//                             marginTop: `${proj.fields.xAxis}px`,
//                             width: `${proj.fields.width}vw`,
//                             height: `${
//                               ((window.innerWidth * proj.fields.width) / 100) *
//                               (proj.fields.coverImg[0].height / proj.fields.coverImg[0].width)
//                             }px`,
//                             // backgroundColor: "red",
//                           }}
//                           className="project-cover-img"
//                           loading="lazy"
//                           src={
//                             proj.fields.coverImg[0].thumbnails
//                               ? proj.fields.coverImg[0].thumbnails.large.url
//                               : proj.fields.coverImg[0].url
//                           }
//                           alt={proj.fields.name}
//                         />
//                       </Fade>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="mobile-projects">
//                   <Fade
//                     keyframes={customAnimationProjectImg}
//                     direction="up"
//                     duration={3000}
//                     triggerOnce={true}
//                     fraction={0.4}
//                     // cascade
//                   >
//                     <img
//                       onClick={() => {
//                         goToProject(
//                           proj.fields.projectUrl,
//                           proj.fields.name,
//                           proj.fields.description,
//                           proj.fields.colorTheme
//                         );
//                         props.setShowHamburger("hamburger__holder hidden");
//                       }}
//                       className="project-cover-img"
//                       // src={proj.fields.coverImg[0].url}
//                       src={
//                         proj.fields.coverImg[0].thumbnails
//                           ? proj.fields.coverImg[0].thumbnails.large.url
//                           : proj.fields.coverImg[0].url
//                       }
//                       alt={proj.fields.name}
//                       loading="lazy"
//                     />
//                   </Fade>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
