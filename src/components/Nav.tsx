import clsx from "clsx";
import { useLocation } from "react-router";
import { Easing, motion, useAnimationFrame } from "motion/react";
import Link from "./Link";
import Controls from "./GL/Background/Controls";
import { useStore } from "../stores/store";
import config from "../config.json";
import { useEffect, useRef, useState } from "react";
import { mapLinear } from "three/src/math/MathUtils.js";

type TextAnimationProps = {
  root?: string;
  lines?: string[];
  letter?: boolean;
  direction?: "up" | "down";
};

const TextAnimation = ({ root = "", lines, letter = false, direction = "up" }: TextAnimationProps) => {
  const linesRef = useRef<HTMLDivElement>(null);
  const viewport = useStore((state) => state.viewport);
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    if (!linesRef.current) return;
    const lineNodes: NodeListOf<HTMLSpanElement> = linesRef.current.querySelectorAll("span.line");
    setWidths([...lineNodes].map((line) => line.offsetWidth));
  }, [viewport]);

  useAnimationFrame((time) => {
    if (!lines || !linesRef.current) return;

    const duration = 6000 * lines.length;
    const frags: NodeListOf<HTMLSpanElement> = linesRef.current.querySelectorAll("span.frag");

    // 0-0.5
    const ramp = 0.1;
    const spread = 1.05;

    const end = duration * 0.1;

    const n = Math.floor((time + end) / (duration / lines.length));

    if (widths.length > 0) {
      const width = widths[n % widths.length];
      const w = `${width + 1}px`;
      if (linesRef.current.style.width !== w) {
        linesRef.current.style.width = w;
      }
    }

    frags.forEach((frag) => {
      const i = Number(frag.dataset.line);
      const j = Number(frag.dataset.frag);
      const count = Number(frag.dataset.count);

      const delay = (1 - j / count) * duration * 0.0125 + ((lines.length - i) * duration) / lines.length;
      const t = ((time + delay + end) % duration) / duration;
      let t_ = t < (1 / lines.length) * spread ? mapLinear(t, 0, (1 / lines.length) * spread, 0, 1) : 1;
      t_ = t_ < ramp ? mapLinear(t_, 0, ramp, 0, 0.5) : t_ < 1 - ramp ? 0.5 : mapLinear(t_, 1 - ramp, 1, 0.5, 1);

      frag.style.transform = `translateY(${direction === "up" ? 100 - 200 * t_ : -100 + 200 * t_}%)`;
    });
  });

  if (!lines) return null;

  let linesSplit = lines.map((word) => word.split(letter ? "" : " "));
  const max = Math.max(...linesSplit.map((line) => line.length));
  linesSplit = linesSplit.map((line) => {
    const out = letter ? line : [];
    if (!letter) {
      for (let i = 0; i < line.length; i++) {
        out.push(line[i]);
        if (i < line.length - 1) out.push(" ");
      }
    }

    return out;
  });

  return (
    <div className="overflow-hidden flex">
      {root}
      <div className="overflow-hidden flex w-fit" ref={linesRef}>
        {linesSplit.map((line, i) => {
          return (
            <span key={line.join("")} className="line absolute flex overflow-hidden">
              {line.map((frag, j) => {
                return (
                  <span
                    key={`${line.join("")}_${frag}_${j}`}
                    className="frag relative inline-block will-change"
                    data-line={i}
                    data-frag={j}
                    data-count={max}
                  >
                    {frag === " " ? "\u00a0" : frag}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Nav = () => {
  const location = useLocation();
  const viewport = useStore((state) => state.viewport);
  const about = useStore((state) => state.about);

  const dissolve = location.pathname.includes("/dissolve");
  const docs = location.pathname.includes("/docs/");

  const light = dissolve;
  const mid = docs;

  const taglines = about[0] ? about[0].fields.tagline : undefined;

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
      hidden: viewport.width >= config.breakpoints.mobile,
    },
    {
      to: "/works",
      label: "Works",
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
      hidden: viewport.width < config.breakpoints.mobile,
    },
    {
      to: "/dissolve",
      label: "Dissolve",
    },
  ];

  const homeLabel = {
    root: "Melt is\u00a0",
    default: "Melt is a Creative Studio",
  };

  return (
    <nav
      className={clsx(
        "nav flex top-0 left-0 w-full fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-[colors,_opacity] duration-2000",
        {
          "text-light fill-light": light,
          "text-mid fill-mid": mid,
          "mix-blend-difference text-light": !(light || mid),
          "opacity-0": docs,
          "opacity-100": !docs,
          "h-full gap-0 flex-col 2xl:flex-row": dissolve,
          "h-fit md:h-22 gap-4": !dissolve,
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
        className={clsx({
          "w-full 2xl:w-1/3 2xl:min-w-1/3": dissolve,
          "w-1/3 hidden md:flex": !dissolve,
        })}
      >
        <div className="flex w-full relative">
          <Link
            to="/"
            hideSelected={true}
            underline={!(viewport.width < config.breakpoints.mobile)}
            className="overflow-hidden"
          >
            {taglines ? (
              <TextAnimation
                root={homeLabel.root}
                lines={taglines}
                direction="down"
                // letter={true}
              />
            ) : (
              homeLabel.default
            )}
          </Link>
        </div>
      </motion.div>
      {dissolve && (
        <motion.div
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex grow items-start justify-center h-full 2xl:h-fit w-full 2xl:w-2/3 2xl:min-w-2/3"
        >
          <div className="items-center h-full flex flex-col w-1/2">
            <Controls />
          </div>
          <div className="min-w-1/2 w-1/2 hidden 2xl:flex"></div>
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
                  delay: 0.2 * (i + (viewport.width < config.breakpoints.mobile ? 0 : 1)),
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
