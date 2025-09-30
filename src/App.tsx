import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { formatProjects } from "./helpers/utils";
import Layout from "./Layout";
import aboutService from "./services/about";
import projectsService from "./services/projects";
import teamService from "./services/team";
import { useStore } from "./stores/store";
import { AboutAirtable, ProjectAirtable, TeamAirtable } from "./types";
import About from "./views/About";
import Dissolve from "./views/Dissolve";
import Document from "./views/Document";
import Home from "./views/Home";
import Project from "./views/Project";

const App = () => {
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAirtable[] = await projectsService.getProjects();
      const formattedProjects = formatProjects(projects);
      setValue("projects", formattedProjects);
    };

    const getAbout = async () => {
      const about: AboutAirtable[] = await aboutService.getAbout();
      setValue("about", about);
    };

    const getTeam = async () => {
      const team: TeamAirtable[] = await teamService.getTeam();
      setValue("team", team);
    };

    const getData = async () => await Promise.all([getProjects(), getAbout(), getTeam()]);

    getData();
  }, [setValue]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dissolve" element={<Dissolve />} />
          <Route path="/work/:name" element={<Project />} />
          <Route path="/docs/:path" element={<Document />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
