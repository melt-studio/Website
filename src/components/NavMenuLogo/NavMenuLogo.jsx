import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./NavMenuLogo.css";

import MeltLogo from "../../assets/images/MELT__LOGO.png";
import MeltLogoDark from "../../assets/images/MELT__LOGO_DARK.png";

const keyframes = {
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const NavMenuLogo = ({ setNavMenuOpen, initial, mobile, viewport, scrollCutOff, pageIsLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  const excludes = useMemo(() => {
    return ["/about", "/404", "/other"];
  }, []);

  useEffect(() => {
    if (!mobile) {
      setIsVisible(false);
    } else {
      if (location.pathname.includes("/project/") || pageIsLoading) {
        return setIsVisible(false);
      }
      const scrollCutOff2 = viewport.height * 1;

      if (
        excludes.some((ex) => location.pathname.includes(ex)) ||
        location.pathname === "/" ||
        window.scrollY > scrollCutOff2
      ) {
        if (location.pathname === "/") {
          setIsVisible(true && !initial);
        } else setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [excludes, location, mobile, scrollCutOff, initial, pageIsLoading, viewport]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mobile || excludes.some((ex) => location.pathname.includes(ex)) || location.pathname === "/") return;

    if (pageIsLoading) {
      return setIsVisible(false);
    }

    const scrollCutOff2 = viewport.height * 1;

    const sMax = document.body.scrollHeight - viewport.height;
    const s = scrollCutOff2 > sMax ? sMax / 2 : scrollCutOff2;

    if (!isVisible && latest > s) {
      setIsVisible(true);
    } else if (isVisible && latest <= s) {
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
              src={location.pathname.includes("/about") ? MeltLogoDark : MeltLogo}
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
