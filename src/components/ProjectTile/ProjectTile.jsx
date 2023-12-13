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
  projectData,
  // projectsAll,
  filtered = false,
  count,
}) => {
  const projectContainer = useRef();
  const projectImg = useRef();

  // const width = mobile ? 85 : project.width;
  let aspect = project.cover.aspect;
  if (isNaN(aspect) || aspect === Infinity || aspect === 0) aspect = 30;

  const width = mobile ? 85 : aspect <= 1 ? 30 : 55;

  // const { xAxis, yAxis } = project;
  let { xOff, yOff } = project;
  if (xOff === undefined) xOff = 0;
  else xOff = MathUtils.clamp(xOff, -100, 100);
  if (yOff === undefined) yOff = 0;
  else yOff = MathUtils.clamp(yOff, -100, 100);
  // console.log(xOff, yOff);

  // const yAxisDefault = project.yAxis;

  // let w = (1 - project.width / 100) * 0.9;

  // let x = (1 - width / 100) * 0.9;
  // if (i % 2 === 0) x = (5 + x * 100) * 0.15;
  // else x = x * 100 * 0.85;
  // x += project.random * 5;

  const pad = 5;
  const xMin = pad;
  const xMax = 100 - pad - width;
  const dir = i % 2 === 0 ? 1 : -1;
  let x0 = MathUtils.lerp(xMin, xMax, i === 0 ? 0.5 : i % 2);
  if (i > 0) x0 += ((Math.abs(project.random) * (xMax - xMin)) / 4) * dir;
  x0 = MathUtils.clamp(x0 + xOff, xMin, xMax);

  // const l = Math.random() * w + 0.1;
  // console.log(w);

  // console.log(project.cover.aspect);

  const styleImg = {};

  const style = {
    // left: mobile ? 0 : filtered ? 0 : `${l * 100}%`,
    // left: mobile ? 0 : filtered ? 0 : `${yAxis}%`,
    // left: mobile || filtered ? 0 : i === 0 ? `${35 + xOff}%` : `${x + xOff}%`,
    left: mobile || filtered ? 0 : `${x0}%`,
    marginTop: 0,
    // marginTop: mobile ? 0 : filtered ? 0 : `${width > 30 ? 0 : xAxis}px`,
    // width: `${width}vw`,
    // width: !mobile && filtered ? `${width / 1}vw` : `${width}vw`,
    // height:
    //   !mobile && filtered
    //     ? `${(((viewport.width * width) / 100) * (1 / project.cover.aspect)) / 1.15}px`
    //     : `${((viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
    height: `${((document.body.clientWidth * width) / 100) * (1 / project.cover.aspect)}px`,
  };

  if (!mobile && filtered) {
    const filter = project.tag;
    const f = filter !== undefined && filter.length > 0 ? filter.trim().toLowerCase() : "print";
    let sw = 0.3;
    let mw = 400;
    if (f === "motion") {
      sw = 0.475;
      mw = 1000;
    }
    const wv = Math.min(3480, document.body.clientWidth);
    const p = Math.min(80, 0.05 * wv);
    const wa = wv - 2 * p;
    const wi = Math.min(mw, sw * wa);
    const h = wi / project.cover.aspect;
    style.height = `${h}px`;
  }

  if (mobile || !filtered) {
    style.width = `${width}%`;
    // styleImg.width = style.width;
  }

  if (!(mobile || filtered)) {
    // if (project.width > 30) style.marginTop = 0;
    // NB: margin values as % are relative to the width of the containing block
    if (i < 2) style.marginTop = `${yOff}%`;
    else if (project.cover.aspect > 1 || projectData[Math.max(i - 1, 0)].cover.aspect > 1)
      style.marginTop = `${yOff + 2.5}%`;
    else style.marginTop = `${MathUtils.mapLinear(project.random, -1, 1, -22.5, 10) + yOff}%`;
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
