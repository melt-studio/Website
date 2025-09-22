import clsx from "clsx";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { useStore } from "../stores/store";
import Link from "./Link";
import Controls from "./GL/Background/Controls";

const Nav = () => {
  const location = useLocation();
  const activeProject = useStore((state) => state.activeProject);
  const projectTiles = useStore((state) => state.projectTiles);

  const dissolve = location.pathname.includes("/dissolve");
  const docs = location.pathname.includes("/docs/");

  const light = dissolve || activeProject?.contrast.label === "light";
  const mid = activeProject?.contrast.label === "mid" || docs;

  return (
    <motion.nav
      initial={{ opacity: 0, transform: "translateY(-100%)" }}
      animate={docs ? { opacity: 0, transform: "translateY(-100%)" } : { opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
      className={clsx(
        "nav flex top-0 left-0 w-full h-fit md:h-22 fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-colors duration-2000 gap-4",
        {
          "text-light fill-light": light,
          "text-mid fill-mid": mid,
        }
      )}
    >
      <div
        className={clsx("hidden md:flex", {
          "w-1/4": dissolve,
          "w-1/3": !dissolve,
        })}
      >
        <div className="flex w-full">
          <Link to="/" underline={false}>
            Melt is a Creative Studio
          </Link>
        </div>
      </div>
      {dissolve ? (
        <div className="flex grow items-start justify-between">
          <Controls />
          <div className="flex w-1/4 justify-end">
            <Link to="/">Home</Link>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-2/3 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === "/" && projectTiles) projectTiles.scrollIntoView({ behavior: "smooth" });
            }}
            // underline={false}
          >
            Work
          </Link>
          <Link to="/about">About Us</Link>
          <Link to="mailto:hello@melt.works">Contact</Link>
          <Link to="/dissolve">Dissolve</Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Nav;
