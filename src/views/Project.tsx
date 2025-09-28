import clsx from "clsx";

import Copy from "../components/Copy";
import Cover from "../components/Cover";
import List from "../components/List";
import ProjectImages from "../components/ProjectImages";
import ProjectNav from "../components/ProjectNav";
import Section from "../components/Section";
import useProject from "../helpers/useProject";
import { useStore } from "../stores/store";
import { motion } from "motion/react";
import { useEffect } from "react";

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

  const { splashImage, scope, copy, projectImages, copy2title, copy2, galleryImages } = activeProject.fields;

  return (
    <>
      <title>{`MELT – ${activeProject.fields.name}`}</title>
      <div className="flex flex-col" key={activeProject.id}>
        <Cover media={splashImage} />
        <div className="content">
          <Section type="column">
            <div className="my-4 md:my-0">
              <List items={scope} />
            </div>
            <Copy copy={copy} />
          </Section>

          <ProjectImages images={projectImages} gallery={galleryImages} />

          {copy2 && (
            <Section type="column" title={copy2title}>
              {!copy2title && <div></div>}
              <Copy copy={copy2} />
            </Section>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, transform: "translateY(100%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
          className={clsx(
            "nav bottom-0 left-0 w-fit h-fit fixed items-center justify-between p-sm md:p-md uppercase animate-[fadeIn_2s_ease_1]",
            {
              "text-light fill-light": activeProject.contrast.label === "light",
              "text-mid fill-mid": activeProject.contrast.label === "mid",
              "z-2": activeProject,
              "z-4": !activeProject,
            }
          )}
        >
          <div className="h-10">
            {`${activeProject.fields.name}${activeProject.fields.client && ` | ${activeProject.fields.client}`}`}
          </div>
        </motion.div>

        <ProjectNav />
      </div>
    </>
  );
};

export default Project;
