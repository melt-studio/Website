import { ProjectAirtable } from "../types";
import Link from "./Link";

type ProjectTileProps = {
  project: ProjectAirtable;
};

const ProjectTile = ({ project }: ProjectTileProps) => {
  return (
    <div className="cursor-pointer even:-ml-100 odd:ml-100">
      <Link to={`/project/${project.fields.projectUrl.toLowerCase()}`} underline={false}>
        <img src={project.fields.coverImg[0].thumbnails.large.url} alt={project.fields.name} loading="lazy" />
      </Link>
      {/* <div>{project.fields.name}</div> */}
    </div>
  );
};

export default ProjectTile;
