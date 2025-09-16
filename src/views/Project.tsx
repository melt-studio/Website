import { useEffect } from "react";
import useProject from "../helpers/useProject";
import { ProjectAirtable } from "../types";
import ProjectNav from "../components/ProjectNav";
// import { useEffect } from "react";

type ProjectCoverProps = {
  project?: ProjectAirtable;
};

const ProjectCover = ({ project }: ProjectCoverProps) => {
  const covers = project?.fields.mainVid || project?.fields.mainImage;
  const cover = covers && covers[0];

  if (!cover) return null;

  if (cover.type === "video/mp4") {
    return <video src={cover.url} controls />;
  }

  return <img src={cover.url} className="h-full w-auto" />;
};

const Project = () => {
  const project = useProject();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const className = project ? `project-${project.contrast.label}` : null;

    if (className) document.documentElement.classList.add(className);

    return () => {
      if (className) document.documentElement.classList.remove(className);
    };
  }, [project]);

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-center w-full h-screen transition-colors duration-500"
        // style={{ background: project?.project.fields.backgroundColor.split(",")[0].trim() }}
      >
        <ProjectCover project={project?.project} />
      </div>
      <div className="flex p-md py-20 bg-mid">
        <div className="flex flex-col uppercase w-1/3">
          {project?.project.fields.projectScope.map((scope) => (
            <div key={`${project?.project.id}_${scope}`}>{scope}</div>
          ))}
        </div>
        <div className="w-1/3">{project?.project.fields.projectCopy}</div>
      </div>
      <ProjectNav />
    </div>
  );
};

export default Project;
