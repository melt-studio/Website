import FadeScroll from "../FadeScroll/FadeScroll";
import "./ProjectTile.css";

const ProjectTile = ({ i, project, mobile, viewport, handleMouseEnter, handleMouseLeave, handleClick, setLoaded }) => {
  const width = mobile ? 85 : project.width;
  const style = {
    left: mobile ? 0 : `${project.yAxis}%`,
    marginTop: mobile ? 0 : `${project.xAxis}px`,
    width: `${width}vw`,
    height: `${((viewport.width * width) / 100) * (1 / project.cover.aspect)}px`,
  };

  // console.log(project.url);

  return (
    // <motion.div
    //   key={project.id}
    //   initial={{ opacity: 0, scale: 0.9 }}
    //   whileInView={{ opacity: [0, 1, 1, 1], scale: [0.9, 0.9, 1, 1] }}
    //   transition={{ times: [0, 0.1, 0.75, 1], duration: 2, ease: "easeInOut" }}
    //   // transition={{ type: "spring", stiffness: 50 }}
    //   // viewport={{ amount: 0.5 }}
    // >
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
          // onClick={() => {
          // console.log(e.target.getBoundingClientRect());
          // const rect = e.target.getBoundingClientRect();
          // const { left, top } = rect;
          // const w = rect.width;
          // const h = rect.height;
          // const x = -left + (viewport.width - w) / 2;
          // const y = -top + (viewport.height - h) / 2;
          // const s = h / viewport.height;
          // console.log(s);
          // // e.target.style.transform = `translate(${-project.yAxis + 50 - project.width / 2}vw, 0)`;
          // e.target.style.transform = `translate(${x}px, ${y}px) scale(${1 + s})`;
          // e.target.style.transition = "transform 1s ease-in-out";
          // }}
          // style={{ width: "100%", height: "auto" }}
        />
      </div>
    </FadeScroll>
  );
};

export default ProjectTile;
