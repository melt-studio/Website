import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./NavMenuLogo.css";
import MeltLogo from "../../assets/images/MELT__LOGO.png";

const keyframes = {
  // initial: { opacity: 1, y: -20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }, // y: 20
};

const NavMenuLogo = ({ setNavMenuOpen, initial, viewport, widthCutOff, scrollCutOff }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  const exclude = useMemo(() => {
    return ["/about", "/404", "/"];
  }, []);

  useEffect(() => {
    if (viewport.width >= widthCutOff) {
      setIsVisible(false);
    } else {
      if (exclude.includes(location.pathname) || window.scrollY >= scrollCutOff) {
        if (location.pathname === "/") setIsVisible(true && !initial);
        else setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [exclude, location, viewport, widthCutOff, scrollCutOff, initial]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (viewport.width >= widthCutOff || exclude.includes(location.pathname)) return;

    const sMax = document.body.offsetHeight - viewport.height;
    const s = scrollCutOff > sMax ? sMax / 2 : scrollCutOff;
    // console.log(latest, scrollCutOff, document.body.offsetHeight, sMax, s);

    if (!isVisible && latest >= s) {
      setIsVisible(true);
    } else if (isVisible && latest < s) {
      setIsVisible(false);
    }
  });

  const openNavMenu = () => {
    document.body.classList.add("nav-menu-open");
    setNavMenuOpen(true);
  };

  return (
    <>
      <FadeInOut
        isVisible={isVisible}
        transition={{ duration: 1, delay: location.pathname === "/about" ? 0.5 : 0, ease: "easeInOut" }}
        keyframes={keyframes}
        className="nav-menu-logo"
      >
        <div className="nav-menu-logo__fade">
          <div className="nav-menu-logo__gradient">
            <img
              onClick={openNavMenu}
              className="nav-menu-logo__img"
              src={MeltLogo}
              alt="MELT Logo"
              onMouseEnter={() => cursorEvents.onMouseEnter()}
              onMouseLeave={() => cursorEvents.onMouseLeave()}
            />
          </div>
        </div>
      </FadeInOut>
    </>
  );
};

export default NavMenuLogo;