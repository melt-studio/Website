import { useLocation } from "react-router";
import Link from "./Link";
// import LogoText from "./LogoText";
// import { useStore } from "../store";
import useProject from "../helpers/useProject";
import clsx from "clsx";
import Controls from "./background/Controls";

const Nav = () => {
  const location = useLocation();
  const project = useProject();

  const dissolve = location.pathname.includes("/dissolve");
  const docs = location.pathname.includes("/docs/");

  const light = dissolve || project?.contrast.label === "light";
  const mid = project?.contrast.label === "mid" || docs;

  return (
    <nav
      className={clsx(
        "nav flex top-0 left-0 w-full h-fit md:h-22 fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-colors duration-2000 gap-4",
        {
          "text-light fill-light": light,
          "text-mid fill-mid": mid,
        }
      )}
    >
      <div
        className={clsx("animate-[fadeIn2_2s_ease_1] hidden md:flex", {
          "w-1/4": dissolve,
          "w-1/3": !dissolve,
        })}
      >
        Melt is a Creative Studio
      </div>
      {dissolve ? (
        // <div className="flex grow items-center justify-between animate-[fadeIn_2s_ease_1_alternate_forwards]">
        <div
          className="flex grow items-start justify-between animate-[fadeIn2_2s_ease_1]"
          // className={clsx("flex grow items-center justify-between transition-opacity duration-2000", {
          //   "opacity-100": dissolve,
          //   "opacity-0": !dissolve,
          // })}
        >
          <Controls />
          <div className="flex w-1/4 justify-end">
            <Link to="/">Home</Link>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-2/3 flex items-center justify-between animate-[fadeIn_2s_ease_1]">
          <Link to="/">Work</Link>
          <Link to="/about">About Us</Link>
          <Link to="/dissolve">Dissolve</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
