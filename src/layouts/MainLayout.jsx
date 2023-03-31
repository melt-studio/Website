import NavMenuLogo from "../components/NavMenuLogo/NavMenuLogo.jsx";
import NavMenu from "../components/NavMenu/NavMenu.jsx";
import NavBar from "../components/NavBar/NavBar.jsx";
import "./MainLayout.css";

export default function Layout(props) {
  // const HamburgerMenuLinkClickWork = () => {
  //   props.logoXToggle();
  //   // console.log("WERK")
  //   // document.getElementById("checkbox3").checked = false;
  //   props.setShowHamburger("hamburger__holder hidden");
  //   document.body.style.overflow = "auto";
  //   props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
  //   props.setMobileIntro("mobile-logo-home__container hide");
  //   setTimeout(() => {
  //     // console.log("Should be hidden...")
  //     props.setMobileIntro("mobile-logo-home__container hide none");
  //     props.setShowHamburger("hamburger__holder");
  //     props.setFadeInText("inline");
  //   }, 1000);
  // };

  // const HamburgerMenuLinkClickAbout = () => {
  //   // props.setShowHamburger("hamburger__holder")
  //   //     document.getElementById("checkbox3").checked = false;
  //   props.setShowHamburger("hamburger__holder hidden");
  //   document.body.style.overflow = "auto";
  //   props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
  //   document.body.scrollTop = 0; // For Safari
  //   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  //   setTimeout(() => {
  //     props.logoXToggle();
  //     props.setShowHamburger("hamburger__holder");
  //   }, 2500);
  // };

  // const hideStickyInfo = () => {
  //   props.sethamburgerMenuIsVis("hamburger-menu-not-visible");
  //   props.setVisible(false);
  // };

  return (
    <div style={{ height: "100%" }}>
      <nav>
        <NavBar viewport={props.viewport} widthCutOff={props.widthCutOff} scrollCutOff={props.scrollCutOff} />

        <NavMenuLogo
          setNavMenuOpen={props.setNavMenuOpen}
          viewport={props.viewport}
          widthCutOff={props.widthCutOff}
          scrollCutOff={props.scrollCutOff}
        />

        <NavMenu navMenuOpen={props.navMenuOpen} setNavMenuOpen={props.setNavMenuOpen} />
      </nav>

      <main>{props.children}</main>
    </div>
  );
}
