import NavMenuLogo from "../components/NavMenuLogo/NavMenuLogo.jsx";
import NavMenu from "../components/NavMenu/NavMenu.jsx";
import NavBar from "../components/NavBar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./MainLayout.css";

export default function Layout({
  navMenuOpen,
  setNavMenuOpen,
  initial,
  mobile,
  viewport,
  scrollCutOff,
  loggedIn,
  setLoggedIn,
  projects,
  children,
  pageIsLoading,
  menuInfo,
  projectTags,
}) {
  return (
    <div id="layout">
      <nav>
        <NavBar
          viewport={viewport}
          scrollCutOff={scrollCutOff}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setNavMenuOpen={setNavMenuOpen}
          pageIsLoading={pageIsLoading}
        />

        <NavMenuLogo
          setNavMenuOpen={setNavMenuOpen}
          mobile={mobile}
          viewport={viewport}
          scrollCutOff={scrollCutOff}
          initial={initial}
          pageIsLoading={pageIsLoading}
        />

        <NavMenu
          navMenuOpen={navMenuOpen}
          setNavMenuOpen={setNavMenuOpen}
          menuInfo={menuInfo}
          projectTags={projectTags}
        />
      </nav>

      <main>{children}</main>

      {projects.length > 0 ? (
        <footer>
          <Footer />
        </footer>
      ) : null}
    </div>
  );
}
