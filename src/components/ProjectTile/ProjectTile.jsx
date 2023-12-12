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
  filtered = false,
}) => {
  const width = mobile ? 85 : project.width;
  const { xAxis, yAxis } = project;
  // const yAxisDefault = project.yAxis;

  // const w = (1 - project.width / 100) * 0.9;
  // const l = Math.random() * w + 0.1;
  // console.log(w);

  const style = {
    // left: mobile ? 0 : filtered ? 0 : `${l * 100}%`,
    left: mobile ? 0 : filtered ? 0 : `${yAxis}%`,
    marginTop: mobile ? 0 : filtered ? 0 : `${width > 30 ? 0 : xAxis}px`,
    // width: `${width}vw`,
    // width: !mobile && filtered ? `${width / 1}vw` : `${width}vw`,
    // height:
    //   !mobile && filtered
    //     ? `${(((viewport.width * width) / 100) * (1 / project.cover.aspect)) / 1.15}px`
    //     : `${((viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
  };

  if (mobile || !filtered) {
    style.width = `${width}vw`;
  }

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
