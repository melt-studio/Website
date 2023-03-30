import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import "./NavMenu.css";
import DrippyLogo from "../../assets/images/Logo/MELT_DRIPPY WHT.png";

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

const links = [
  { text: "Works", href: "/#projects", nav: true },
  { text: "About Us", href: "/about", nav: true },
  { text: "Say Hello", href: "mailto:hello@melt.works", nav: false },
  { text: "Follow", href: "https://www.instagram.com/melt.works/", nav: false },
];

const NavMenuLogo = () => {
  return (
    <div className="nav-menu__logo">
      <img src={DrippyLogo} />
    </div>
  );
};
const NavMenuClose = ({ closeNavMenu }) => {
  return (
    <div className="nav-menu__close">
      <div className="nav-menu__close-container" onClick={closeNavMenu}>
        <div className="nav-menu__close-bar left"></div>
        <div className="nav-menu__close-bar right"></div>
      </div>
    </div>
  );
};

const NavMenuLinkText = ({ text }) => <p className="nav-menu__link">{text}</p>;

const NavMenuLink = ({ link, closeNavMenu }) => {
  if (link.nav) {
    return (
      <Link
        to={link.href}
        onClick={closeNavMenu}
        // onClick={props.HamburgerMenuLinkClickAbout}
      >
        <NavMenuLinkText text={link.text} />
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={link.href}>
      <NavMenuLinkText text={link.text} />
    </a>
  );
};

function NavMenuItems({ closeNavMenu }) {
  return (
    <div className="nav-menu__items">
      <Fade
        keyframes={customAnimation}
        direction="up"
        delay={1000}
        duration={800}
        triggerOnce={true}
        cascade
        damping={0.1}
      >
        <NavMenuLogo />
        {links.map((link) => (
          <NavMenuLink key={link.href} link={link} closeNavMenu={closeNavMenu} />
        ))}
      </Fade>
      <NavMenuClose closeNavMenu={closeNavMenu} />

      {/* <Fade keyframes={customAnimation} direction="up" delay={1000} duration={800} triggerOnce={true} cascade>
          <NavHashLink
            style={{ textDecoration: "none" }}
            onClick={props.HamburgerMenuLinkClickWork}
            smooth
            to="/#projects"
          >
            <p className="hamburger-info__link ">Work</p>
          </NavHashLink>
        </Fade>

        <Fade keyframes={customAnimation} direction="up" delay={1100} duration={800} triggerOnce={true} cascade>
          <Link style={{ textDecoration: "none" }} to="/about" onClick={props.HamburgerMenuLinkClickAbout}>
            <p className="hamburger-info__link ">About Us</p>
          </Link>
        </Fade>
        <Fade keyframes={customAnimation} direction="up" delay={1150} duration={800} triggerOnce={true} cascade>
          <a style={{ textDecoration: "none" }} href="mailto:hello@melt.works">
            <p className="hamburger-info__link ">Say Hello</p>
          </a>
        </Fade>
        <Fade keyframes={customAnimation} direction="up" delay={1200} duration={800} triggerOnce={true} cascade>
          <a
            style={{ textDecoration: "none" }}
            href="https://www.instagram.com/mellllllllllt/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="hamburger-info__link ">Follow</p>
          </a>
        </Fade> */}
    </div>
  );
}

const NavMenu = ({ setNavMenuOpen }) => {
  const closeNavMenu = () => {
    document.body.classList.remove("nav-menu-open");
    setNavMenuOpen(false);
  };

  return (
    <div className="nav-menu">
      <NavMenuItems closeNavMenu={closeNavMenu} />
    </div>
  );
};

export default NavMenu;
