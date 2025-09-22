import clsx from "clsx";

import Copy from "../components/Copy";
import Cover from "../components/Cover";
import Gallery from "../components/Gallery";
import List from "../components/List";
import ProjectImages from "../components/ProjectImages";
import ProjectNav from "../components/ProjectNav";
import Section from "../components/Section";
import useProject from "../helpers/useProject";
import { useStore } from "../stores/store";

const Project = () => {
  useProject();
  const activeProject = useStore((state) => state.activeProject);

  if (!activeProject) return null;

  const { projectThumbnail, scope, copy, projectImages, copy2title, copy2, galleryImages } = activeProject.fields;

  return (
    <>
      <title>{`MELT – ${activeProject.fields.name}`}</title>
      <div className="flex flex-col" key={activeProject.id}>
        <Cover media={projectThumbnail} />
        <div className="content">
          <Section type="column">
            <div className="order-1 md:order-0 mt-4 md:mt-0">
              <List items={scope} />
            </div>
            <Copy copy={copy} />
          </Section>

          {(projectImages || galleryImages) && (
            <div className="flex flex-col gap-10">
              {projectImages && projectImages.length > 0 && (
                <ProjectImages images={projectImages.slice(0, Math.floor(projectImages.length / 2) + 1)} />
              )}

              {galleryImages && galleryImages.length > 0 && <Gallery images={galleryImages} />}

              {projectImages && projectImages.length > 1 && (
                <ProjectImages
                  images={projectImages.slice(Math.floor(projectImages.length / 2) + 1, projectImages.length)}
                />
              )}
            </div>
          )}

          {copy2 && (
            <Section type="column" title={copy2title}>
              <Copy copy={copy2} />
            </Section>
          )}
        </div>

        <div
          className={clsx(
            "nav bottom-0 left-0 w-full h-fit fixed items-center justify-between p-sm md:p-md uppercase animate-[fadeIn2_2s_ease_1]",
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
        </div>

        <ProjectNav />
      </div>
    </>
  );
};

export default Project;
