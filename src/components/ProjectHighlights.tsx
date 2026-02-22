import ProjectHighlight from "./ProjectHighlight";
import { useStore } from "../stores/store";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import clsx from "clsx";

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

const ProjectHighlights = () => {
  const allProjects = useStore((state) => state.projects);
  const setValue = useStore((state) => state.setValue);

  const [active, setActive] = useState(-1);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const projects = allProjects.filter(
    (project) =>
      project.fields.highlighted && project.fields.highlightThumbnail && project.fields.highlightThumbnail.length > 0
  );

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const index = Math.floor(current * projects.length);
    if (current > 0) setValue("highlightsVisible", true);
    else setValue("highlightsVisible", false);
    if (current === 0) setActive(-1);
    else if (index !== active) setActive(index);
  });

  const activeClamp = Math.max(0, Math.min(active, projects.length - 1));
  const activeProject = projects[active] ? projects[active] : null;

  return (
    <div className="flex flex-col pt-60 pb-0 w-full z-4 max-w-[2560px] mx-auto">
      {projects.length > 0 && (
        <div
          className={clsx(
            "z-5 text-light w-full flex flex-col gap-0 text-light uppercase fixed bottom-0 left-0 mix-blend-difference pointer-events-none transition-all ease-in-out duration-2000 h-fit",
            {
              "opacity-0 -translate-y-[20px]": !activeProject,
            }
          )}
        >
          <div className="p-sm md:p-md max-w-[2560px] mx-auto w-full flex whitespace-pre flex-col md:flex-row">
            <div>
              Featured Project<span className="hidden md:inline"> | </span>
            </div>
            <div className="relative flex grow overflow-hidden">
              <div className="invisible">{projects[activeClamp].fields.name}</div>
              {projects.map((p, i) => (
                <div
                  key={p.fields.name}
                  className={clsx("absolute w-fit flex grow transition-transform ease-in-out duration-2000", {
                    "-translate-y-full": activeClamp > i,
                    "translate-y-full": activeClamp < i,
                  })}
                >
                  {p.fields.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col px-0 w-full">
        <div
          ref={ref}
          className="w-full h-auto flex flex-col gap-0 relative"
          style={{
            height: `${projects.length * 100}vh`,
          }}
        >
          {projects.map((project, i) => (
            <ProjectHighlight key={project.id} project={project} index={i} count={projects.length} active={active} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHighlights;
