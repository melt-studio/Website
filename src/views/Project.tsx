import clsx from "clsx";

import Cover from "../components/Cover";
// import ProjectNav from "../components/ProjectNav";
import useProject from "../helpers/useProject";
import { useStore } from "../stores/store";
import { motion } from "motion/react";
import { useEffect } from "react";
import ProjectContent from "../components/ProjectContent";
import { WordAnimation } from "../components/WordAnimation";

const Project = () => {
  useProject();
  const activeProject = useStore((state) => state.activeProject);
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    return () => {
      setValue("activeProject", null);
    };
  }, [setValue]);

  if (!activeProject) return null;

  const { splashImage } = activeProject.fields;

  return (
    <>
      <title>{`MELT – ${activeProject.fields.name}`}</title>

      <div className="flex flex-col" key={activeProject.id}>
        <Cover media={splashImage} hideSplash={activeProject.fields.highlightHideSplash}>
          {activeProject.fields.highlighted && activeProject.fields.highlightCopy && (
            <div className="hidden md:flex absolute w-full h-full top-0 left-0 items-center justify-center">
              <div
                className="feature text-light cover"
                style={
                  activeProject.fields.highlightCopyColor
                    ? {
                        color: activeProject.fields.highlightCopyColor,
                      }
                    : {}
                }
              >
                <WordAnimation text={activeProject.fields.highlightCopy} />
              </div>
            </div>
          )}
        </Cover>

        <ProjectContent project={activeProject} />

        <motion.div
          initial={{ opacity: 0, transform: "translateY(-100%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
          className={clsx(
            "nav bottom-0 left-0 w-fit h-fit fixed items-center justify-between p-sm md:p-md uppercase animate-[fade-in_2s_ease_1] z-2 mix-blend-difference text-light fill-light"
          )}
        >
          {`${activeProject.fields.name}${activeProject.fields.client && ` | ${activeProject.fields.client}`}`}
        </motion.div>

        {/* <ProjectNav /> */}
      </div>
    </>
  );
};

export default Project;
