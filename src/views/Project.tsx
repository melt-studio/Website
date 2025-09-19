// import { useEffect } from "react";
// import useProject from "../helpers/useProject";
// import { ProjectAirtable } from "../types";
import ProjectNav from "../components/ProjectNav";
import Cover from "../components/Cover";
import ProjectImages from "../components/ProjectImages";
import Section from "../components/Section";
import Copy from "../components/Copy";
import List from "../components/List";
import Gallery from "../components/Gallery";
import { useStore } from "../stores/store";
import clsx from "clsx";
import useProject from "../helpers/useProject";
// import AnimatedLayout from "../components/AnimatedLayout";
// import FadeScroll from "../components/FadeScroll";
// import { useEffect } from "react";

const Project = () => {
  useProject();
  const activeProject = useStore((state) => state.activeProject);

  // useEffect(() => {
  //   // window.scrollTo({
  //   //   top: 0,
  //   //   // behavior: "smooth"
  //   // });

  //   const className = activeProject ? `project-${project.active.contrast.label}` : null;
  //   if (className) document.documentElement.classList.add(className);
  //   // if (project.active) document.title = `MELT – ${project.active.project.fields.name}`;

  //   return () => {
  //     if (className) document.documentElement.classList.remove(className);
  //     // if (project.active) document.title = "MELT";
  //   };
  // }, [project.active]);

  if (!activeProject) return null;

  // const section: {
  //   title?: string | ReactNode;
  //   content: string | string[];
  //   type: "column" | "feature" | "team";
  // } = {
  //   title: "Headline 2",
  //   content: aboutInfo[0].fields.headline2,
  //   type: "feature",
  // };

  const { projectThumbnail, scope, copy, projectImages, copy2title, copy2, galleryImages } = activeProject.fields;

  return (
    <>
      <title>{`MELT – ${activeProject.fields.name}`}</title>
      <div className="flex flex-col" key={activeProject.id}>
        <Cover media={projectThumbnail} />
        <div className="content">
          {/* <FadeScroll viewport={{ amount: 1 }}> */}

          <Section type="column">
            <div className="order-1 md:order-0 mt-4 md:mt-0">
              <List items={scope} />
            </div>
            <Copy copy={copy} />
          </Section>
          {/* <div
          className="flex flex-col gap-10 md:gap-4 md:flex-row p-sm md:p-md py-20 bg-mid relative animate-[fadeIn_2s_ease_0.5s_1_normal_both]"
          key={project?.project.id}
        >
          <div className="flex flex-col uppercase md:w-1/3 order-1 md:order-0">
            {project?.project.scope.map((scope) => (
              <div key={`${project?.project.id}_${scope}`}>{scope}</div>
            ))}
          </div>
          <div className="w-1/3">{project?.project.copy}</div>
        </div> */}
          {/* </FadeScroll> */}

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

          {/* <ProjectImages images={approachMedia} /> */}
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
