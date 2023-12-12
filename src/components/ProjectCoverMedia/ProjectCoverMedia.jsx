import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { cursorEvents } from "../Cursor/Cursor";
import CursorPlay from "../Cursor/CursorPlay";
import "./ProjectCoverMedia.css";

const ProjectCoverMedia = ({ project, setLoading, cursor, mobile, viewport }) => {
  const [vidPlay, setVidPlay] = useState(false);
  const [size, setSize] = useState(null);
  const [showThumb, setShowThumb] = useState(true);

  const ref = useRef();
  const thumbnail = useRef();

  const toggleVidPlay = () => {
    setVidPlay(!vidPlay);
    if (cursor && cursor.current) {
      cursor.current.classList.toggle("playing");
    }
  };

  useEffect(() => {
    const setTargetSize = (target, aI, aS) => {
      if (aI > aS) {
        target.style.width = "100%";
        target.style.height = "auto";
      } else {
        target.style.width = "auto";
        target.style.height = "100%";
      }
    };

    const resize = () => {
      // Get aspect ratio of image
      if (size) {
        const aS = viewport.width / viewport.height;
        const aI = size.width / size.height;

        if (ref.current) {
          let target = ref.current.wrapper ? ref.current.wrapper.children[0] : ref.current;
          setTargetSize(target, aI, aS);
        }

        if (thumbnail.current) {
          let targetThumb = thumbnail.current;
          setTargetSize(targetThumb, aI, aS);
        }
      }
    };

    resize();
  }, [viewport, size]);

  const { mainImage, mainVid, mainVidThumb } = project.fields;

  const className = "project-cover-full__image";

  const handleLoad = (e) => {
    if (ref.current) {
      if (ref.current.wrapper) {
        // for ReactPlayer
        ref.current.wrapper.classList.add("loaded");

        setSize({ width: e.wrapper.children[0].videoWidth, height: e.wrapper.children[0].videoHeight });
      } else {
        ref.current.classList.add("loaded");

        setSize({ width: e.target.naturalWidth, height: e.target.naturalHeight });
      }
    }

    if (thumbnail.current) {
      thumbnail.current.classList.add("loaded");
    }

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
        onMouseEnter={() => cursorEvents.onMouseEnter(["video"])}
        onMouseLeave={() => cursorEvents.onMouseLeave(["video"])}
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {showThumb && mainVidThumb !== undefined && mainVidThumb[0].url !== undefined && (
          <img
            className={`${className} video-thumbnail`}
            src={mainVidThumb[0].url}
            alt={`Thumbnail for ${project.fields.name}`}
            ref={thumbnail}
          />
        )}
        <ReactPlayer
          url={project.fields.mainVid[0].url}
          key={project.fields.mainVid[0].url}
          onStart={() => setShowThumb(false)}
          width="100%"
          height="auto"
          className={`${className} video`}
          playing={vidPlay}
          onReady={handleLoad}
          loop={true}
          ref={ref}
        />
        {mobile && !vidPlay && (
          <div id="video-mobile-icon">
            <CursorPlay />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ProjectCoverMedia;
