import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./NavMenu.css";
// import DrippyLogo from "../../assets/images/Logo/MELT_DRIPPY WHT.png";

const keyframesContainer = {
  enter: { opacity: [0, 1, 1], y: 0 },
  exit: { opacity: [1, 1, 0], y: "-100%" },
};

const keyframesItems = {
  enter: {
    transition: { staggerChildren: 0.1, delayChildren: 0.9 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const keyframesItem = {
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

const links = [
  { text: "Works", href: "/#projects", nav: true },
  { text: "About Us", href: "/about", nav: true },
  { text: "Say Hello", href: "mailto:hello@melt.works", nav: false },
  { text: "Follow", href: "https://www.instagram.com/melt.works/", nav: false },
];

// const NavMenuLogo = () => {
//   return (
//     <motion.div className="nav-menu__logo" variants={keyframesItem}>
//       <img src={DrippyLogo} />
//     </motion.div>
//   );
// };

const NavMenuClose = ({ closeNavMenu }) => {
  return (
    <motion.div className="nav-menu__close" variants={keyframesItem}>
      <div
        className="nav-menu__close-container"
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

const NavMenuLinkText = ({ text }) => (
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
  if (link.nav) {
    return (
      <Link to={link.href} onClick={closeNavMenu}>
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
    <motion.div className="nav-menu__items" variants={keyframesItems}>
      {/* <NavMenuLogo /> */}
      {links.map((link) => (
        <NavMenuLink key={link.href} link={link} closeNavMenu={closeNavMenu} />
      ))}
      <NavMenuClose closeNavMenu={closeNavMenu} />
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

// <AnimatePresence>
//   {navMenuOpen && (
//     <motion.div
//       transition={{
//         duration: 1,
//         delay: 0,
//         ease: "easeInOut",
//       }}
//       key="nav-menu"
//       variants={variantsContainer}
//       initial="exit"
//       animate="enter"
//       exit="exit"
//       className="nav-menu"
//     >
//       <NavMenuItems closeNavMenu={closeNavMenu} />
//     </motion.div>
//   )}
// </AnimatePresence>

// <Fade2
//   isVisible={navMenuOpen}
//   duration={1}
//   delay={0}
//   keyframes={{
//     initial: { opacity: 0, y: "-100%" },
//     animate: { opacity: [0, 1, 1], y: 0 },
//     exit: { opacity: [1, 1, 0], y: "-100%" },
//   }}
//   // y={20}
//   className="nav-menu"
// >
//   {/* <div ref={navMenu} className="nav-menu"> */}
//   <NavMenuItems navMenuOpen={navMenuOpen} closeNavMenu={closeNavMenu} />
//   {/* </div> */}
// </Fade2>

// const Fade2 = ({ isVisible, duration = 1, delay = 0, ease = "easeInOut", keyframes, className, children }) => {
//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           transition={{ duration, delay, ease }}
//           key="nav-menu"
//           // initial={{ opacity: 0, y }}
//           // animate={{ opacity: 1, y: 0 }}
//           // exit={{ opacity: 0, y }}
//           {...keyframes}
//           className={className}
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// <motion.nav
//   animate={navMenuOpen ? "open" : "closed"}
//   variants={variants}
//   initial={false}
//   transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
//   className="nav-menu"
// >
//   <NavMenuItems closeNavMenu={closeNavMenu} />
// </motion.nav>
