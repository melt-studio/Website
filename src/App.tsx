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
import Work from "./views/Work";
import Project from "./views/Project";

const App = () => {
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projects: ProjectAirtable[] = await projectsService.getProjects();
        const formattedProjects = formatProjects(projects);
        setValue("projects", formattedProjects);
      } catch (error) {
        console.log(error);
      }
    };

    const getAbout = async () => {
      try {
        const about: AboutAirtable[] = await aboutService.getAbout();
        setValue("about", about);
      } catch (error) {
        console.log(error);
      }
    };

    const getTeam = async () => {
      try {
        const team: TeamAirtable[] = await teamService.getTeam();
        setValue("team", team);
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      await getProjects();
      await getAbout();
      await getTeam();
    };

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
          <Route path="/works" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/dissolve" element={<Dissolve />} />
          <Route path="/works/:name" element={<Project />} />
          <Route path="/docs/:path" element={<Document />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
