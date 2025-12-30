import clsx from "clsx";
import { useLocation } from "react-router";
import { Easing, motion } from "motion/react";
import Link from "./Link";
import Controls from "./GL/Background/Controls";
import { useStore } from "../stores/store";

const Nav = () => {
  const location = useLocation();
  const viewport = useStore((state) => state.viewport);

  const dissolve = location.pathname.includes("/dissolve");
  const docs = location.pathname.includes("/docs/");

  const light = dissolve;
  const mid = docs;

  const childVariants = {
    hidden: { opacity: 0, transform: "translateY(100%)" },
    visible: {
      opacity: 1,
      transform: "translateY(0%)",
    },
  };

  const links = [
    {
      to: "/",
      label: "Home",
      className: "flex md:hidden",
      hidden: viewport.width >= 768,
    },
    {
      to: "/work",
      label: "Work",
    },
    {
      to: "/about",
      label: "About Us",
    },
    {
      to: "mailto:hello@melt.works",
      label: "Contact",
      target: "_blank",
      className: "hidden md:flex",
      hidden: viewport.width < 768,
    },
    {
      to: "/dissolve",
      label: "Dissolve",
    },
  ];

  return (
    <nav
      className={clsx(
        "nav flex top-0 left-0 w-full h-fit md:h-22 fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-all duration-2000 gap-4",
        {
          "text-light fill-light": light,
          "text-mid fill-mid": mid,
          "mix-blend-difference text-light": !(light || mid),
          "opacity-0": docs,
          "opacity-100": !docs,
        }
      )}
    >
      <motion.div
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1,
          delay: 0,
          ease: "easeInOut" as Easing,
        }}
        className={clsx("hidden", {
          "w-1/4 lg:flex": dissolve,
          "w-1/3 md:flex": !dissolve,
        })}
      >
        <div className="flex w-full">
          <Link to="/" underline={false}>
            Melt is a Creative Studio
          </Link>
        </div>
      </motion.div>
      {dissolve && (
        <motion.div
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex grow items-start justify-between"
        >
          <Controls />
          <motion.div
            className="flex w-1/4 justify-end"
            variants={childVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 2,
              delay: 2.5,
              ease: "easeInOut" as Easing,
            }}
          >
            <Link to="/">Home</Link>
          </motion.div>
        </motion.div>
      )}
      {!dissolve && (
        <div className="w-full md:w-2/3 flex items-center justify-between">
          {links
            .filter((link) => !link.hidden)
            .map((link, i) => (
              <motion.div
                key={link.label}
                variants={childVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 1,
                  delay: 0.2 * (i + (viewport.width < 768 ? 0 : 1)),
                  ease: "easeInOut" as Easing,
                }}
                className={link.className}
              >
                <Link to={link.to} target={link.target}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
