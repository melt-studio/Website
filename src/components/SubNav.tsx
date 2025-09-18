import { useLocation } from "react-router";
import clsx from "clsx";
import LogoDrippy from "./LogoDrippy";
import { motion } from "motion/react";
import { useStore } from "../stores/store";

const SubNav = () => {
  const location = useLocation();
  const activeProject = useStore((state) => state.activeProject);

  const projectPage = location.pathname.includes("/work/");
  const dissolve = location.pathname.includes("/dissolve");
  const about = location.pathname.includes("/about");
  const docs = location.pathname.includes("/docs/");

  if (dissolve || about) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, transform: "translateY(100%)" }}
      exit={{ opacity: 0, transform: "translateY(100%)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
      className={clsx(
        "nav bottom-0 left-0 w-full h-fit fixed items-center justify-between p-sm md:p-md uppercase animate-[fadeIn2_2s_ease_1]",
        {
          flex: !dissolve,
          "text-light fill-light hidden": dissolve,
          "text-light fill-light": (projectPage && activeProject?.contrast.label) === "light",
          "text-mid fill-mid": (projectPage && activeProject?.contrast.label === "mid") || docs,
          "z-2": activeProject && projectPage,
          "z-4": !(activeProject && projectPage),
        }
      )}
    >
      {/* {project.active && (
        <motion.div exit={{ opacity: 0 }}>
          {`${project.active.project.fields.name}${
            project.active.project.fields.client && ` | ${project.active.project.fields.client}`
          }`}
        </motion.div>
      )} */}
      <div className="ml-auto">
        <LogoDrippy />
      </div>
    </motion.nav>
  );
};

export default SubNav;
