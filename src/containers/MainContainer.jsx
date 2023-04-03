import { Routes, Route } from "react-router-dom";
import About from "../screens/About/About";
import Home from "../screens/Home/Home";
import ProjectPage from "../screens/Project/ProjectPage.jsx";
import ProtectedPage from "../screens/ProtectedPage/ProtectedPage";
import TempLandingPage from "../screens/TempLandingPage/TempLandingPage";

export default function MainContainer({
  projects,
  aboutInfo,
  miscPageInfo,
  cursor,
  viewport,
  widthCutOff,
  backgroundColor,
  setBackgroundColor,
  // scroll,
}) {
  return (
    <Routes>
      <Route path="/temporary-landing-page" element={<TempLandingPage />} />
      <Route path="/working-components" element={<ProtectedPage miscPageInfo={miscPageInfo} />} />
      <Route path="/about" element={<About aboutInfo={aboutInfo} cursor={cursor} />} />
      <Route
        path="/:id"
        element={<ProjectPage projects={projects} cursor={cursor} viewport={viewport} widthCutOff={widthCutOff} />}
      />
      <Route
        path="/"
        element={
          <Home
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            // scroll={scroll}
            projects={projects}
            cursor={cursor}
            viewport={viewport}
            widthCutOff={widthCutOff}
          />
        }
      />
    </Routes>
  );
}
