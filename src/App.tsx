import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./views/Home";
import Project from "./views/Project";
import Document from "./views/Document";
import About from "./views/About";
import Dissolve from "./views/Dissolve";
import Layout from "./Layout";
import { useEffect } from "react";
import projectsService from "./services/projects";
import { AboutAirtable, DocumentAirtableUnlocked, ProjectAirtable, TeamAirtable, VideoAirtable } from "./types";
import { useStore } from "./stores/store";
import aboutService from "./services/about";
import teamService from "./services/team";
import documentService from "./services/document";
import { formatProjects } from "./helpers/utils";
// import { AnimatePresence } from "motion/react";

const App = () => {
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    const getProjects = async () => {
      const projects: ProjectAirtable[] = await projectsService.getProjects();
      const formattedProjects = formatProjects(projects);
      setValue("projects", formattedProjects);
      console.log(formattedProjects);
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

    const getReel = async () => {
      const reel: DocumentAirtableUnlocked = await documentService.getDocument("melt-2025-reel");
      if (reel && reel.fields.media) {
        setValue("reel", reel.fields.media[0] as VideoAirtable);
      }
    };

    const getData = async () => await Promise.all([getProjects(), getAbout(), getTeam(), getReel()]);

    getData();
  }, [setValue]);

  return (
    <BrowserRouter>
      {/* <AnimatePresence onExitComplete={() => console.log("EXIT COMPLETE")} mode="wait" initial={true}> */}
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
      {/* </AnimatePresence> */}
    </BrowserRouter>
  );
};

export default App;
