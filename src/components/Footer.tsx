import clsx from "clsx";
import { useLocation } from "react-router";
// import { useStore } from "../stores/store";
import Link from "./Link";
// import { useMotionValueEvent, useScroll } from "motion/react";
// import { useRef } from "react";
// import { mapLinear, smoothstep } from "three/src/math/MathUtils.js";
// import CanvasLogo from "./GL/Logo/Wrapper";
import { Easing, motion, stagger } from "motion/react";

const Footer = () => {
  const location = useLocation();
  // const showReel = useStore((state) => state.showReel);
  // const viewport = useStore((state) => state.viewport);
  // const footer = useRef<HTMLDivElement | null>(null);

  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (!footer.current) return;

  //   const y = footer.current.offsetTop;
  //   const h = Math.max(
  //     document.body.scrollHeight,
  //     document.body.offsetHeight,
  //     document.documentElement.clientHeight,
  //     document.documentElement.scrollHeight,
  //     document.documentElement.offsetHeight
  //   );
  //   const s = latest / (h - viewport.height);
  //   const f = 1 - smoothstep(s, y / h, 1);
  //   // console.log(f * 100);
  //   footer.current.style.transform = `translateY(${f * 25}%)`;
  //   // const s = latest / viewport.height
  // });

  if (location.pathname.includes("/docs/") || location.pathname === "/dissolve") return null;

  const parentVariants = {
    hidden: {
      opacity: 1,
      transform: "translateY(0px)",
      // background: "#c1c1c1"
    },
    visible: {
      opacity: 1,
      // background: "#c1c1c1",
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delayChildren: stagger(0.25, { startDelay: 0.5 }),
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
        ease: "easeInOut" as Easing,
      },
    },
  };

  return (
    <motion.footer
      viewport={{ amount: 0.1, once: false }}
      initial="hidden"
      whileInView="visible"
      variants={parentVariants}
      // ref={footer}
      className={clsx(
        // "footer bg-mid flex flex-col uppercase transition-opacity duration-2000 h-screen relative z-5"
        "footer bg-mid flex flex-col uppercase transition-opacity duration-2000 h-fit relative z-5"
        // {
        //   "opacity-0": showReel,
        //   "opacity-100": !showReel,
        // }
      )}
    >
      <motion.div variants={childVariants} className="flex grow w-full flex-col overflow-hidden pt-15">
        {/* <div className="flex grow"> */}
        {/* <CanvasLogo /> */}
        {/* </div> */}
      </motion.div>
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
