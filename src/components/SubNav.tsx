import { useLocation } from "react-router";
import clsx from "clsx";
import LogoDrippy from "./LogoDrippy";
import { motion } from "motion/react";
import { useStore } from "../stores/store";

const SubNav = () => {
  const location = useLocation();
  const activeProject = useStore((state) => state.activeProject);

  const projectPage = location.pathname.includes("/works/");
  const dissolve = location.pathname === "/dissolve";
  const docs = location.pathname.includes("/docs/");

  const hide = dissolve || docs;

  return (
    <motion.nav
      initial={{ opacity: 0, transform: "translateY(-100%)" }}
      animate={hide ? { opacity: 0, transform: "translateY(-100%)" } : { opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      className={clsx(
        "nav bottom-0 right-0 w-fit h-fit fixed items-center justify-between p-sm md:p-md uppercase animate-[fade-in_2s_ease_1] pointer-events-none mix-blend-difference text-light fill-light",
        {
          "z-2": activeProject && projectPage,
          "z-4": !(activeProject && projectPage),
        }
      )}
    >
      <div className="ml-auto">
        <LogoDrippy className="w-8 h-8 relative top-1" />
      </div>
    </motion.nav>
  );
};

export default SubNav;
