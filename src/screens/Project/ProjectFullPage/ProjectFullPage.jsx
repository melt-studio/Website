import React, { useState, useEffect, useRef } from "react";
import { getAllProjects } from "../../../services/projects.js";
import "./ProjectFullPage.css";
import { Fade } from "react-awesome-reveal";
// import { Animated } from "react-animated-css";
// import FadeInOut from "../../../components/FadeInOutAnimation/FadeInOutAnimation.jsx";
import { Helmet } from "react-helmet";
import ReactPlayer from "react-player";
import ProjectCover from "../../../components/ProjectCover/ProjectCover.jsx";
import { keyframes } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
// import FooterSmaller from '../../../components/Footer/FooterSmaller/FooterSmaller.jsx';
// import ProjectTitleTransition from "../../../components/ProjectTitleTransition/ProjectTitleTransition.jsx";
import ProjectNav from "../../../components/ProjectNav/ProjectNav.jsx";
import { motion } from "framer-motion";

export default function ProjectFullPage(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location);

  const [loaded, isLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  // const [animatedIsVisible, setAnimatedIsVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("project-page");

    return () => document.body.classList.remove("project-page");
  }, []);

  useEffect(() => {
    if (props.projects.length) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      // console.log(props.projects);
      const proj = props.projects.find((element) => "/" + element.fields.projectUrl === `${window.location.pathname}`);
      console.log(proj);
      // Need to check if proj exists
      const order = props.projects.indexOf(proj);

      // Instead of using order field just take array from airtable (assuming always returns in row order, then can just rearrange in airtable)
      const prevProj = order === 0 ? props.projects[props.projects.length - 1] : props.projects[order - 1];
      // const prevProj = props.projects.find((e) => e.fields.order === proj.fields.order - 1);
      const nextProj = order === props.projects.length - 1 ? props.projects[0] : props.projects[order + 1];
      // const nextProj = props.projects.find((e) => e.fields.order === proj.fields.order + 1);

      // const imageElement = new Image();
      // imageElement.src = proj.fields.mainImage[0].url;

      if (prevProj) setPrev(prevProj);
      else setPrev(null);
      if (nextProj) setNext(nextProj);
      else setNext(null);
      setProject(proj);

      isLoading(true);

      // const color = `${proj.fields.colorTheme}`;
      // document.body.style.background = color;

      // if (window.innerWidth > 800) {
      //   setTimeout(() => {
      //     document.body.style.cursor = "default";
      //     document.body.style.overflow = "auto";
      //     setAnimatedIsVisible(false);
      //   }, 3200);

      //   setTimeout(() => {
      //     document.querySelector(".project-cover-full__background").classList.add("show");
      //     //  document.querySelector('.project__cover-photo-holder').classList.add('visible');
      //   }, 3600);

      //   setTimeout(() => {
      //     document.querySelector(".project-cover-full__image").classList.add("visible");
      //     document.querySelector(".project-cover-full__image").classList.add("visible");
      //     //  document.querySelector('.project__cover-photo-holder').classList.add('visible');
      //   }, 4000);

      //   setTimeout(() => {
      //     document.querySelector(".project-title").classList.add("show");
      //   }, 4200);

      //   setTimeout(() => {
      //     document.querySelector(".proj-description").classList.add("show");
      //   }, 4500);
      // } else {
      //   setTimeout(() => {
      //     document.body.style.cursor = "default";
      //     document.body.style.overflow = "auto";
      //     setAnimatedIsVisible(false);
      //   }, 3200);

      //   setTimeout(() => {
      //     document.querySelector(".project-cover-full__background").classList.add("show");
      //     // project__cover-photo-holder
      //   }, 4000);

      //   setTimeout(() => {
      //     document.querySelector(".project-cover-full__image").classList.add("visible");
      //     // project__cover-photo-holder
      //   }, 4000);
      //   setTimeout(() => {
      //     document.querySelector(".project-title").classList.add("show");
      //   }, 4500);

      //   setTimeout(() => {
      //     document.querySelector(".proj-description").classList.add("show");
      //   }, 4500);

      //   setTimeout(() => {
      //     // if (document.getElementById("project-about__section-one__mobile").classList.contains('.project-about__section-one__mobile')) {
      //     document.querySelector(".project-about__section-one__mobile").classList.add("show");
      //     // }
      //   }, 5500);
      //   setTimeout(() => {
      //     document.querySelector(".project-about__section-three__mobile").classList.add("show");
      //   }, 4700);
      //   setTimeout(() => {
      //     props.setShowHamburger("hamburger__holder");
      //   }, 5000);
      // }

      setTimeout(() => {
        if (loaded === false) {
          const fetchProjects = async () => {
            const projArray = await getAllProjects();
            const proj = projArray.find((element) => "/" + element.fields.projectUrl === `${window.location.pathname}`);
            setProject(proj);
            isLoading(true);
            // console.log('loaded TWO')
            const color = `${proj.fields.colorTheme}`;
            document.body.style.background = color;
          };
          fetchProjects();
        }
      }, 1000);
    }
    // eslint-disable-next-line
  }, [props.projects, loaded, location.pathname]);

  const ref = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      // console.log(loaded)
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (window.innerWidth > 800) {
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            // console.log("Is Visible");
            document.querySelector(".project__content-holder").classList.add("hide");

            // document.querySelector('.proj-description').classList.remove('show');
            // document.querySelector('.project-title').classList.remove('show');
          } else {
            document.querySelector(".project__content-holder").classList.remove("hide");
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded]);

  // const refTwo = useRef(null);
  // useEffect(() => {
  //   const handleScrollTwo = () => {
  //     if (!ref.current) return;
  //     // console.log(project)
  //     if (ref.current) {
  //       const rect = refTwo.current.getBoundingClientRect();
  //       if (rect.top < window.innerHeight && rect.bottom > 0) {
  //         // console.log("TOPP");
  //         if (window.innerWidth > 800) {
  //           // document.querySelector('.project-title').classList.add('show');
  //           // document.querySelector('.proj-description').classList.add('show');
  //           document.querySelector(".project__content-holder").classList.remove("hide");
  //           if (document.querySelector(".images-holder").classList.contains("is-vis")) {
  //             document.querySelector(".images-holder").classList.add("not");

  //             setTimeout(() => {
  //               document.querySelector(".images-holder").classList.remove("not");
  //               document.querySelector(".images-holder").classList.remove("is-vis");
  //             }, 1000);
  //           }
  //         }
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScrollTwo);
  //   return () => window.removeEventListener("scroll", handleScrollTwo);
  // }, [project]);

  const hrRef = useRef(null);
  useEffect(() => {
    const handleScrollTwo = () => {
      if (!ref.current) return;
      // console.log(project)
      if (ref.current) {
        const rect = hrRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (window.innerWidth > 800) {
            // console.log("TOPP");
            setTimeout(() => {
              if (document.getElementById("project-about__hr-line__holder").classList.contains(".fade-in-up-element")) {
                document.querySelector(".project-about__hr-line__holder").classList.add("grow");
              }
            }, 1000);
          } else if (document.querySelector(".project-about__hr-line__holder").classList.contains("grow")) {
            document.querySelector(".project-about__hr-line__holder").classList.remove("grow");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollTwo);
    return () => window.removeEventListener("scroll", handleScrollTwo);
  }, [project]);

  window.addEventListener("scroll", function () {
    var element = document.querySelector("#proj-content-holder");
    if (!ref.current) return;
    if (ref.current.getBoundingClientRect().y <= -580 || null) {
      var position = element.getBoundingClientRect();

      if (window.innerWidth > 800) {
        // checking whether fully visible
        // if(position.top >= 100 && position.bottom <= window.innerHeight) {
        //   document.querySelector('.project-cover-full__image').classList.remove('visible');
        //   document.querySelector('.project-cover-full__image').classList.add('out-up');
        // }

        // checking for partial visibility
        if (position.top < window.innerHeight && position.bottom >= 0) {
          // console.log('Element is partially visible in screen');
        }
      }
    }
  });

  window.addEventListener("scroll", function () {
    if (!ref.current) return;
    if (ref.current.getBoundingClientRect().y <= -580 || null) {
      var wideelement = document.querySelector("#top");
      var wideposition = wideelement.getBoundingClientRect();
      if (window.innerWidth > 800) {
        // checking whether fully visible
        if (wideposition.top >= 100 && wideposition.bottom <= window.innerHeight) {
          // console.log('Element is fully visible in screen');
        }

        // checking for partial visibility
        if (wideposition.top < window.innerHeight && wideposition.bottom >= 0) {
          // console.log('Element is partially visible in screen');
          // document.querySelector('.project-cover-full__image').classList.remove('out-up');
          // document.querySelector('.project-cover-full__image').classList.add('visible');
        }
      }
    }
  });

  // console.log("project", project.fields)

  // function changeOpacity() {
  //   var image = document.getElementById("cover-image");
  //   var rect = image.getBoundingClientRect();
  //   var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  //   var visibility = (rect.bottom / viewHeight) * 100;

  //   if (visibility > 70) {
  //     image.style.opacity = "1";
  //   } else {
  //     image.style.opacity = (visibility / 100);
  //   }
  // }

  // // Call the function on scroll
  // window.addEventListener("scroll", changeOpacity);

  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  const customAnimationCloseProj = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;
  const customAnimationProjectImages = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

  const customAnimationProjectKeyWords = keyframes`
// 0%{
//   opacity: 0;
//   transform: translate3d(0, 50px, 0);
// }
// 50%{
//   opacity: .5;
//   transform: translate3d(0, 20px, 0);
// }
// 100%{
//   opacity: 1;
//   transform: translate3d(0, 0px, 0);
// }
from {
  opacity: 0;
  // transform: translate3d(0, 0px, 0, 50px);
  transform: translateY(5px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

  const Posterref = useRef(null);
  // useEffect(() => {
  //   const handleScrollPoster = () => {
  //     if (!Posterref.current) return;
  //     // console.log(loaded)
  //     if (Posterref.current) {
  //       const rect = Posterref.current.getBoundingClientRect();
  //       if (rect.top < window.innerHeight && rect.bottom > 0) {
  //         // console.log("Is Visible");
  //         document.querySelector(".project-cover-full__background").classList.add("no-more");
  //         setTimeout(() => {
  //           document.querySelector(".project-cover-full__image").classList.add("out-up");
  //         }, 400);
  //         props.setVisible(true);
  //         // document.querySelector('.back-button__holder').classList.add('visible');
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScrollPoster);
  //   return () => window.removeEventListener("scroll", handleScrollPoster);
  // }, [loaded]);

  const PosterrefTop = useRef(null);
  // useEffect(() => {
  //   const handleScrollPosterTop = () => {
  //     if (!PosterrefTop.current) return;
  //     // console.log(loaded)
  //     if (PosterrefTop.current) {
  //       const rect = PosterrefTop.current.getBoundingClientRect();
  //       if (rect.top < window.innerHeight && rect.bottom > 0) {
  //         // console.log("Is Visible AGAIN");
  //         document.querySelector(".project-cover-full__background").classList.remove("no-more");
  //         setTimeout(() => {
  //           document.querySelector(".project-cover-full__image").classList.remove("out-up");
  //         }, 400);
  //         props.setVisible(false);
  //         // document.querySelector('.back-button__holder').classList.remove('visible');
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScrollPosterTop);
  //   return () => window.removeEventListener("scroll", handleScrollPosterTop);
  // }, [loaded]);

  const ProjImgsRef = useRef(null);
  useEffect(() => {
    const handleScrollPosterTop = () => {
      if (!ProjImgsRef.current) return;
      // console.log(loaded)
      if (ProjImgsRef.current) {
        const rect = ProjImgsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // console.log("Is Visible AGAIN");
          document.querySelector(".images-holder").classList.add("is-vis");
        }
      }
    };
    window.addEventListener("scroll", handleScrollPosterTop);
    return () => window.removeEventListener("scroll", handleScrollPosterTop);
  }, [loaded]);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="project__container page" style={{ color: `${project.fields.colorText}` }}>
      <div className="project__background" style={{ backgroundColor: `${project.fields.colorTheme}` }}>
        <div id="top" />
        <Helmet>
          <meta charSet="utf-8" />
          <title>MELLLLLLT - {project.fields.name}</title>
        </Helmet>

        <div
          style={{
            position: "absolute",
            top: "20vh",
            height: "50px",
            width: "50px",
            // backgroundColor: "red"
          }}
          ref={PosterrefTop}
        />

        <div
          style={{
            position: "absolute",
            top: "120vh",
            height: "50px",
            width: "50px",
            // backgroundColor: "red"
          }}
          ref={Posterref}
        />

        <ProjectCover project={project} viewport={props.viewport} widthCutOff={props.widthCutOff} />

        <ProjectText
          project={project}
          hrRef={hrRef}
          customAnimation={customAnimation}
          customAnimationProjectKeyWords={customAnimationProjectKeyWords}
        />

        <div
          className="proj-img-ref-div"
          style={{
            // Fades in Out Images
            position: "relative",
            top: "40vh",
            height: "50px",
            width: "50px",
            // backgroundColor: "blue"
          }}
          ref={ProjImgsRef}
        />

        <div
          style={{
            width: "50px",
            height: "50px",
            // backgroundColor: 'blue',
            position: "relative",
            top: project.fields.mainVid ? "320px" : "350px",
            marginBottom: project.fields.mainVid ? "10vh" : 0,
          }}
          ref={ref}
        />

        <ProjectImages project={project} customAnimationProjectImages={customAnimationProjectImages} />

        <Fade
          keyframes={customAnimationCloseProj}
          opposite
          direction="up"
          duration={3000}
          delay={0}
          triggerOnce={false}
          fraction={0}
        >
          <ProjectNav prev={prev} next={next} />
        </Fade>
      </div>
    </div>
  );
}

const ProjectImages = ({ project, customAnimationProjectImages }) => {
  return (
    <div className="images-holder">
      {window.innerWidth > 800 ? (
        <>
          {project.fields.images.map((image, index) => (
            <div key={`project-div ${index}`} className="project-image__holder">
              <Fade
                keyframes={customAnimationProjectImages}
                opposite
                direction="up"
                duration={2000}
                delay={0}
                triggerOnce={false}
                fraction={0}
              >
                {image.type === "video/mp4" ? (
                  <>
                    <ReactPlayer
                      // style={{backgroundColor:project.fields.cursorColor}}
                      // className="project-cover-full__image"
                      width="90vw"
                      height="auto"
                      url={image.url}
                      // url="https://res.cloudinary.com/bobalobbadingdong/video/upload/v1673907034/Cherry/Cherry%20Clients/Graphic%20Assets/P1022_CRIME_SCENE_S03_OPEN_R06_4444_CROP_hokk8v.mp4"
                      // onStart={() => }
                      // playing={vidPlay}
                      controls
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="project__images"
                      key={`project ${index}`}
                      alt={`project ${index}`}
                      src={image.url}
                    />
                  </>
                )}
              </Fade>
            </div>
          ))}
        </>
      ) : (
        <>
          {project.fields.mobileImages ? (
            <>
              {project.fields.mobileImages.map((image, index) => (
                <div key={`project-div ${index}`} className="mobile-project-image__holder">
                  <Fade
                    keyframes={customAnimationProjectImages}
                    opposite
                    direction="up"
                    duration={2000}
                    delay={0}
                    triggerOnce={false}
                    fraction={0}
                  >
                    <img
                      className="project__images"
                      key={`project ${index}`}
                      alt={`project ${index}`}
                      src={image.url}
                    />
                  </Fade>
                </div>
              ))}
            </>
          ) : (
            <>
              {project.fields.images.map((image, index) => (
                <div key={`project-div ${index}`} className="project-image__holder">
                  <Fade
                    keyframes={customAnimationProjectImages}
                    opposite
                    direction="up"
                    duration={2000}
                    delay={0}
                    triggerOnce={false}
                    fraction={0}
                  >
                    {image.type === "video/mp4" ? (
                      <>
                        <ReactPlayer
                          // style={{backgroundColor:project.fields.cursorColor}}
                          // className="project-cover-full__image"
                          width="90vw"
                          height="auto"
                          url={image.url}
                          // url="https://res.cloudinary.com/bobalobbadingdong/video/upload/v1673907034/Cherry/Cherry%20Clients/Graphic%20Assets/P1022_CRIME_SCENE_S03_OPEN_R06_4444_CROP_hokk8v.mp4"
                          // onStart={() => }
                          // playing={vidPlay}
                          controls
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="project__images"
                          key={`project ${index}`}
                          alt={`project ${index}`}
                          src={image.url}
                        />
                      </>
                    )}
                  </Fade>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

const ProjectText = ({ project, hrRef, customAnimation, customAnimationProjectKeyWords }) => {
  return (
    <div className="project__content-holder">
      <div id="project-about__hr-line__holder" className="project-about__hr-line__holder"></div>

      <div ref={hrRef} className="project__text-holder ">
        <div className="project__about-sections">
          <div className="project-about__section-one">
            {project.fields.projectCopy && (
              <>
                <Fade
                  keyframes={customAnimation}
                  opposite
                  direction="up"
                  duration={3000}
                  delay={0}
                  triggerOnce={true}
                  fraction={0}
                >
                  <h1 className="project-title ">{project.fields.name}</h1>

                  <h3 className="proj-description ">{project.fields.description}</h3>
                  <h1 className="jumbo-text">{project.fields.projectCopy}</h1>
                </Fade>
              </>
            )}
          </div>

          <div id="project-about__section-one__mobile" className="project-about__section-one__mobile">
            {project.fields.projectCopy && (
              <>
                <h1 className="project-title show">{project.fields.name}</h1>
                <h3 className="proj-description ">{project.fields.description}</h3>
                <h1 className="jumbo-text">{project.fields.projectCopy}</h1>
              </>
            )}
          </div>

          <div className="project-about__section-three">
            {project.fields.projectScope && (
              <>
                <Fade direction="up" duration={1500} delay={1000} triggerOnce={true} fraction={0}>
                  <h1 className="project_scope">Project Scope</h1>
                </Fade>
                <div className="project-about__section-two-mobile">
                  <hr className="hr-line" style={{ backgroundColor: `${project.fields.colorText}` }} />
                </div>
                <div className="project__tags-list">
                  <Fade
                    keyframes={customAnimationProjectKeyWords}
                    className="project__tags"
                    cascade
                    // direction="left"
                    duration={700}
                    delay={1500}
                    triggerOnce={true}
                    fraction={0}
                  >
                    {project.fields.projectScope.map((tag) => (
                      <div key={`tag: ${tag}`}>
                        <h3 key={`tag h3: ${tag}`} className="project__tags">
                          {tag}
                        </h3>
                        <div id="proj-content-holder" />
                      </div>
                    ))}
                  </Fade>
                </div>
              </>
            )}
            {project.fields.projectCollaborators && (
              <div className="credit-section ">
                <div className="only-on-mobile">
                  <hr className="hr-line" style={{ backgroundColor: `${project.fields.colorText}` }} />
                </div>
                <Fade cascade={true} direction="up" duration={1500} delay={1000} triggerOnce={false} fraction={0}>
                  <h1 className="project_scope">Collaborators</h1>

                  <div className="project__tags-list">
                    {project.fields.projectCollaborators.map((collaborator, index) => (
                      <div key={`${collaborator}+${index}+holder`}>
                        <h3 key={collaborator + index} className="project-collaborators">
                          {collaborator}
                        </h3>
                      </div>
                    ))}
                  </div>
                </Fade>
              </div>
            )}
          </div>

          <div className="project-about__section-three__mobile">
            {project.fields.projectScope && (
              <>
                <h1 className="project_scope">Project Scope</h1>

                <div className="project-about__section-two-mobile">
                  <hr className="hr-line" style={{ backgroundColor: `${project.fields.colorText}` }} />
                </div>

                {project.fields.projectScope.map((tag) => (
                  <div className="project__tags" key={`tag: ${tag}`}>
                    <h3 key={`tag h3: ${tag}`} className="project__tags">
                      {tag}
                    </h3>

                    <div id="proj-content-holder" />
                  </div>
                ))}
              </>
            )}

            {project.fields.projectCollaborators && (
              <div className="credit-section ">
                <div className="only-on-mobile">
                  <hr className="hr-line" style={{ backgroundColor: `${project.fields.colorText}` }} />
                </div>

                <h1 className="project_scope">Collaborators</h1>
                <hr
                  className="hr-line"
                  style={{
                    backgroundColor: `${project.fields.colorText}`,
                    marginTop: "-12px",
                    marginBottom: "20px",
                  }}
                />
                {project.fields.projectCollaborators.map((collaborator, index) => (
                  <div style={{ display: "flex", flexDirection: "column" }} key={`${collaborator}+${index}+holder`}>
                    <h3 key={collaborator + index} className="project-collaborators">
                      {collaborator}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {project.fields.mainVid && <div className="space-wid-after-collab" />}
      </div>
    </div>
  );
};

// const ProjectTitle = ({ project, animatedIsVisible }) => {
//   return (
//     <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={animatedIsVisible}>
//       <ProjectTitleTransition
//         title={project.fields.name}
//         subtitle={project.fields.description}
//         colorTheme={project.fields.colorTheme}
//         visibleText={true}
//         colorText={project.fields.colorText}
//       />
//     </Animated>
//   );
// };
