import { useLocation } from "react-router";
import Link from "./Link";
import { Easing, motion, stagger } from "motion/react";
import clsx from "clsx";

const Footer = () => {
  const location = useLocation();
  if (location.pathname.includes("/docs/") || location.pathname === "/dissolve") return null;

  const parentVariants = {
    hidden: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delayChildren: stagger(0.25, { startDelay: 0 }),
        ease: "easeInOut" as Easing,
      },
    },
  };

  const bgVariants = {
    hidden: {
      opacity: 0,
      transform: "scaleY(0%)",
    },
    visible: {
      opacity: 1,
      transform: "scaleY(100%)",
      transition: {
        duration: 2,
        ease: "easeInOut" as Easing,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delay: 1,
        ease: "easeInOut" as Easing,
      },
    },
  };

  return (
    <motion.footer
      viewport={{ amount: 0, once: false }}
      initial="hidden"
      whileInView="visible"
      variants={parentVariants}
      className={clsx("footer flex flex-col uppercase transition-opacity duration-2000 h-fit relative z-5", {
        "bg-light": location.pathname.includes("/work/"),
      })}
    >
      <motion.div variants={bgVariants} className="absolute inset-0 bg-mid origin-bottom" />
      <motion.div variants={childVariants} className="flex grow w-full flex-col overflow-hidden pt-15"></motion.div>
      <div className="flex flex-col gap-15 md:gap-30 p-sm pb-md md:p-md z-10 pt-20 md:pt-20">
        <motion.div variants={childVariants} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <div className="">Melt Studio</div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div>Brooklyn, NY - Los Angeles</div>
                <div>917.768.2955</div>
              </div>
              <Link to="mailto:hello@melt.works">hello@melt.works</Link>
            </div>
            <div className="flex flex-col md:items-end">
              <Link to="https://www.instagram.com/melt.works/" target="_blank">
                Instagram
              </Link>
              <Link to="https://www.linkedin.com/company/meltstudionyc" target="_blank">
                LinkedIn
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div variants={childVariants} className="flex justify-between font-medium">
          <div>Making ideas that stick.</div>
          <div>© 2025 MELT</div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
