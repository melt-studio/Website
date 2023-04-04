import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import TagLink from "../TagLink/TagLink";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import { cursorEvents } from "../Cursor/Cursor";
import "./NavBar.css";
// import DrippyLogo from "../../assets/images/Logo/MELT_DRIPPY WHT.png";
import DrippyLogo from "../../assets/images/MELT__DRIPPY.svg";

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

  const navigate = useNavigate();

  const exclude = useMemo(() => {
    return ["/about", "/404", "/"];
  }, []);

  useEffect(() => {
    if (viewport.width < widthCutOff) {
      setIsVisible(false);
    } else {
      if (exclude.includes(location.pathname) || window.scrollY >= scrollCutOff) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [exclude, location, viewport, scrollCutOff, widthCutOff]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (viewport.width < widthCutOff || exclude.includes(location.pathname)) return;

    const sMax = document.body.offsetHeight - viewport.height;
    const s = scrollCutOff > sMax ? sMax / 2 : scrollCutOff;
    // console.log(latest, scrollCutOff, document.body.offsetHeight, sMax, s);

    if (!isVisible && latest >= s) {
      setIsVisible(true);
    } else if (isVisible && latest < s) {
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
        {/* <div className="nav-bar__item">
          <TagLink tag={{ text: "MELT Studio", href: "/" }} nav />
        </div> */}

        <div className="nav-bar__logo nav-bar__item">
          <img
            onClick={() => {
              // window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
            onMouseEnter={() => cursorEvents.onMouseEnter()}
            onMouseLeave={() => cursorEvents.onMouseLeave()}
            src={DrippyLogo}
            alt="MELT Logo"
          />
        </div>

        <div className="nav-bar__item">
          <TagLink tag={{ text: "About Us", href: "/about" }} nav />
        </div>
      </div>
    </FadeInOut>
  );
};

export default NavBar;
