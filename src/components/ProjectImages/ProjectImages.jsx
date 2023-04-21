import { useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectImages.css";

import Pattern from "../../assets/images/MELT__PATTERN.png";

const ProjectImage = ({ image, project, viewport }) => {
  // const [loading, setLoading] = useState(true)

  const ref = useRef();
  const imgHolder = useRef();

  const size = useMemo(() => {
    const size = {};
    if (image.type !== "video/mp4") {
      const { width, height } = image;
      if (width && height) {
        const aspect = height / width;
        size.width = viewport.width;
        size.height = viewport.width * aspect;
      }
    }

    return size;
  }, [image, viewport.width]);

  const handleLoad = () => {
    if (ref && ref.current) {
      if (image.type !== "video/mp4") {
        ref.current.style.height = "auto";
        ref.current.style.background = "none";
      }

      if (ref.current.wrapper) ref.current.wrapper.classList.remove("loading");
      else ref.current.classList.remove("loading");
      // imgHolder.current.style.background = "transparent";
      imgHolder.current.classList.remove("loading");
    }
  };

  return (
    <FadeScroll key={image.id} viewport={{ amount: 0.25 }} className="project-images__image-container">
      <div
        ref={imgHolder}
        className="project-images__image-holder loading"
        style={{ background: `url(${Pattern}) no-repeat center` }}
      >
        {image.type === "video/mp4" ? (
          <ReactPlayer
            className="project-images__image video loading"
            width="100%"
            height="auto"
            url={image.url}
            // controls
            muted={true}
            volume={0}
            playing={true}
            loop={true}
            autoPlay={true}
            ref={ref}
            onReady={handleLoad}
          />
        ) : (
          <img
            ref={ref}
            className="project-images__image loading"
            alt={project.name}
            src={image.url}
            loading="lazy"
            onLoad={handleLoad}
            style={{ height: size.height ? size.height : "auto" }}
          />
        )}
      </div>
    </FadeScroll>
  );
};

const ProjectImages = ({ project, mobile, viewport }) => {
  const { images, mobileImages } = project.fields;

  if (!images && !mobileImages) return null;

  let projectImages = null;
  if (mobile) {
    if (mobileImages) projectImages = mobileImages;
    else if (images) projectImages = images;
  } else {
    if (images) projectImages = images;
    else if (mobileImages) projectImages = mobileImages;
  }

  return (
    <>
      {projectImages && (
        <div className="project-images">
          {projectImages.map((image) => (
            <ProjectImage key={image.id} image={image} project={project} viewport={viewport} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectImages;
