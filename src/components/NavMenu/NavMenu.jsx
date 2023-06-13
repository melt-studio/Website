import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./NavMenu.css";

const keyframesContainer = {
  enter: {
    opacity: [0, 1, 1, 1, 1, 1],
    y: 0,
    transition: { duration: 1.25, ease: "easeInOut", when: "beforeChildren" },
  },
  exit: {
    opacity: [1, 1, 1, 1, 1, 0],
    y: "-100%",
    transition: {
      duration: 1.25,
      ease: "easeInOut",
      delay: 1.4,
      // when: "afterChildren",
    },
  },
};

const keyframesItems = {
  enter: {
    transition: { staggerChildren: 0.15, delayChildren: 0 },
  },
  exit: {
    transition: { staggerChildren: 0.15, staggerDirection: -1 },
  },
};

const keyframesItem = {
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const links = [
  { text: "Works", href: "/", nav: true },
  { text: "About Us", href: "/about", nav: true },
  { text: "Say Hello", href: "mailto:hello@melt.works", nav: false },
  { text: "Follow", href: "https://www.instagram.com/melt.works/", nav: false },
];

const NavMenuClose = ({ closeNavMenu, present }) => {
  return (
    <motion.div className="nav-menu__close" variants={keyframesItem}>
      <div
        className={`nav-menu__close-container${present ? "" : " closing"}`}
        onClick={closeNavMenu}
        onMouseEnter={() => cursorEvents.onMouseEnter()}
        onMouseLeave={() => cursorEvents.onMouseLeave()}
      >
        <div className="nav-menu__close-bar left"></div>
        <div className="nav-menu__close-bar right"></div>
      </div>
    </motion.div>
  );
};

const NavMenuLinkText = ({ text, selected }) => (
  <motion.p
    className="nav-menu__link"
    variants={keyframesItem}
    onMouseEnter={() => cursorEvents.onMouseEnter()}
    onMouseLeave={() => cursorEvents.onMouseLeave()}
  >
    {text}
  </motion.p>
);

const NavMenuLink = ({ link, closeNavMenu }) => {
  const [selected, setSelected] = useState(false);

  if (link.nav) {
    return (
      <Link
        to={link.href}
        onClick={() => {
          setSelected(true);
          closeNavMenu();
        }}
      >
        <NavMenuLinkText text={link.text} selected={selected} />
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={link.href}>
      <NavMenuLinkText text={link.text} />
    </a>
  );
};

function NavMenuItems({ closeNavMenu, closing }) {
  const isPresent = useIsPresent();

  return (
    <motion.div className="nav-menu__items" variants={keyframesItems}>
      {links.map((link) => (
        <NavMenuLink key={link.href} link={link} closeNavMenu={closeNavMenu} />
      ))}
      <NavMenuClose key={"close"} closeNavMenu={closeNavMenu} closing={closing} present={isPresent} />
    </motion.div>
  );
}

const NavMenu = ({ navMenuOpen, setNavMenuOpen }) => {
  const closeNavMenu = () => {
    setNavMenuOpen(false);
  };

  return (
    <FadeInOut isVisible={navMenuOpen} keyframes={keyframesContainer} className="nav-menu">
      <NavMenuItems closeNavMenu={closeNavMenu} />
    </FadeInOut>
  );
};

export default NavMenu;
