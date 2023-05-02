import { useState, useMemo } from "react";
import ProjectCoverMedia from "../ProjectCoverMedia/ProjectCoverMedia.jsx";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectCover.css";
import Background from "../Background/Background.js";

const ProjectCover = ({ project, overlay, mobile, viewport, cursor }) => {
  const [loading, setLoading] = useState(true);

  const { mainImage, mainVid } = project.fields;

  const size = useMemo(() => {
    const size = {};
    if (mainImage && mainImage[0] && mainImage[0].type !== "video/mp4") {
      const { width, height } = mainImage[0];
      if (width && height) {
        const aspect = height / width;
        // console.log(aspect);
        const scl = 1;
        size.width = viewport.width * scl;
        size.height = viewport.width * aspect * scl;
      }
    }

    return size;
  }, [mainImage, viewport.width]);

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
    background: mobile ? "transparent" : `linear-gradient(to bottom, ${background[0]} 35%, ${background[1]} 100%)`, // to match Background smoothstep
    // backgroundColor: project.fields.cursorColor,
    // backgroundColor: mobile ? "transparent" : project.fields.cursorColor,
  };

  if (mobile && size.height) {
    style.height = size.height;
  }

  return (
    <>
      <FadeScroll
        viewport={{ amount: 0.7 }}
        className={`project-cover-full${mainVid ? " wide" : ""}`}
        // style={style}
      >
        {!mobile && <Background backgroundColor={project.fields.backgroundColor} />}
        <FadeScroll
          viewport={{ amount: 0.3 }}
          className={`project-cover-full__background${loading ? " loading" : ""} show`}
        >
          <ProjectCoverMedia
            overlay={overlay}
            project={project}
            setLoading={setLoading}
            cursor={cursor}
            mobile={mobile}
            viewport={viewport}
          />
        </FadeScroll>
      </FadeScroll>
    </>
  );
};

export default ProjectCover;
