import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ProjectCoverMedia from "../ProjectCoverMedia/ProjectCoverMedia.jsx";
import "./ProjectCover.css";

const ProjectCover = ({ project, viewport, widthCutOff }) => {
  const cover = useRef();

  const [vidPlay, setVidPlay] = useState(false);
  const [vidCursor, setVidCursor] = useState(
    "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png"
  );

  const { mainImage, mainVid } = project.fields;
  if (!mainImage && !mainVid) return null;

  const handleEntry = {
    onViewportEnter: () => {
      if (cover.current) {
        cover.current.classList.add("show");
      }
    },
    onViewportLeave: () => {
      if (cover.current) {
        cover.current.classList.remove("show");
      }
    },
  };

  const handleLoad = () => {
    if (cover.current) {
      cover.current.classList.add("loaded");
    }
  };

  const cursorToggle = () => {
    if (
      vidCursor ===
      "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png"
    ) {
      setVidCursor(
        "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__X-white_irckou.png"
      );
    } else {
      setVidCursor(
        "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png"
      );
    }
  };

  const toggleVidPlay = () => {
    // console.log("hello");
    if (vidPlay === false) {
      setVidPlay(true);
      cursorToggle();
    } else {
      setVidPlay(false);
      cursorToggle();
    }
  };

  return (
    <>
      {/* <ProjectTitle project={project} animatedIsVisible={animatedIsVisible} /> */}

      <motion.div
        ref={cover}
        className={`project-cover-full${mainVid ? " wide" : ""}`}
        style={{
          backgroundColor: viewport.width < widthCutOff ? "transparent" : project.fields.cursorColor,
        }}
        viewport={{ amount: 0.6 }}
        {...handleEntry}
      >
        <div
          className="project-cover-full__background"
          onClick={mainVid ? () => toggleVidPlay() : null}
          style={{
            cursor: mainVid ? `url(${vidCursor}), auto` : "default",
          }}
        >
          <ProjectCoverMedia project={project} handleLoad={handleLoad} vidPlay={vidPlay} />
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCover;
