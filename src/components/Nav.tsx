import { useLocation } from "react-router";
import Link from "./Link";
// import LogoText from "./LogoText";
// import { useStore } from "../store";
import clsx from "clsx";
import Controls from "./GL/Controls";
// import LetterAnimation from "./LetterAnimation";
import { motion } from "motion/react";
import { useStore } from "../stores/store";
// import { useMemo } from "react";
// import { Vector2 } from "three";

const Nav = () => {
  const location = useLocation();
  const activeProject = useStore((state) => state.activeProject);
  const projects = useStore((state) => state.projects);

  const dissolve = location.pathname.includes("/dissolve");
  const docs = location.pathname.includes("/docs/");

  const light = dissolve || activeProject?.contrast.label === "light";
  const mid = activeProject?.contrast.label === "mid" || docs;

  // Get first project url
  let projectUrl = null;
  if (projects && projects.length > 0) {
    projectUrl = projects[0].fields.projectUrl.toLowerCase();
  }

  //   const scroll = useMemo(() => new Vector2(), []);

  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   scroll.x = MathUtils.clamp(latest, 0, window.innerHeight / 2);
  // });

  return (
    <motion.nav
      initial={{ opacity: 0, transform: "translateY(-100%)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
      className={clsx(
        "nav flex top-0 left-0 w-full h-fit md:h-22 fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-colors duration-2000 gap-4",
        {
          "text-light fill-light": light,
          "text-mid fill-mid": mid,
        }
      )}
    >
      <div
        className={clsx("hidden md:flex", {
          "w-1/4": dissolve,
          "w-1/3": !dissolve,
        })}
      >
        <div className="flex w-full">
          <Link to="/" underline={false}>
            Melt is a Creative Studio
          </Link>
          {/* {"\u00A0"}
          <LetterAnimation text={["is a Creative Studio", "is a text goes here", "is another one"]} /> */}
        </div>
      </div>
      {dissolve ? (
        // <div className="flex grow items-center justify-between animate-[fadeIn_2s_ease_1_alternate_forwards]">
        <div
          className="flex grow items-start justify-between"
          // className={clsx("flex grow items-center justify-between transition-opacity duration-2000", {
          //   "opacity-100": dissolve,
          //   "opacity-0": !dissolve,
          // })}
        >
          <Controls />
          <div className="flex w-1/4 justify-end">
            <Link to="/">Home</Link>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-2/3 flex items-center justify-between">
          <Link to={projectUrl ? `/work/${projectUrl}` : "/"} hideSelected={projectUrl === null}>
            Work
          </Link>
          <Link to="/about">About Us</Link>
          <Link to="mailto:hello@melt.works">Contact</Link>
          <Link to="/dissolve">Dissolve</Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Nav;
