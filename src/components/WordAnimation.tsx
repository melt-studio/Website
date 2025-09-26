import clsx from "clsx";
import { Easing, motion, useMotionValueEvent, useScroll } from "motion/react";
import { RefObject, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
// import { useStore } from "../stores/store";

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

export type AnimationHandle = {
  toggleShow: (current: Position, last: Position) => void;
};

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
  reset?: boolean;
  handleRef?: RefObject<unknown>;
  active?: boolean;
};

type Position = "below" | "show" | "above";

export function WordAnimation({
  text,
  className = "",
  mode = "overflow",
  duration = 2,
  delay = 0,
  unitDelay = 0.1,
  transformOffset = "110%",
  easing = "easeInOut",
  once = false,
  amount = 0.1,
  fixed = false,
  min = 0,
  max = 1,
  reset = false,
  active = true,
  handleRef,
}: AnimateWordsProps) {
  // const { height } = useStore((state) => state.viewport);
  const height = useMemo(() => {
    return window.innerHeight;
  }, []);
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
      if (!active) return;

      let position = "below";
      const s = scroll / height;
      if (s < min) position = "below";
      else if (s < max) position = "show";
      else position = "above";

      setState((s) => (s.current === position ? s : { current: position as Position, last: s.current }));
    },
    [height, min, max, active]
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

  useImperativeHandle(
    handleRef,
    () => {
      return {
        toggleShow(current: Position, last: Position) {
          setState(() => {
            return { current, last };
          });
        },
      };
    },
    []
  );

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

  // useEffect(() => {
  //   if (max === 0.25) console.log(fixed, new Date().toISOString(), show);
  // }, [show, fixed, max]);

  // useEffect(() => {
  //   console.log(show);
  // }, [show]);

  const variants = {
    initial: {
      transform: transform[show.last],
      opacity: opacity[show.last],
    },
    animate: (i: number) => ({
      transform: transform[show.current],
      opacity: opacity[show.current],
      transition: {
        duration,
        // delay: (state !== "above" ? i : splittedText.length - i) * unitDelay + delay,
        // delay: (show.last === "above" ? splittedText.length - i : i) * unitDelay + delay,
        delay: i * unitDelay + delay,
        ease: easing,
        // opacity: {
        //   ease: "easeOut" as Easing,
        //   duration: 2,
        // },
        // opacity: duration/2
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
    <div className="flex flex-col" ref={ref}>
      {splittedText.map((line, i) => {
        return (
          <p
            key={`${i}_${line.join(" ")}`}
            className={clsx("flex flex-wrap justify-center leading-[1]", {}, className)}
          >
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
                      if (last && reset) setState({ current: "below", last: "below" });
                    }}
                  >
                    <span className="overflow-visible">{current.text}</span>
                  </motion.span>
                  {/* {j < line.length - 1 && <span>{"\u00A0"}</span>} */}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
