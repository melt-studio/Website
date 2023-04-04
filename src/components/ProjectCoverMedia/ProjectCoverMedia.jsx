import { useRef } from "react";
import ReactPlayer from "react-player";
import { cursorEvents } from "../Cursor/Cursor";
import "./ProjectCoverMedia.css";

const ProjectCoverMedia = ({ project, setLoading, vidPlay }) => {
  const ref = useRef();

  const { mainImage, mainVid } = project.fields;

  const className = "project-cover-full__image";

  const handleLoad = () => {
    if (ref.current) {
      if (ref.current.wrapper) {
        // for ReactPlayer
        ref.current.wrapper.classList.add("loaded");
      } else {
        ref.current.classList.add("loaded");
      }
    }

    // if (overlay && overlay.current) {
    //   overlay.current.classList.remove("show");
    // }

    setLoading(false);
  };

  if (mainImage && mainImage[0] && mainImage[0].url) {
    return (
      <img
        src={project.fields.mainImage[0].url}
        key={project.fields.mainImage[0].url}
        onLoad={handleLoad}
        className={className}
        alt={project.fields.name}
        loading="lazy"
        ref={ref}
      />
    );
  }

  if (mainVid && mainVid[0] && mainVid[0].url) {
    return (
      <ReactPlayer
        url={project.fields.mainVid[0].url}
        key={project.fields.mainVid[0].url}
        width="100%"
        height="auto"
        className={`${className} video`}
        onMouseEnter={() => cursorEvents.onMouseEnter("video")}
        onMouseLeave={() => cursorEvents.onMouseLeave("video")}
        playing={vidPlay}
        onReady={handleLoad}
        ref={ref}
        style={
          {
            // cursor: vidCursor ? `url(${vidCursor}) 40 40, auto` : "default",
          }
        }
      />
    );
  }

  return null;
};

export default ProjectCoverMedia;
