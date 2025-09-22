import clsx from "clsx";
import { useLocation } from "react-router";
// import { useStore } from "../stores/store";
import Link from "./Link";
// import { useMotionValueEvent, useScroll } from "motion/react";
// import { useRef } from "react";
// import { mapLinear, smoothstep } from "three/src/math/MathUtils.js";
// import CanvasLogo from "./GL/Logo/Wrapper";

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

  return (
    <footer
      // ref={footer}
      className={clsx(
        "footer bg-light flex flex-col uppercase transition-opacity duration-2000 h-fit relative z-5"
        // {
        //   "opacity-0": showReel,
        //   "opacity-100": !showReel,
        // }
      )}
    >
      <div className="flex grow w-full flex-col bg-red-500/0">{/* <CanvasLogo /> */}</div>
      <div className="flex flex-col gap-15 gap-30 p-sm pb-md md:p-md z-10 pt-30 md:pt-50">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <div className="">Melt Studio</div>
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div>Brooklyn, NY - Los Angeles</div>
                <div>917.768.2955</div>
              </div>
              <Link to="mailto:hello@melt.works">hello@melt.works</Link>
            </div>
            <div className="flex flex-col items-end">
              <Link to="https://www.instagram.com/melt.works/" target="_blank">
                Instagram
              </Link>
              <Link to="https://www.linkedin.com/company/meltstudionyc" target="_blank">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-medium">
          <div>Making ideas that stick.</div>
          <div>© 2025 MELT</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
