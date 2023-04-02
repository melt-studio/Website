import { useRef } from "react";
import ReactPlayer from "react-player";
import "./ProjectCoverMedia.css";

const ProjectCoverMedia = ({ project, vidPlay }) => {
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
  };

  if (mainImage && mainImage[0] && mainImage[0].url) {
    return (
      <img
        onLoad={handleLoad}
        className={className}
        src={project.fields.mainImage[0].url}
        alt={project.fields.name}
        loading="lazy"
        ref={ref}
      />
    );
  }

  if (mainVid && mainVid[0] && mainVid[0].url) {
    return (
      <ReactPlayer
        width="100%"
        height="auto"
        className={`${className} video`}
        url={project.fields.mainVid[0].url}
        playing={vidPlay}
        onReady={handleLoad}
        ref={ref}
      />
    );
  }

  return null;
};

export default ProjectCoverMedia;
