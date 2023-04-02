import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../screens/About/About";
import Home from "../screens/Home/Home";
import ProjectPage from "../screens/Project/ProjectPage.jsx";
import ProtectedPage from "../screens/ProtectedPage/ProtectedPage";
import TempLandingPage from "../screens/TempLandingPage/TempLandingPage";

export default function MainContainer(props) {
  return (
    <Routes>
      <Route path="/temporary-landing-page" element={<TempLandingPage />} />
      <Route path="/working-components" element={<ProtectedPage miscPageInfo={props.miscPageInfo} />} />
      <Route path="/about" element={<About aboutInfo={props.aboutInfo} />} />
      <Route
        path="/:id"
        element={
          <ProjectPage
            projects={props.projects}
            cursor={props.cursor}
            viewport={props.viewport}
            widthCutOff={props.widthCutOff}
          />
        }
      />
      <Route
        path="/"
        element={
          <Home
            clicks={props.clicks}
            setClicks={props.setClicks}
            setShowHamburger={props.setShowHamburger}
            // mobileIntroLogo={props.mobileIntroLogo}
            // setMobileIntroLogo={props.setMobileIntroLogo}
            backgroundColor={props.backgroundColor}
            setBackgroundColor={props.setBackgroundColor}
            scroll={props.scroll}
            showHamburger={props.showHamburger}
            navTextColor={props.navTextColor}
            projects={props.projects}
            cursor={props.cursor}
            viewport={props.viewport}
            widthCutOff={props.widthCutOff}
          />
        }
      />
    </Routes>
  );
}
