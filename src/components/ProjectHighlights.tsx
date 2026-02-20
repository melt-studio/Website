import ProjectHighlight from "./ProjectHighlight";
import { useStore } from "../stores/store";
import { useState } from "react";

export type TileLayout = {
  w: number;
  w2: number;
  off: number;
  row: number;
  colStart: number;
  colEnd: number;
  marginTop: number;
  marginLeft: number;
  grid: number;
  orientation: "landscape" | "portrait";
};

export type ScrollDirection = "down" | "up";

const ProjectHighlights = () => {
  const allProjects = useStore((state) => state.projects);

  const projects = allProjects.filter(
    (project) =>
      project.fields.highlighted && project.fields.highlightThumbnail && project.fields.highlightThumbnail.length > 0
  );

  const [active, setActive] = useState(-1);

  const updateActive = (index: number, position: string) => {
    if (index > active && position === "show") setActive(index);
    else if (position === "below" && active === index) setActive(index - 1);
  };

  return (
    <div className="flex flex-col pt-60 md:pt-40 pb-0 w-full z-4 max-w-[2560px] mx-auto">
      {projects.length > 0 && active >= 0 && (
        <div className="p-sm z-5 text-light md:p-md w-full flex flex-col gap-0 text-light uppercase fixed bottom-0 left-0 mix-blend-difference pointer-events-none">
          <div>Featured Project | {projects[active].fields.name}</div>
        </div>
      )}

      <div className="flex flex-col px-0 w-full">
        <div className="w-full h-auto flex flex-col gap-0 relative">
          {projects.map((project, i) => (
            <ProjectHighlight key={project.id} project={project} index={i} updateActive={updateActive} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHighlights;
