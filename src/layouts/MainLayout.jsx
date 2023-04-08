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
  setLoggedIn,
  children,
}) {
  return (
    <div id="layout">
      <nav>
        <NavBar viewport={viewport} scrollCutOff={scrollCutOff} setLoggedIn={setLoggedIn} />

        <NavMenuLogo
          setNavMenuOpen={setNavMenuOpen}
          mobile={mobile}
          viewport={viewport}
          scrollCutOff={scrollCutOff}
          initial={initial}
        />

        <NavMenu navMenuOpen={navMenuOpen} setNavMenuOpen={setNavMenuOpen} />
      </nav>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
