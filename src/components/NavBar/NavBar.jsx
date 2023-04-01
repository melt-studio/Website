import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import TagLink from "../TagLink/TagLink";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor";
import "./NavBar.css";
import DrippyLogo from "../../assets/images/Logo/MELT_DRIPPY WHT.png";

const keyframes = {
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-100%",
  },
};

const NavBar = ({ viewport, widthCutOff, scrollCutOff }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (viewport.width < widthCutOff) {
      setIsVisible(false);
    } else {
      if (location.pathname === "/about" || window.scrollY >= scrollCutOff) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [location, viewport, scrollCutOff, widthCutOff]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (viewport.width < widthCutOff || location.pathname === "/about") return;

    if (!isVisible && latest >= scrollCutOff) {
      setIsVisible(true);
    } else if (isVisible && latest < scrollCutOff) {
      setIsVisible(false);
    }
  });

  return (
    // <motion.div
    //   animate={isVisible ? "enter" : "exit"}
    //   initial="exit"
    //   variants={keyframes}
    //   transition={{ duration: 1, ease: "easeInOut" }}
    //   className="nav-bar"
    // >
    <FadeInOut
      isVisible={isVisible}
      transition={{ duration: 1, delay: location.pathname === "/about" ? 0.5 : 0, ease: "easeInOut" }}
      keyframes={keyframes}
      className="nav-bar"
    >
      <div className="nav-bar__items">
        <TagLink tag={{ text: "MELT Studio", href: "/" }} nav />

        <div className="nav-bar__logo">
          <img
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={() => cursorEvents.onMouseEnter()}
            onMouseLeave={() => cursorEvents.onMouseLeave()}
            src={DrippyLogo}
            alt="MELT Logo"
          />
        </div>

        <TagLink tag={{ text: "About Us", href: "/about" }} nav />
      </div>
    </FadeInOut>
  );
};

export default NavBar;
