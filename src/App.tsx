import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./views/Home";
import Project from "./views/Project";
import Document from "./views/Document";
import About from "./views/About";
import Dissolve from "./views/Dissolve";
import Layout from "./Layout";
import { useEffect } from "react";
import projectsService from "./services/projects";
import { AboutAirtable, ProjectAirtable, TeamAirtable } from "./types";
import { useStore } from "./stores/store";
import aboutService from "./services/about";
import teamService from "./services/team";

const App = () => {
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAirtable[] = await projectsService.getProjects();
      setValue("projects", projects);
      // console.log(projects);
    };

    const getAbout = async () => {
      const about: AboutAirtable[] = await aboutService.getAbout();
      setValue("about", about);
      // console.log("about", about);
    };

    const getTeam = async () => {
      const team: TeamAirtable[] = await teamService.getTeam();
      setValue("team", team);
      // console.log(team);
    };

    const getData = async () => await Promise.all([getProjects(), getAbout(), getTeam()]);

    getData();
  }, [setValue]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dissolve" element={<Dissolve />} />
          <Route path="/project/:name" element={<Project />} />
          <Route path="/docs/:path" element={<Document />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
