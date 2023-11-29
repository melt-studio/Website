import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import TagLink from "../TagLink/TagLink";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor";
// import DrippyIcon from "../../assets/images/MELT__DRIPPY.gif";
import "./NavBar.css";

import DrippyLogo from "./DrippyLogo.jsx";
// import DrippyLogoStroke from "./DrippyLogoStroke.jsx";

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

const NavBar = ({ mobile, viewport, scrollCutOff, loggedIn, setLoggedIn, setNavMenuOpen, pageIsLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  const excludes = useMemo(() => {
    return ["/about", "/404", "/other", "/admin", "/login", "/animations"];
  }, []);

  useEffect(() => {
    if (mobile || location.pathname.match(/^\/admin\/[\w-]+$/)) {
      setIsVisible(false);
    } else {
      if (location.pathname.includes("/project/") || pageIsLoading) {
        return setIsVisible(false);
      }

      if (excludes.some((ex) => location.pathname.includes(ex)) || window.scrollY > scrollCutOff) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [excludes, location, mobile, scrollCutOff, pageIsLoading]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobile || excludes.some((ex) => location.pathname.includes(ex))) return;

    if (pageIsLoading) return setIsVisible(false);

    const sMax = document.body.scrollHeight - viewport.height;
    const s = scrollCutOff > sMax ? sMax / 2 : scrollCutOff;

    if (!isVisible && latest > s) {
      setIsVisible(true);
    } else if (isVisible && latest <= s) {
      setIsVisible(false);
    }
  });

  const handleLogout = () => {
    setLoggedIn(false);
    if (window.localStorage.getItem("melt_admin_password")) {
      window.localStorage.removeItem("melt_admin_password");
    }

    document.body.classList.remove("logged-in");
  };

  return (
    <FadeInOut
      isVisible={isVisible}
      transition={{ duration: 1, delay: location.pathname === "/about" ? 0.5 : 0, ease: "easeInOut" }}
      keyframes={keyframes}
      className="nav-bar"
    >
      <div className="nav-bar__items">
        {!location.pathname.includes("/admin") && (
          <div className="nav-bar__logo nav-bar__item" style={{ cursor: "pointer" }}>
            <div
              onClick={() => {
                setNavMenuOpen(true);
              }}
              onMouseEnter={() => cursorEvents.onMouseEnter()}
              onMouseLeave={() => cursorEvents.onMouseLeave()}
            >
              {/* {location.pathname.includes("/about") ? <DrippyLogoStroke /> : <DrippyLogo />} */}
              <DrippyLogo />
              {/* <span className="drippylogo"></span> */}
              {/* <img src={DrippyIcon} alt="MELT logo" /> */}
            </div>
          </div>
        )}

        {location.pathname.includes("/admin") && loggedIn && (
          <>
            <div className="nav-bar__logo nav-bar__item">
              <div className="nav-bar__item">
                <TagLink tag={{ text: "Return to homepage", href: "/" }} nav />
              </div>
            </div>

            <div className="nav-bar__item">
              <TagLink
                tag={{
                  text: "Logout",
                  onClick: handleLogout,
                }}
                nav
              />
            </div>
          </>
        )}
      </div>
    </FadeInOut>
  );
};

export default NavBar;
