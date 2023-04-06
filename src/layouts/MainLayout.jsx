import NavMenuLogo from "../components/NavMenuLogo/NavMenuLogo.jsx";
import NavMenu from "../components/NavMenu/NavMenu.jsx";
import NavBar from "../components/NavBar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./MainLayout.css";

export default function Layout({
  navMenuOpen,
  setNavMenuOpen,
  initial,
  viewport,
  widthCutOff,
  scrollCutOff,
  children,
}) {
  return (
    <div id="layout">
      <nav>
        <NavBar viewport={viewport} widthCutOff={widthCutOff} scrollCutOff={scrollCutOff} />

        <NavMenuLogo
          setNavMenuOpen={setNavMenuOpen}
          viewport={viewport}
          widthCutOff={widthCutOff}
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
