import clsx from "clsx";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { useStore } from "../stores/store";
import Link from "./Link";
import Controls from "./GL/Background/Controls";

const Nav = () => {
  const location = useLocation();
  const projectTiles = useStore((state) => state.projectTiles);

  const dissolve = location.pathname.includes("/dissolve");
  const docs = location.pathname.includes("/docs/");

  const light = dissolve;
  const mid = docs;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, transform: "translateY(-100%)" }}
        animate={docs ? { opacity: 0, transform: "translateY(-100%)" } : { opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
        className={clsx(
          "nav flex top-0 left-0 w-full h-fit md:h-22 fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-colors duration-2000 gap-4",
          {
            "text-light fill-light": light,
            "text-mid fill-mid": mid,
            "mix-blend-difference text-light": !(light || mid),
          }
        )}
      >
        <div
          className={clsx("hidden md:flex", {
            "w-1/2": dissolve,
            "w-1/3": !dissolve,
          })}
        >
          <div className="flex w-full">
            <Link to="/" underline={false}>
              Melt is a Creative Studio
            </Link>
          </div>
        </div>
        {dissolve && (
          <motion.div
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex grow items-start justify-end w-1/2"
          >
            <div className="flex justify-end">
              <Link to="/">Home</Link>
            </div>
          </motion.div>
        )}
        {!dissolve && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            className="w-full md:w-2/3 flex items-center justify-between"
          >
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === "/" && projectTiles) projectTiles.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Work
            </Link>
            <Link to="/about">About Us</Link>
            <Link to="mailto:hello@melt.works" target="_blank">
              Contact
            </Link>
            <Link to="/dissolve">Dissolve</Link>
          </motion.div>
        )}
      </motion.nav>

      {dissolve && (
        <motion.nav
          initial={{ opacity: 0, transform: "translateY(-100%)" }}
          animate={docs ? { opacity: 0, transform: "translateY(-100%)" } : { opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
          className={clsx(
            "nav flex bottom-0 left-0 w-full h-fit fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-colors duration-2000 gap-4",
            {
              "text-light fill-light": light,
              "text-mid fill-mid": mid,
              "mix-blend-difference text-light": !(light || mid),
            }
          )}
        >
          <motion.div
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex grow items-center justify-center"
          >
            <Controls />
          </motion.div>
        </motion.nav>
      )}
    </>
  );
};

export default Nav;
