import clsx from "clsx";
import { useLocation } from "react-router";
import { Easing, motion, useAnimationFrame } from "motion/react";
import Link from "./Link";
import Controls from "./GL/Background/Controls";
import { useStore } from "../stores/store";
import config from "../config.json";
import { useRef } from "react";
import { mapLinear } from "three/src/math/MathUtils.js";

type LetterAnimationProps = {
  root?: string;
  words?: string[];
};

const LetterAnimation = ({ root = "", words }: LetterAnimationProps) => {
  const wordsRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time) => {
    if (!words || !wordsRef.current) return;

    const duration = 3000 * words.length;
    const letters: NodeListOf<HTMLSpanElement> = wordsRef.current.querySelectorAll("span.letter");

    // 0-0.5
    const ramp = 0.15;
    const spread = 1.2;

    const end = duration * 0.1;

    letters.forEach((letter) => {
      const i = Number(letter.dataset.word);
      const j = Number(letter.dataset.letter);
      const count = Number(letter.dataset.count);

      const delay = (1 - j / count) * duration * 0.1 + (i * duration) / words.length;
      const t = ((time + delay + end) % duration) / duration;
      let t_ = t < (1 / words.length) * spread ? mapLinear(t, 0, (1 / words.length) * spread, 0, 1) : 1;
      t_ = t_ < ramp ? mapLinear(t_, 0, ramp, 0, 0.5) : t_ < 1 - ramp ? 0.5 : mapLinear(t_, 1 - ramp, 1, 0.5, 1);

      letter.style.transform = `translateY(${100 - 200 * t_}%)`;
    });
  });

  if (!words) return null;

  let wordsSplit = words.map((word) => word.split(""));
  const max = Math.max(...wordsSplit.map((word) => word.length));
  wordsSplit = wordsSplit.map((word) => [...word, ...new Array(max - word.length + 1).fill(" ")]);

  return (
    <div className="overflow-hidden flex">
      {root}
      <div className="overflow-hidden flex w-fit" ref={wordsRef}>
        {wordsSplit.map((word, i) => {
          return (
            <span key={word.join("")} className="absolute flex overflow-hidden">
              {word.map((letter, j) => {
                return (
                  <span
                    key={`${word.join("")}_${letter}_${j}`}
                    className="letter relative inline-block will-change"
                    data-word={i}
                    data-letter={j}
                    data-count={word.length}
                  >
                    {letter === " " ? "\u00a0" : letter}
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
        "nav flex top-0 left-0 w-full fixed items-start justify-between p-sm md:p-md uppercase z-99 transition-all duration-2000 gap-4",
        {
          "text-light fill-light": light,
          "text-mid fill-mid": mid,
          "mix-blend-difference text-light": !(light || mid),
          "opacity-0": docs,
          "opacity-100": !docs,
          "h-full": dissolve,
          "h-fit md:h-22": !dissolve,
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
          "w-1/3 md:flex": !dissolve,
        })}
      >
        <div className="flex w-full relative">
          <Link to="/" underline={false}>
            {taglines ? <LetterAnimation root={homeLabel.root} words={taglines} /> : homeLabel.default}
          </Link>
        </div>
      </motion.div>
      {dissolve && (
        <motion.div
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex grow items-start justify-between h-full lg:h-fit"
        >
          <motion.div
            className="flex w-1/4"
            variants={childVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 2,
              delay: 2,
              ease: "easeInOut" as Easing,
            }}
          >
            <Link to="/" className="flex xl:hidden">
              Home
            </Link>
            <Link to="/" className="hidden xl:flex">
              {homeLabel.default}
            </Link>
          </motion.div>
          <div className="items-center h-full flex flex-col">
            <Controls />
          </div>
          <div className="w-1/4 flex xl:hidden justify-end invisible pointer-events-none">Home</div>
          <div className="w-1/4 hidden xl:flex justify-end invisible pointer-events-none">{homeLabel.default}</div>
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
