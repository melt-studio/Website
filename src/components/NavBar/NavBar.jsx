import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
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

const NavBar = ({ mobile, viewport, scrollCutOff, loggedIn, setLoggedIn, setNavMenuOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  // const navigate = useNavigate();

  const excludes = useMemo(() => {
    return ["/about", "/404", "/other", "/admin", "/login", "/animations"];
  }, []);

  useEffect(() => {
    // console.log("navBar MOUNT", window.scrollY);
  }, []);

  useEffect(() => {
    // console.log("navBar LOCATION", window.scrollY, location.pathname);
    if (mobile || location.pathname.match(/^\/admin\/[\w-]+$/)) {
      setIsVisible(false);
    } else {
      // if (excludes.includes(location.pathname) || window.scrollY >= scrollCutOff) {
      if (excludes.some((ex) => location.pathname.includes(ex)) || window.scrollY >= scrollCutOff) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [excludes, location, mobile, scrollCutOff]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobile || excludes.some((ex) => location.pathname.includes(ex))) return;

    const sMax = document.body.offsetHeight - viewport.height;
    const s = scrollCutOff > sMax ? sMax / 2 : scrollCutOff;

    if (!isVisible && latest >= s) {
      setIsVisible(true);
    } else if (isVisible && latest < s) {
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

        {/* <select
        // value={this.state.selectValue}
        // onChange={this.handleChange}
        >
          <option value="Logo">Logo</option>
          <option value="Waterfall">Waterfall</option>
        </select> */}

        {/* {!location.pathname.includes("/admin") && ( */}
        {!location.pathname.includes("/admin") && (
          // <div className="nav-bar__item-holder">
          <>
            {/* <div className="nav-bar__item">
              <TagLink tag={{ text: "About Us", href: "/about" }} nav />
            </div> */}

            <div className="nav-bar__logo nav-bar__item" style={{ cursor: "pointer" }}>
              <img
                onClick={() => {
                  // if (location.pathname === "/") {
                  //   window.scrollTo({ top: 0, behavior: "smooth" });
                  // } else {
                  //   navigate("/");
                  // }
                  setNavMenuOpen(true);
                }}
                onMouseEnter={() => cursorEvents.onMouseEnter()}
                onMouseLeave={() => cursorEvents.onMouseLeave()}
                src={DrippyLogo}
                alt="MELT Logo"
              />

              {/* <div className="nav-bar__item">
                <TagLink
                  tag={{
                    text: "Melt Studio",
                    href: "/",
                    onClick: () => {
                      if (location.pathname === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        navigate("/");
                      }
                    },
                  }}
                  nav
                />
              </div> */}
            </div>

            {/* <div className="nav-bar__item">
              <TagLink tag={{ text: "Say Hello", href: "mailto:hello@melt.work" }} />
            </div> */}
          </>
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
