import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import About from "../screens/About/About";
import Home from "../screens/Home/Home";
import Project from "../screens/Project/Project.jsx";
import Embed from "../screens/Embed/Embed";
import ProtectedPage from "../screens/ProtectedPage/ProtectedPage.jsx";
import TempLandingPage from "../screens/TempLandingPage/TempLandingPage.jsx";
import NotFound from "../screens/NotFound/NotFound.jsx";
import { AnimatePresence } from "framer-motion";

export default function MainContainer({
  initial,
  setInitial,
  projects,
  aboutInfo,
  embeds,
  config,
  cursor,
  mobile,
  viewport,
  backgroundColor,
  setBackgroundColor,
  scroll,
  setScroll,
  history,
}) {
  const location = useLocation();

  let path = location.pathname;
  // Make /project URIs the same for key - this stops AnimatePresence entry/exit on project -> project navigation
  if (location.pathname.includes("/project/")) path = "/project";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={path}>
        <Route path="/temporary-landing-page" element={<TempLandingPage config={config} />} />
        <Route path="/admin" element={<ProtectedPage />} />
        <Route path="/about" element={<About aboutInfo={aboutInfo} embeds={embeds} cursor={cursor} />} />
        <Route
          path="/project/:id"
          element={<Project projects={projects} cursor={cursor} mobile={mobile} viewport={viewport} />}
        />
        <Route
          path="/other/:id"
          element={<Embed embeds={embeds} cursor={cursor} mobile={mobile} viewport={viewport} />}
        />
        <Route
          path="/"
          element={
            <Home
              initial={initial}
              setInitial={setInitial}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              projects={projects}
              config={config}
              cursor={cursor}
              mobile={mobile}
              viewport={viewport}
              scroll={scroll}
              setScroll={setScroll}
              history={history}
            />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AnimatePresence>
  );
}
