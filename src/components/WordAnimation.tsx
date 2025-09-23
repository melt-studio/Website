import clsx from "clsx";
import { Easing, motion, useMotionValueEvent, useScroll } from "motion/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../stores/store";

type ObserverOptions = {
  amount?: number;
  once?: boolean;
};

type State = {
  current: Position;
  last: Position;
};

// --staggered-delay: 0.15;
// --staggered-opacity-duration: 0.9;
// --staggered-translate-y: 30px;
// --staggered-translate-y-duration: 0.7;

const useObserver = ({ amount = 0.5, once = false }: ObserverOptions = {}): [
  RefObject<HTMLParagraphElement | null>,
  state: State
] => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [position, setPosition] = useState<State>({ current: "below", last: "below" });

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (once && initialized) return;

      const [entry] = entries;
      if (entry.isIntersecting) {
        setPosition((pos) => ({ current: "show", last: pos.current }));
        setInitialized(true);
      } else {
        setPosition((pos) => ({ current: entry.boundingClientRect.y < 0 ? "above" : "below", last: pos.current }));
      }
    },
    [once, initialized]
  );

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(callback, {
      threshold: amount,
    });
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [amount, callback]);

  return [ref, position];
};

type AnimateWordsProps = {
  text: string;
  className?: string;
  mode?: "overflow" | "fade";
  duration?: number;
  delay?: number;
  unitDelay?: number;
  transformOffset?: string;
  easing?: Easing;
  once?: boolean;
  amount?: number;
  fixed?: boolean;
  min?: number;
  max?: number;
};

type Position = "below" | "show" | "above";

export function WordsPullUp({
  text,
  className = "",
  mode = "overflow",
  duration = 2,
  delay = 0,
  unitDelay = 0.025,
  transformOffset = "110%",
  easing = "easeInOut",
  once = false,
  amount = 0.1,
  fixed = false,
  min = 0,
  max = 1,
}: AnimateWordsProps) {
  const { height } = useStore((state) => state.viewport);
  const { scrollY } = useScroll();
  const [state, setState] = useState<State>({ current: "below", last: "below" });

  let index = 0;
  const splittedText = text
    .split("\n")
    .map((t) => t.split(" "))
    .map((t) => {
      const out = t.map((w, i) => ({ text: w, index: index + i }));
      index += t.length;
      return out;
    });

  const updateShow = useCallback(
    (scroll: number) => {
      let position = "below";
      const s = scroll / height;
      if (s < min) position = "below";
      else if (s < max) position = "show";
      else position = "above";

      setState((s) => ({ current: position as Position, last: s.current }));
    },
    [height, min, max]
  );

  useEffect(() => {
    if (fixed) updateShow(window.screenY);
  }, [updateShow, fixed]);

  const [ref, position] = useObserver({
    amount,
    once,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (fixed) updateShow(latest);
  });

  const transform = {
    below: `translate3d(0px, ${transformOffset}, 0px)`,
    show: "translate3d(0px, 0%, 0px)",
    above: `translate3d(0px, -${transformOffset}, 0px)`,
  };

  const opacity = {
    below: mode === "fade" ? 0 : 1,
    show: 1,
    above: mode === "fade" ? 0 : 1,
  };

  // const state = fixed ? show : position;

  const show = fixed ? state : position;

  const variants = {
    initial: {
      transform: transform.below,
      opacity: opacity.below,
    },
    animate: (i: number) => ({
      transform: transform[show.current],
      opacity: opacity[show.current],
      transition: {
        duration,
        // delay: (state !== "above" ? i : splittedText.length - i) * unitDelay + delay,
        delay: (show.last === "above" ? splittedText.length - i : i) * unitDelay + delay,
        ease: easing,
      },
    }),
    // exit: {
    //   transform: transform.above,
    //   opacity: opacity.above,
    // },
  };

  // console.log(state);

  const motionProps = {
    variants,
    initial: "initial",
    animate: "animate",
    className: "relative will-change-transform inline-block",
    // exit: "exit",
  };

  return (
    <div className={clsx("flex flex-col", {}, className)} ref={ref}>
      {splittedText.map((line, i) => {
        return (
          <p key={`${i}_${line.join(" ")}`} className="flex flex-wrap justify-center">
            {line.map((current, j) => {
              return (
                <span
                  key={`${current.index}_${current.text}`}
                  className={clsx("relative", {
                    "overflow-hidden": mode === "overflow",
                  })}
                >
                  <motion.span custom={current.index} {...motionProps}>
                    {current.text}
                  </motion.span>
                  {j < line.length - 1 && <span>{"\u00A0"}</span>}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
