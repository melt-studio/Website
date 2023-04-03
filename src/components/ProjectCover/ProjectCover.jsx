import { useEffect, useState } from "react";
import ProjectCoverMedia from "../ProjectCoverMedia/ProjectCoverMedia.jsx";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectCover.css";

import cursorPlay from "../../assets/cursors/MELT__PLAY.svg";
import cursorPause from "../../assets/cursors/MELT__PAUSE.svg";

const ProjectCover = ({ project, overlay, viewport, widthCutOff }) => {
  const [vidPlay, setVidPlay] = useState(false);
  const [vidCursor, setVidCursor] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVidPlay = () => {
    setVidPlay(!vidPlay);
  };

  // useEffect(() => {
  //   console.log("PROJECT COVER");
  // }, []);

  useEffect(() => {
    if (!loading) setVidCursor(vidPlay ? cursorPause : cursorPlay);
  }, [loading, vidPlay]);

  const { mainImage, mainVid } = project.fields;
  if (!mainImage && !mainVid) return null;

  return (
    <>
      <FadeScroll
        viewport={{ amount: 0.25 }}
        className={`project-cover-full${mainVid ? " wide" : ""}`}
        style={{
          backgroundColor: viewport.width < widthCutOff ? "transparent" : project.fields.cursorColor,
          // backgroundColor: project.fields.cursorColor,
        }}
      >
        <div
          className={`project-cover-full__background${loading ? " loading" : ""}`}
          onClick={mainVid ? () => toggleVidPlay() : null}
          style={{
            cursor: mainVid && vidCursor ? `url(${vidCursor}) 40 40, auto` : "default",
          }}
        >
          <ProjectCoverMedia overlay={overlay} project={project} setLoading={setLoading} vidPlay={vidPlay} />
        </div>
      </FadeScroll>
    </>
  );
};

export default ProjectCover;
