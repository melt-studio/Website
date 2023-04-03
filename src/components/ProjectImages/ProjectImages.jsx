import { useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectImages.css";

import Pattern from "../../assets/images/MELT__PATTERN.jpg";

const ProjectImage = ({ image, project, viewport }) => {
  // const [loading, setLoading] = useState(true)

  const img = useRef();
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
  }, [image, viewport]);

  const handleLoad = () => {
    if (img && img.current) {
      img.current.style.height = "auto";
      img.current.style.background = "none";
      img.current.classList.remove("loading");
      // imgHolder.current.style.background = "transparent";
      imgHolder.current.classList.remove("loading");
    }
  };

  return (
    <FadeScroll key={image.id} viewport={{ amount: 0.25 }} className="project-images__image-container">
      {image.type === "video/mp4" ? (
        <ReactPlayer className="project-images__image video" width="90vw" height="auto" url={image.url} controls />
      ) : (
        <div ref={imgHolder} className="project-images__image-holder loading" style={{ background: `url(${Pattern})` }}>
          <img
            ref={img}
            className="project-images__image loading"
            alt={project.name}
            src={image.url}
            loading="lazy"
            onLoad={handleLoad}
            style={{ height: size.height ? size.height : "auto" }}
          />
        </div>
      )}
    </FadeScroll>
  );
};

const ProjectImages = ({ project, viewport, widthCutOff }) => {
  const { images, mobileImages } = project.fields;

  if (!images && !mobileImages) return null;

  const projectImages = viewport.width < widthCutOff ? mobileImages : images;

  // Could add fallback to alternate set of images
  if (!projectImages) return null;

  return (
    <div className="project-images">
      {projectImages.map((image) => (
        <ProjectImage key={image.id} image={image} project={project} viewport={viewport} />
      ))}
    </div>
  );
};

export default ProjectImages;
