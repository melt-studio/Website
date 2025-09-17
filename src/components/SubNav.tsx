import { useLocation } from "react-router";
import useProject from "../helpers/useProject";
import clsx from "clsx";
import Link from "./Link";
import LogoDrippy from "./LogoDrippy";

const SubNav = () => {
  const project = useProject();
  const location = useLocation();

  const dissolve = location.pathname.includes("/dissolve");
  const about = location.pathname.includes("/about");
  const docs = location.pathname.includes("/docs/");

  if (dissolve || about) return null;

  return (
    <nav
      className={clsx(
        "nav bottom-0 left-0 w-full h-fit fixed items-center justify-between p-sm md:p-md uppercase animate-[fadeIn2_2s_ease_1]",
        {
          flex: !dissolve,
          "text-light fill-light hidden": dissolve,
          "text-light fill-light": project?.contrast.label === "light",
          "text-mid fill-mid": project?.contrast.label === "mid" || docs,
          "z-2": project?.project,
          "z-4": !project?.project,
        }
      )}
    >
      {project ? (
        <div>
          {`${project?.project.fields.name}${project?.project.fields.client && ` | ${project?.project.fields.client}`}`}
        </div>
      ) : (
        <Link to="mailto:hello@melt.works">Contact</Link>
      )}
      <LogoDrippy />
    </nav>
  );
};

export default SubNav;
