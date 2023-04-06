import { useState, useMemo } from "react";
import ProjectCoverMedia from "../ProjectCoverMedia/ProjectCoverMedia.jsx";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectCover.css";

const ProjectCover = ({ project, overlay, viewport, widthCutOff, cursor }) => {
  const [loading, setLoading] = useState(true);

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

  if (!mainImage && !mainVid) return null;

  const background = project.fields.backgroundColor
    .split(",")
    .map((c) => c.trim())
    .slice(0, 2);
  if (background.length === 0)
    background[0] = "#000000"; // fallback bacground if not set in airtable (validate data in services)
  else if (background.length === 1) background.push(background[0]);

  const style = {
    background:
      viewport.width < widthCutOff
        ? "transparent"
        : `linear-gradient(to bottom, ${background[0]} 35%, ${background[1]} 100%)`, // to match Background smoothstep
    // backgroundColor: project.fields.cursorColor,
    // backgroundColor: viewport.width < widthCutOff ? "transparent" : project.fields.cursorColor,
  };

  if (viewport.width < widthCutOff && size.height) {
    style.height = size.height;
  }

  return (
    <>
      <FadeScroll viewport={{ amount: 0.7 }} className={`project-cover-full${mainVid ? " wide" : ""}`} style={style}>
        <FadeScroll
          viewport={{ amount: 0.3 }}
          className={`project-cover-full__background${loading ? " loading" : ""} show`}
        >
          <ProjectCoverMedia overlay={overlay} project={project} setLoading={setLoading} cursor={cursor} />
        </FadeScroll>
      </FadeScroll>
    </>
  );
};

export default ProjectCover;
