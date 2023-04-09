import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import About from "../screens/About/About.jsx";
import Home from "../screens/Home/Home.jsx";
import Project from "../screens/Project/Project.jsx";
import Other from "../screens/Other/Other.jsx";
// import Login from "../screens/Login/Login.jsx";
import Admin from "../screens/Admin/Admin.jsx";
import AdminConfig from "../screens/Admin/AdminConfig.jsx";
import TempLandingPage from "../screens/TempLandingPage/TempLandingPage.jsx";
import NotFound from "../screens/NotFound/NotFound.jsx";
import { AnimatePresence } from "framer-motion";

export default function MainContainer({
  initial,
  setInitial,
  projects,
  aboutInfo,
  embeds,
  loggedIn,
  setLoggedIn,
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
  const [adminMessage, setAdminMessage] = useState(null);

  const location = useLocation();

  let path = location.pathname;
  // Make /project URIs the same for key - this stops AnimatePresence entry/exit on project -> project navigation
  if (location.pathname.includes("/project/")) path = "/project";
  else if (location.pathname.includes("/admin/")) path = "/admin";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={path}>
        <Route path="/temporary-landing-page" element={<TempLandingPage config={config} />} />

        <Route
          path="/admin"
          // element={loggedIn ? <Admin adminMessage={adminMessage} /> : <Navigate to="/login" replace />}
          element={<Admin loggedIn={loggedIn} setLoggedIn={setLoggedIn} adminMessage={adminMessage} />}
        />
        <Route
          path="/admin/:mode"
          element={
            loggedIn ? (
              <AdminConfig config={config} setAdminMessage={setAdminMessage} mobile={mobile} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        <Route path="/about" element={<About aboutInfo={aboutInfo} embeds={embeds} cursor={cursor} />} />

        <Route
          path="/project/:id"
          element={<Project projects={projects} cursor={cursor} mobile={mobile} viewport={viewport} />}
        />

        <Route
          path="/:type/:id"
          element={<Other embeds={embeds} cursor={cursor} mobile={mobile} viewport={viewport} />}
        />

        {/* <Route
          path="/login"
          element={
            loggedIn ? <Navigate to="/admin" replace /> : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          }
        /> */}

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
