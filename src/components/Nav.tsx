import { useLocation } from "react-router";
import Link from "./Link";
import LogoDrippy from "./LogoDrippy";
// import LogoText from "./LogoText";
import Controls from "../Controls/Controls";
// import { useStore } from "../store";
import useProject from "../helpers/useProject";
import clsx from "clsx";

export const SubNav = () => {
  const project = useProject();

  return (
    <nav className="flex bottom-0 left-0 w-full h-fit fixed items-center justify-between p-md uppercase dissolve:hidden text-fill z-2">
      {project ? (
        <div>
          {project?.project.fields.name} | {project?.project.fields.description}
        </div>
      ) : (
        <Link to="mailto:hello@melt.works">Contact</Link>
      )}
      <LogoDrippy />
    </nav>
  );
};

const Nav = () => {
  const location = useLocation();

  const dissolve = location.pathname.includes("/dissolve");

  return (
    <nav className="flex top-0 left-0 w-full h-22 fixed items-center justify-between p-md uppercase z-99 text-fill">
      {/* <div className="w-1/3">
        <Link to="/" underline={false}>
          <LogoText />
        </Link>
      </div> */}
      <div
        className={clsx("w-1/3", {
          "w-auto text-light": dissolve,
        })}
      >
        Melt is a Creative Studio
      </div>
      {dissolve ? (
        <>
          <Controls />
          <Link to="/">Home</Link>
        </>
      ) : (
        <div className="w-2/3 flex justify-between">
          <Link to="/">Work</Link>
          <Link to="/about">About Us</Link>
          <Link to="/dissolve">Dissolve</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
