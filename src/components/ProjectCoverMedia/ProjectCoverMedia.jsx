import ReactPlayer from "react-player";
import "./ProjectCoverMedia.css";

const ProjectCoverMedia = ({ project, handleLoad, vidPlay }) => {
  const { mainImage, mainVid } = project.fields;

  const className = "project-cover-full__image";

  if (mainImage && mainImage[0] && mainImage[0].url) {
    return (
      <img
        onLoad={handleLoad}
        className={className}
        src={project.fields.mainImage[0].url}
        alt={project.fields.name}
        loading="lazy"
      />
    );
  }

  if (mainVid && mainVid[0] && mainVid[0].url) {
    return (
      <ReactPlayer
        width="100%"
        height="auto"
        className={className}
        url={project.fields.mainVid[0].url}
        playing={vidPlay}
        onReady={handleLoad}
      />
    );
  }

  return null;
};

export default ProjectCoverMedia;
