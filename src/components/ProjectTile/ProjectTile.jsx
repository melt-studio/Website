import { useRef } from "react";
import FadeScroll from "../FadeScroll/FadeScroll";
import "./ProjectTile.css";
import { MathUtils } from "three";

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
  count,
}) => {
  const projectContainer = useRef();
  const projectImg = useRef();

  const width = mobile ? 85 : project.width;
  // const { xAxis, yAxis } = project;

  // const yAxisDefault = project.yAxis;

  let w = (1 - project.width / 100) * 0.9;
  if (i % 2 === 0) w = (5 + w * 100) * 0.15;
  else w = w * 100 * 0.85;
  w += project.random * 5;

  // const l = Math.random() * w + 0.1;
  // console.log(w);

  const styleImg = {};

  const style = {
    // left: mobile ? 0 : filtered ? 0 : `${l * 100}%`,
    // left: mobile ? 0 : filtered ? 0 : `${yAxis}%`,
    left: mobile || filtered ? 0 : i === 0 ? "35%" : `${w}%`,
    marginTop: mobile || filtered || i < 2 ? 0 : `${MathUtils.mapLinear(project.random, -1, 1, -225, 100)}px`,
    // marginTop: mobile ? 0 : filtered ? 0 : `${width > 30 ? 0 : xAxis}px`,
    // width: `${width}vw`,
    // width: !mobile && filtered ? `${width / 1}vw` : `${width}vw`,
    // height:
    //   !mobile && filtered
    //     ? `${(((viewport.width * width) / 100) * (1 / project.cover.aspect)) / 1.15}px`
    //     : `${((viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
  };

  if (mobile || !filtered) {
    style.width = `${width}vw`;
    styleImg.width = style.width;
  }

  if (!(mobile || filtered)) {
    if (project.width > 30) style.marginTop = 0;
    if (projectsAll[Math.max(i - 1, 0)].fields.width > 30) style.marginTop = 0;
  }

  if (filtered && projectContainer.current) {
    projectContainer.current.style.animationDelay = `${2 + i * 0.25}s`;
  }

  if (projectImg.current) {
    if (filtered && !mobile) {
      projectImg.current.style.transitionDelay = `${(i % count) * 0.25}s`;
    } else {
      projectImg.current.style.transitionDelay = 0;
    }
  }

  return (
    <FadeScroll id={`project_${project.id}`} viewport={{ amount: mobile ? 0.15 : 0.25 }}>
      <div className="project" ref={projectContainer}>
        <div className="project-inner" ref={projectImg} style={style}>
          <img
            src={project.cover.url}
            onMouseEnter={() => handleMouseEnter(project)}
            onMouseLeave={() => handleMouseLeave(project)}
            className="project__cover-img"
            loading="lazy"
            alt={project.name}
            style={styleImg}
            onClick={() => handleClick(project)}
            onLoad={() => {
              if (i === 0) setLoaded(true);
            }}
          />
        </div>
      </div>
    </FadeScroll>
  );
};

export default ProjectTile;
