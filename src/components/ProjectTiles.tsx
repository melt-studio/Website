import ProjectTile from "./ProjectTile";
import { useStore } from "../stores/store";
import clsx from "clsx";

const ProjectTiles = () => {
  const projects = useStore((state) => state.projects);
  const showReel = useStore((state) => state.showReel);

  const left = projects.filter((_project, i) => i % 2 === 0);
  const right = projects.filter((_project, i) => i % 2 === 1);

  return (
    <div
      className={clsx("flex md:gap-10 pb-40 w-full justify-around relative z-2 transition-opacity duration-2000", {
        "opacity-100": !showReel,
        "opacity-0": showReel,
      })}
    >
      <div className="flex flex-col gap-[10vw] w-3/7 md:w-1/3 items-center">
        {left.map((project) => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </div>
      <div className="flex flex-col gap-[10vw] w-3/7 md:w-1/3 items-center mt-[10vw]">
        {right.map((project) => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTiles;
