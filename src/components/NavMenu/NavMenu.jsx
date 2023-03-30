import React, { useRef } from "react";
import { Link } from "react-router-dom";
// import { NavHashLink } from "react-router-hash-link";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import "./NavMenu.css";

import logo from "../../assets/images/Logo/MELT_DRIPPY WHT.png";

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
    <div className="nav_menu-logo">
      <img src={logo} />
    </div>
  );
};
const NavMenuClose = ({ handleClose }) => {
  return (
    <div className="nav_menu-close-container">
      <div className="nav_menu-close" onClick={handleClose}>
        <div className="nav_menu-close-bar left"></div>
        <div className="nav_menu-close-bar right"></div>
      </div>
    </div>
  );
};

const NavMenuItemText = ({ text }) => <p className="hamburger-info__link ">{text}</p>;

const NavMenuItem = ({ link }) => {
  if (link.nav) {
    return (
      <Link
        to={link.href}
        // onClick={props.HamburgerMenuLinkClickAbout}
      >
        <NavMenuItemText text={link.text} />
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={link.href}>
      <NavMenuItemText text={link.text} />
    </a>
  );
};

function NavMenuItems({ handleClose }) {
  return (
    <div className="hamburger-info__container">
      <div className="hamburger-info__mobile-smaller">
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
            <NavMenuItem key={link.href} link={link} />
          ))}
        </Fade>
        <NavMenuClose handleClose={handleClose} />

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
    </div>
  );
}

const NavMenu = ({ closeMenu }) => {
  return (
    <div className="hamburger-menu__container">
      <div className="hamburger-info__holder">
        <NavMenuItems
          handleClose={closeMenu}
          // setFadeInText={props.setFadeInText}
          // setShowHamburger={props.setShowHamburger}
          // HamburgerMenuLinkClickAbout={props.HamburgerMenuLinkClickAbout}
          // HamburgerMenuLinkClickWork={props.HamburgerMenuLinkClickWork}
        />
      </div>
    </div>
  );
};

export default NavMenu;
