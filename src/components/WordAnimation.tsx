import clsx from "clsx";
import { Easing, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import useObserver, { ObserverPosition, ObserverState } from "../helpers/useObserver";
import { useStore } from "../stores/store";

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
  reset?: boolean;
  active?: boolean;
  keyframe?: boolean;
  keyframeSettings?: {
    delay: number;
    duration: number;
  };
  scroll?: boolean;
  scrollFactor?: number;
};

export function WordAnimation({
  text,
  className = "",
  mode = "overflow",
  duration = 2,
  delay = 0,
  unitDelay = 0.075,
  transformOffset = "110%",
  easing = "easeInOut",
  once = false,
  amount = 0.1,
  fixed = false,
  min = 0,
  max = 1,
  reset = false,
  active = true,
  keyframe = false,
  scroll = false,
  scrollFactor = 1,
}: AnimateWordsProps) {
  const { height } = useStore((state) => state.viewport);
  const { scrollY } = useScroll();
  const [state, setState] = useState<ObserverState>({ current: "below", last: "below" });
  const [keyframeExit, setKeyframeExit] = useState(false);

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
      if (!active) return;

      let position = "below";
      const s = scroll / height;
      if (s < min) position = "below";
      else if (s < max) position = "show";
      else position = "above";

      setState((s) => (s.current === position ? s : { current: position as ObserverPosition, last: s.current }));
    },
    [height, min, max, active]
  );

  useEffect(() => {
    if (fixed && !keyframe) updateShow(scrollY.get());
  }, [updateShow, fixed, scrollY, keyframe]);

  const [ref, position] = useObserver<HTMLDivElement>({
    amount,
    once,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (fixed && !keyframe) {
      updateShow(latest);

      if (scroll && ref.current) {
        ref.current.style.transform = `translate3d(0px, -${latest * scrollFactor}px, 0px)`;
      }
    }
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

  const show = fixed ? state : position;

  const variants = {
    initial: {
      transform: transform[keyframe ? "below" : show.last],
      opacity: opacity[keyframe ? "below" : show.last],
    },
    animate: (i: number) => ({
      transform: transform[keyframe ? (keyframeExit ? "above" : "show") : show.current],
      opacity: opacity[keyframe ? (keyframeExit ? "above" : "show") : show.current],
      transition: {
        duration,
        delay: i * unitDelay + delay,
        ease: easing,
      },
    }),
  };

  const motionProps = {
    variants,
    initial: "initial",
    animate: "animate",
    className: "relative will-change-transform inline-block",
  };

  if (!text) return null;

  return (
    <div className={className} ref={ref}>
      <div className="flex flex-col will-change-transform">
        {splittedText.map((line, i) => {
          return (
            <p key={`${i}_${line.join(" ")}`} className="flex flex-wrap justify-center leading-[1]">
              {line.map((current, j) => {
                const last = i === splittedText.length - 1 && j === line.length - 1;

                return (
                  <span
                    key={`${current.index}_${current.text}`}
                    className={clsx("relative -my-[0.08em] px-[0.1em]", {
                      "overflow-y-hidden": mode === "overflow",
                    })}
                  >
                    <motion.span
                      custom={current.index}
                      {...motionProps}
                      onAnimationComplete={() => {
                        if (!last) return;

                        if (keyframe) setKeyframeExit(true);
                        else if (reset) setState({ current: "below", last: "below" });
                      }}
                    >
                      <span className="overflow-visible">{current.text}</span>
                    </motion.span>
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
    </div>
  );
}
