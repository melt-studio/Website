import clsx from "clsx";
import { Easing, motion, useMotionValueEvent, useScroll } from "motion/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../stores/store";

type ObserverOptions = {
  amount?: number;
  once?: boolean;
};

const useObserver = ({ amount = 0.5, once = false }: ObserverOptions = {}): [
  RefObject<HTMLParagraphElement | null>,
  Position
] => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [position, setPosition] = useState<Position>("below");

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (once && initialized) return;

      const [entry] = entries;
      if (entry.isIntersecting) {
        setPosition("show");
        setInitialized(true);
      } else {
        setPosition(entry.boundingClientRect.y < 0 ? "above" : "below");
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
  duration = 1,
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
  const [show, setShow] = useState<Position>("below");
  const splittedText = text.split(" ");

  const updateShow = useCallback(
    (scroll: number) => {
      let position = "below";
      const s = scroll / height;
      if (s < min) position = "below";
      else if (s < max) position = "show";
      else position = "above";

      setShow(position as Position);
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

  const state = fixed ? show : position;

  const variants = {
    initial: {
      transform: transform.below,
      opacity: opacity.below,
    },
    animate: (i: number) => ({
      transform: transform[state],
      opacity: opacity[state],
      transition: {
        duration,
        delay: (state === "below" ? i : splittedText.length - i) * unitDelay + delay,
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

  return (
    <p className={clsx("flex flex-wrap", {}, className)} ref={ref}>
      {splittedText.map((current, i) => (
        <span
          key={i}
          className={clsx("relative", {
            "overflow-hidden": mode === "overflow",
          })}
        >
          <motion.span custom={i} {...motionProps}>
            {current}
          </motion.span>
          <span>{"\u00A0"}</span>
        </span>
      ))}
    </p>
  );
}
