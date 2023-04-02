import ReactPlayer from "react-player";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectImages.css";

const ProjectImages = ({ project, viewport, widthCutOff }) => {
  const { images, mobileImages } = project.fields;

  if (!images && !mobileImages) return null;

  const projectImages = viewport.width < widthCutOff ? mobileImages : images;

  // Could add fallback to alternate set of images
  if (!projectImages) return null;

  return (
    <div className="project-images">
      {projectImages.map((image) => (
        <FadeScroll key={image.id} viewport={{ amount: 0.25 }} className="project-images__image-container">
          {image.type === "video/mp4" ? (
            <ReactPlayer className="project-images__image video" width="90vw" height="auto" url={image.url} controls />
          ) : (
            <img className="project-images__image" alt={project.name} src={image.url} loading="lazy" />
          )}
        </FadeScroll>
      ))}
    </div>
  );
};

export default ProjectImages;
