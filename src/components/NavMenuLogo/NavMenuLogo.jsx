import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./NavMenuLogo.css";
import MeltLogo from "../../assets/images/Logo/MELT_LOGO WHT_SM.png";

const keyframes = {
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const NavMenuLogo = ({ setNavMenuOpen, viewport, widthCutOff, scrollCutOff }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (viewport.width >= widthCutOff) {
      setIsVisible(false);
    } else {
      if (location.pathname === "/about" || window.scrollY >= scrollCutOff) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [location, viewport, widthCutOff, scrollCutOff]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (viewport.width >= widthCutOff || location.pathname === "/about") return;

    if (!isVisible && latest >= scrollCutOff) {
      setIsVisible(true);
    } else if (isVisible && latest < scrollCutOff) {
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
              {...cursorEvents}
            />
          </div>
        </div>
      </FadeInOut>
    </>
  );
};

export default NavMenuLogo;
