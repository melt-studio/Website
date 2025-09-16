import Link from "./Link";
import useProject from "../helpers/useProject";

const ProjectNav = () => {
  const project = useProject();

  if (!project) return null;

  return (
    <div className={`footer bg-light flex flex-col p-md uppercase gap-70 z-2 pt-30`}>
      <div className="grid grid-cols-[repeat(3,_1fr)]">
        {project.prev && (
          <Link to={`/project/${project.prev.fields.projectUrl.toLowerCase()}`} fixUnderline>
            {`< Previous Project`}
          </Link>
        )}
        <Link to="/" fixUnderline>
          Close
        </Link>
        {project.next && (
          <div className="ml-auto">
            <Link to={`/project/${project.next.fields.projectUrl.toLowerCase()}`} fixUnderline>
              {`Next Project >`}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectNav;
