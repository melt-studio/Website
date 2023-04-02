import { useState } from "react";
import ProjectCoverMedia from "../ProjectCoverMedia/ProjectCoverMedia.jsx";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectCover.css";

const ProjectCover = ({ project, viewport, widthCutOff }) => {
  const [vidPlay, setVidPlay] = useState(false);
  const [vidCursor, setVidCursor] = useState(
    "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png"
  );

  const { mainImage, mainVid } = project.fields;
  if (!mainImage && !mainVid) return null;

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
      <FadeScroll
        viewport={{ amount: 0.25 }}
        className={`project-cover-full${mainVid ? " wide" : ""}`}
        style={{
          backgroundColor: viewport.width < widthCutOff ? "transparent" : project.fields.cursorColor,
        }}
      >
        <div
          className="project-cover-full__background"
          onClick={mainVid ? () => toggleVidPlay() : null}
          style={{
            cursor: mainVid ? `url(${vidCursor}), auto` : "default",
          }}
        >
          <ProjectCoverMedia project={project} vidPlay={vidPlay} />
        </div>
      </FadeScroll>
    </>
  );
};

export default ProjectCover;
