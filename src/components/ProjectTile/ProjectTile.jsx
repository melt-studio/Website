import FadeScroll from "../FadeScroll/FadeScroll";
import "./ProjectTile.css";

const ProjectTile = ({
  i,
  project,
  mobile,
  viewport,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  setLoaded,
  projectsAll,
}) => {
  const width = mobile ? 85 : project.width;
  const { xAxis, yAxis } = projectsAll[i].fields;
  const style = {
    left: mobile ? 0 : `${yAxis}%`,
    marginTop: mobile ? 0 : `${xAxis}px`,
    width: `${width}vw`,
    height: `${((viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
  };

  return (
    <FadeScroll id={`project_${project.id}`} viewport={{ amount: mobile ? 0.15 : 0.25 }}>
      <div className="project">
        <img
          src={project.cover.url}
          onMouseEnter={() => handleMouseEnter(project)}
          onMouseLeave={() => handleMouseLeave(project)}
          className="project__cover-img"
          loading="lazy"
          alt={project.name}
          style={style}
          onClick={() => handleClick(project)}
          onLoad={() => {
            if (i === 0) setLoaded(true);
          }}
        />
      </div>
    </FadeScroll>
  );
};

export default ProjectTile;
