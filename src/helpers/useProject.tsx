import { useLocation, useParams } from "react-router";
import { useStore } from "../stores/store";
import { useEffect } from "react";

const useProject = () => {
  const setValue = useStore((state) => state.setValue);
  const projects = useStore((state) => state.projects);
  const { name } = useParams();
  const project = projects.find((p) => name !== undefined && p.fields.projectUrl.toLowerCase() === name.toLowerCase());
  const location = useLocation();
  const projectPage = name !== undefined && location.pathname.includes("/work/") && project !== undefined;

  useEffect(() => {
    if (projectPage && useStore.getState().activeProject?.id !== project.id) setValue("activeProject", project);
  }, [projectPage, project, setValue]);

  return null;
};

export default useProject;
