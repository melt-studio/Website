import Link from "./Link";
import useProject from "../helpers/useProject";

const ProjectNav = () => {
  const project = useProject();

  if (!project) return null;

  return (
    <div className="footer bg-light flex flex-col p-sm md:p-md uppercase gap-4 pt-10 md:pt-30 relative z-5">
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-4">
        {project.prev && (
          <Link to={`/project/${project.prev.fields.projectUrl.toLowerCase()}`} invertUnderline>
            {`< Previous Project`}
          </Link>
        )}
        <div className="flex justify-between items-center w-full">
          <Link to="/" invertUnderline className="hidden md:block">
            Close
          </Link>
          {project.next && (
            <div className="ml-auto">
              <Link to={`/project/${project.next.fields.projectUrl.toLowerCase()}`} invertUnderline>
                {`Next Project >`}
              </Link>
            </div>
          )}
        </div>
      </div>
      <Link to="/" invertUnderline className="block md:hidden">
        Close
      </Link>
    </div>
  );
};

export default ProjectNav;
