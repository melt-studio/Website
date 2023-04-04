import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { cursorEvents } from "../Cursor/Cursor";
import "./ProjectCoverMedia.css";

const ProjectCoverMedia = ({ project, setLoading, cursor }) => {
  const [vidPlay, setVidPlay] = useState(false);

  const ref = useRef();

  const toggleVidPlay = () => {
    setVidPlay(!vidPlay);
    if (cursor && cursor.current) {
      cursor.current.classList.toggle("playing");
    }
  };

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
      <div
        onClick={toggleVidPlay}
        onMouseEnter={() => cursorEvents.onMouseEnter("video")}
        onMouseLeave={() => cursorEvents.onMouseLeave("video")}
      >
        <ReactPlayer
          url={project.fields.mainVid[0].url}
          key={project.fields.mainVid[0].url}
          width="100%"
          height="auto"
          className={`${className} video`}
          playing={vidPlay}
          onReady={handleLoad}
          ref={ref}
        />
      </div>
    );
  }

  return null;
};

export default ProjectCoverMedia;
