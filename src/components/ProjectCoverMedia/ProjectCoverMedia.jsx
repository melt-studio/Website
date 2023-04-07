import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { cursorEvents } from "../Cursor/Cursor";
import "./ProjectCoverMedia.css";

const ProjectCoverMedia = ({ project, setLoading, cursor, viewport }) => {
  const [vidPlay, setVidPlay] = useState(false);
  const [size, setSize] = useState(null);

  const ref = useRef();

  const toggleVidPlay = () => {
    setVidPlay(!vidPlay);
    if (cursor && cursor.current) {
      cursor.current.classList.toggle("playing");
    }
  };

  useEffect(() => {
    const resize = () => {
      // Get aspect ratio of image
      // console.log(ref.current);
      // console.log(ref.current.width);
      // console.log(ref.current.height);
      // console.log(viewport);

      if (ref && ref.current && size) {
        const aS = viewport.width / viewport.height;
        const aI = size.width / size.height;

        // console.log(aS, aI);
        let target = ref.current.wrapper ? ref.current.wrapper.children[0] : ref.current;

        if (aI > aS) {
          target.style.width = "100%";
          target.style.height = "auto";
        } else {
          target.style.width = "auto";
          target.style.height = "100%";
        }
      }
    };

    resize();
  }, [viewport, size]);

  const { mainImage, mainVid } = project.fields;

  const className = "project-cover-full__image";

  const handleLoad = (e) => {
    if (ref.current) {
      if (ref.current.wrapper) {
        // for ReactPlayer
        ref.current.wrapper.classList.add("loaded");

        // console.log(e.wrapper.children[0].videoHeight);

        setSize({ width: e.wrapper.children[0].videoWidth, height: e.wrapper.children[0].videoHeight });
      } else {
        ref.current.classList.add("loaded");

        // console.log(e);
        setSize({ width: e.target.naturalWidth, height: e.target.naturalHeight });
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
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
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
