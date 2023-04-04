import { useState, useMemo } from "react";
import ProjectCoverMedia from "../ProjectCoverMedia/ProjectCoverMedia.jsx";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectCover.css";

// import cursorPlay from "../../assets/cursors/MELT__PLAY.svg";
// import cursorPause from "../../assets/cursors/MELT__PAUSE.svg";

const ProjectCover = ({ project, overlay, viewport, widthCutOff, cursor }) => {
  const [vidPlay, setVidPlay] = useState(false);
  // const [vidCursor, setVidCursor] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleVidPlay = () => {
    setVidPlay(!vidPlay);
    if (cursor && cursor.current) {
      cursor.current.classList.toggle("playing");
    }
  };

  const { mainImage, mainVid } = project.fields;

  const size = useMemo(() => {
    const size = {};
    if (mainImage && mainImage[0] && mainImage[0].type !== "video/mp4") {
      const { width, height } = mainImage[0];
      if (width && height) {
        const aspect = height / width;
        size.width = viewport.width * 0.9;
        size.height = viewport.width * aspect * 0.9;
      }
    }

    return size;
  }, [mainImage, viewport]);

  // useEffect(() => {
  //   console.log("PROJECT COVER");
  // }, []);

  // useEffect(() => {
  //   if (!loading) setVidCursor(vidPlay ? cursorPause : cursorPlay);
  // }, [loading, vidPlay]);

  if (!mainImage && !mainVid) return null;

  const background = project.fields.backgroundColor
    .split(",")
    .map((c) => c.trim())
    .slice(0, 2);
  if (background.length === 1) background.push(background[0]);

  const style = {
    background: viewport.width < widthCutOff ? "transparent" : `linear-gradient(to bottom, ${background.join(", ")}`,
    // backgroundColor: project.fields.cursorColor,
    // backgroundColor: viewport.width < widthCutOff ? "transparent" : project.fields.cursorColor,
  };

  if (viewport.width < widthCutOff && size.height) {
    style.height = size.height;
  }

  return (
    <>
      <FadeScroll viewport={{ amount: 0.75 }} className={`project-cover-full${mainVid ? " wide" : ""}`} style={style}>
        <div
          className={`project-cover-full__background${loading ? " loading" : ""}`}
          onClick={mainVid ? () => toggleVidPlay() : null}
        >
          <ProjectCoverMedia
            overlay={overlay}
            project={project}
            setLoading={setLoading}
            vidPlay={vidPlay}
            // vidCursor={vidCursor}
            cursor={cursor}
          />
        </div>
      </FadeScroll>
    </>
  );
};

export default ProjectCover;
