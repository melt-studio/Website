import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import About from "../screens/About/About";
import Home from "../screens/Home/Home";
import ProjectPage from "../screens/ProjectPage/ProjectPage.jsx";
import ProtectedPage from "../screens/ProtectedPage/ProtectedPage";
import TempLandingPage from "../screens/TempLandingPage/TempLandingPage";
import PageNotFound from "../screens/PageNotFound/PageNotFound";
import { AnimatePresence } from "framer-motion";

export default function MainContainer({
  initial,
  setInitial,
  projects,
  aboutInfo,
  miscPageInfo,
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
        <Route path="/admin" element={<ProtectedPage miscPageInfo={miscPageInfo} />} />
        <Route path="/about" element={<About aboutInfo={aboutInfo} cursor={cursor} />} />
        <Route
          path="/project/:id"
          element={<ProjectPage projects={projects} cursor={cursor} mobile={mobile} viewport={viewport} />}
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
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AnimatePresence>
  );
}
