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
  cursor,
  viewport,
  widthCutOff,
  backgroundColor,
  setBackgroundColor,
  scroll,
  setScroll,
}) {
  const location = useLocation();
  // console.log(location);
  let path = location.pathname;
  if (location.pathname.includes("/project/")) path = "/project";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={path}>
        <Route path="/temporary-landing-page" element={<TempLandingPage />} />
        <Route path="/working-components" element={<ProtectedPage miscPageInfo={miscPageInfo} />} />
        <Route path="/about" element={<About aboutInfo={aboutInfo} cursor={cursor} />} />
        <Route
          path="/project/:id"
          element={<ProjectPage projects={projects} cursor={cursor} viewport={viewport} widthCutOff={widthCutOff} />}
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
              cursor={cursor}
              viewport={viewport}
              widthCutOff={widthCutOff}
              scroll={scroll}
              setScroll={setScroll}
            />
          }
        />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AnimatePresence>
  );
}
