import { Routes, Route, Navigate, useLocation, useParams, useNavigate, Outlet } from "react-router-dom";
import About from "../screens/About/About.jsx";
import Home from "../screens/Home/Home.jsx";
import Project from "../screens/Project/Project.jsx";
import Embed from "../screens/Embed/Embed.jsx";
import Protected from "../screens/Protected/Protected.jsx";
import Admin from "../screens/Admin/Admin.jsx";
import LogoAnimation from "../components/LogoAnimation";
import WaterfallAnimation from "../components/WaterfallAnimation/index.js";
import TempLandingPage from "../screens/TempLandingPage/TempLandingPage.jsx";
import NotFound from "../screens/NotFound/NotFound.jsx";
import { AnimatePresence } from "framer-motion";

// const Test = ({ loggedIn, config }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   console.log("loggedIn", loggedIn);

//   if (loggedIn) {
//     if (id === "logo") {
//       return <LogoAnimation serverConfig={config} effectRef={null} controls={true} />;
//     } else if (id === "waterfall") {
//       return <WaterfallAnimation serverConfig={config} controls={true} />;
//     }
//   }

//   return <Navigate to="/admin" replace />;
// };

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
  const location = useLocation();

  let path = location.pathname;
  // Make /project URIs the same for key - this stops AnimatePresence entry/exit on project -> project navigation
  if (location.pathname.includes("/project/")) path = "/project";

  const ProtectedRoute = ({ loggedIn, redirectPath = "/about", children }) => {
    if (!loggedIn) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={path}>
        <Route path="/temporary-landing-page" element={<TempLandingPage config={config} />} />
        {/* <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path="/admin" element={<Admin />} />
        </Route> */}
        <Route
          path="/admin"
          element={<Protected loggedIn={loggedIn} setLoggedIn={setLoggedIn} config={config} mobile={mobile} />}
        />
        {/* <Route
          path="/admin/:id"
          element={
            loggedIn ? (
              <LogoAnimation serverConfig={config} effectRef={null} controls={true} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        /> */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
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
