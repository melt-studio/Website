import React, { useState, useEffect } from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
// import {Animated} from "react-animated-css";
import { keyframes } from "@emotion/react";
// import ProjectTitleTransition from '../ProjectTitleTransition/ProjectTitleTransition';

import testImage from "../../assets/Cursors/MELT_WEBSITE ICONS__X.png";

export default function Projects(props) {
  // console.log(props)

  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [intervalId, setIntervalId] = useState(null);
  // console.log('projectsinProjects', props.projects)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  // console.log('ok')

  useEffect(() => {
    if (props.cursor.current) props.cursor.current.classList.add("home");
    console.log("Projects");

    return () => {
      if (props.cursor.current) props.cursor.current.classList.remove("home");
    };
  }, [props.cursor]);

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

  const hoverEvent = (color, image, className) => {
    props.setBackgroundImage(image);
    props.setBackgroundColor(color);
    if (props.cursor.current) {
      props.cursor.current.classList.add(className);
      props.cursor.current.style.background = color;
    }
    document.body.style.cursor = "pointer";
    //   console.log(color)
    // const backgroundColor =color.split(",").length > 1 ? `linear-gradient(to right, ${color})` : color
    //   props.setBackgroundColor(backgroundColor)
    //   document.querySelector('.home__container.hover-background').classList.add('hover')
  };

  const hoverLeaveEvent = (className) => {
    props.setBackgroundColor("#000000");
    props.setBackgroundImage("none");
    if (props.cursor.current) {
      props.cursor.current.classList.remove(className);
      props.cursor.current.style.background = null;
    }
    document.body.style.cursor = "default";
    // document.querySelector('.home__container.hover-background').classList.remove('hover')
  };

  const customAnimationProjectImg = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 0px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;
  let cursorImg;
  return (
    <div className="projects__container">
      {props.projects.length && (
        <div className="pro-length-div">
          {props.projects.map((proj, index) => (
            <div className="proj-map-div" key={index + proj.fields.name}>
              {width > 800 ? (
                <div className="width-over-800-div">
                  {proj.fields.rolloverVid ? (
                    <div className="rollover-vid-div">
                      {/* <Fade
                    className='project-cover-img'
              keyframes={customAnimationProjectImg}
              opposite
              // direction="up"
              duration={3000}
              delay={0}
              triggerOnce={false}
              // fraction={0.5}
                    >
                    <img
                    id={proj.fields.id}
                    className='project-cover-img'
                    // ref={ref.current[index]}
                        onMouseEnter={() => {
                          hoverEvent(proj.fields.cursorColor, proj.fields.rolloverVid[0].url);
                          function hexToRgb(hex) {
                            let r = parseInt(hex.substring(0, 2), 16);
                            let g = parseInt(hex.substring(2, 4), 16);
                            let b = parseInt(hex.substring(4, 6), 16);
                            return "rgb(" + r + ", " + g + ", " + b + ")";
                          }
                          let color = proj.fields.cursorColor.substring(1);
                          let rgbColor = hexToRgb(color);
                          document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"32\" height=\"32\"><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"" + rgbColor + "\" /></svg>'), auto";

                        }}
                    onMouseLeave={hoverLeaveEvent}
                        onClick={
                          () => {

                            goToProject(proj.fields.projectUrl );
                            setTimeout(() => {
                              props.setShowHamburger("hamburger__holder hidden")
                              props.setVisible(false)
                            }, 5);
                          }
                        }
                    // style={{ position: 'relative', left: `${proj.fields.yAxis}%`, marginTop: `${proj.fields.xAxis}px`, width:`${proj.fields.width}vw` }}
                    style={{ position: 'relative', left: `${proj.fields.yAxis}%`, marginTop: `${proj.fields.xAxis}px`, width:`${proj.fields.width}vw`, height: `${window.innerWidth * proj.fields.width / 100 * (proj.fields.coverImg[0].height / proj.fields.coverImg[0].width)}px`, backgroundColor: 'red' }}
                    // src={proj.fields.coverImg[0].url} alt={proj.fields.name}
                    />
                    </Fade> */}
                    </div>
                  ) : (
                    <div>
                      <Fade
                        keyframes={customAnimationProjectImg}
                        opposite
                        // direction="up"
                        duration={3000}
                        delay={0}
                        triggerOnce={false}
                        // fraction={0.5}
                      >
                        <img
                          id={proj.fields.id}
                          // ref={ref.current[index]}
                          onMouseEnter={() => {
                            if (proj.fields.unofficials === true) {
                              // if (props.cursor.current) {
                              //   props.cursor.current.classList.add("unofficial");
                              // }
                              hoverEvent(proj.fields.cursorColor, "none", "unofficial");
                              // const cursorImg = document.createElement("img");
                              // cursorImg.src = "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_200/v1679765286/MELT%20Works/unofficials_gikmrv.png";
                              // cursorImg.style.position = "fixed";
                              // cursorImg.style.pointerEvents = "none";
                              // cursorImg.style.zIndex = "99999";
                              // cursorImg.style.width = "200px"; // Set the size of the cursor image
                              // cursorImg.style.height = "auto";
                              // cursorImg.style.backgroundColor = proj.fields.cursorColor
                              // cursorImg.style.borderRadius="60%"
                              // document.body.style.cursor = "none"; // Hide the default cursor
                              // document.addEventListener("mousemove", (e) => {
                              //   cursorImg.style.left = e.clientX + "px";
                              //   cursorImg.style.top = e.clientY + "px";
                              // });
                              // document.body.appendChild(cursorImg);
                              // // Remove the image element on mouse out
                              // cursorImg.addEventListener("mouseout", () => {
                              //   cursorImg.remove();
                              //   document.body.style.cursor = "default";
                              // });
                            } else {
                              hoverEvent(proj.fields.cursorColor, "none", "project");
                              // function hexToRgb(hex) {
                              //   let r = parseInt(hex.substring(0, 2), 16);
                              //   let g = parseInt(hex.substring(2, 4), 16);
                              //   let b = parseInt(hex.substring(4, 6), 16);

                              //   return "rgb(" + r + ", " + g + ", " + b + ")";
                              // }
                              // let color = proj.fields.cursorColor.substring(1);
                              // let rgbColor = hexToRgb(color);
                              // let r = 5;
                              // let cursor =
                              //   'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32"><circle cx="16" cy="16" r="' +
                              //   r +
                              //   '" fill="' +
                              //   rgbColor +
                              //   "\" /></svg>'), auto";
                              // document.body.style.cursor = cursor;

                              // setIntervalId(
                              //   setInterval(function () {
                              //     if (r < 15) {
                              //       r += 1;
                              //     }

                              //     cursor =
                              //       'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32"><circle cx="16" cy="16" r="' +
                              //       r +
                              //       '" fill="' +
                              //       rgbColor +
                              //       "\" /></svg>'), auto";
                              //     document.body.style.cursor = cursor;
                              //   }, 20)
                              // );
                              // document.body.style.cursor =
                              //   'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32"><circle cx="16" cy="16" r="14" fill="' +
                              //   rgbColor +
                              //   "\" /></svg>'), auto";
                            }
                          }}
                          onMouseLeave={() => {
                            if (proj.fields.unofficials === true) {
                              // if (props.cursor.current) {
                              //   props.cursor.current.classList.remove("unofficial");
                              // }
                              hoverLeaveEvent("unofficial");
                            } else {
                              hoverLeaveEvent("project");
                            }

                            document.body.style.cursor = "default"; // Set cursor back to default
                            clearInterval(intervalId);
                            let cursor = "default";
                            document.body.style.cursor = cursor;
                            // cursorImg.style.display = "none"; // hide the cursor image
                          }}
                          onClick={() => {
                            clearInterval(intervalId);
                            document.body.style.cursor = "default";
                            goToProject(
                              proj.fields.projectUrl,
                              proj.fields.name,
                              proj.fields.description,
                              proj.fields.colorTheme,
                              proj.fields.colorText
                            );
                            setTimeout(() => {
                              props.setShowHamburger("hamburger__holder hidden");
                              props.setVisible(false);
                            }, 5);
                          }}
                          style={{
                            position: "relative",
                            left: `${proj.fields.yAxis}%`,
                            marginTop: `${proj.fields.xAxis}px`,
                            width: `${proj.fields.width}vw`,
                            height: `${
                              ((window.innerWidth * proj.fields.width) / 100) *
                              (proj.fields.coverImg[0].height / proj.fields.coverImg[0].width)
                            }px`,
                            backgroundColor: "red",
                          }}
                          className="  project-cover-img"
                          loading="lazy"
                          src={
                            proj.fields.coverImg[0].thumbnails
                              ? proj.fields.coverImg[0].thumbnails.large.url
                              : proj.fields.coverImg[0].url
                          }
                          alt={proj.fields.name}
                        />
                      </Fade>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mobile-projects">
                  <Fade
                    keyframes={customAnimationProjectImg}
                    direction="up"
                    duration={3000}
                    triggerOnce={true}
                    fraction={0.4}
                    // cascade
                  >
                    <img
                      onClick={() => {
                        goToProject(
                          proj.fields.projectUrl,
                          proj.fields.name,
                          proj.fields.description,
                          proj.fields.colorTheme
                        );
                        props.setShowHamburger("hamburger__holder hidden");
                      }}
                      className="project-cover-img"
                      src={proj.fields.coverImg[0].url}
                      alt={proj.fields.name}
                    />
                  </Fade>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
