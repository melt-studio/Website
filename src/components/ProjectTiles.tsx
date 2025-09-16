import ProjectTile from "./ProjectTile";
import { useStore } from "../store";

const ProjectTiles = () => {
  const projects = useStore((state) => state.projects);

  return (
    <div className="flex flex-col items-center gap-10 pb-40">
      {projects.map((project) => (
        <ProjectTile key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectTiles;
