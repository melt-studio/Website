import React from "react";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import "./NavMenuLogo.css";
import MeltLogo from "../../assets/images/Logo/MELT_LOGO WHT_SM.png";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const NavMenuLogo = ({ setNavMenuOpen }) => {
  // const navigate = useNavigate();
  // const HomeClick = () => {
  //   navigate("/")
  //   props.setIsVis("hamburger-menu-not-visible")
  //     document.body.style.background = "#000000"
  //     window.scrollTo(0, 0);
  //   window.scrollBy(0, 0);
  //   props.setShowHamburger("hamburger__holder hidden")
  //   setTimeout(() => {
  //     props.setShowHamburger("hamburger__holder hidden")
  //   }, 1000);
  // }
  // }, []);

  const openNavMenu = () => {
    document.body.classList.add("nav-menu-open");
    setNavMenuOpen(true);
  };

  return (
    <div className="nav-menu-logo">
      <Fade
        keyframes={customAnimation}
        direction="up"
        delay={1250}
        duration={1000}
        triggerOnce={true}
        className="nav-menu-logo__fade"
      >
        <div className="nav-menu-logo__gradient">
          <img onClick={openNavMenu} className="nav-menu-logo__img" src={MeltLogo} alt="MELT Logo" />
        </div>
      </Fade>
    </div>
  );
};

export default NavMenuLogo;
