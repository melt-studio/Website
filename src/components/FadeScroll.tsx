import { ReactNode, useRef } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

type FadeScrollProps = {
  // viewport?: { amount: number };
  // onEnter?: () => void;
  // onExit?: () => void;
  // id?: string;
  className?: string;
  // style?: MotionStyle;
  // exit?: boolean;
  children: ReactNode;
};

const FadeScroll = ({
  // viewport = { amount: 0.5 },
  // onEnter = () => {},
  // onExit = () => {},
  // id,
  className,
  // style,
  // exit = false,
  children,
}: FadeScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // const [show, setShow] = useState(false)

  // const handleEntry = {
  //   onViewportEnter: () => {
  //     if (ref.current) {
  //       if (!ref.current.classList.contains("show")) {
  //         ref.current.classList.add("show");
  //       }
  //       if (exit) ref.current.classList.remove("exit");
  //     }
  //     onEnter();
  //   },
  //   onViewportLeave: () => {
  //     if (ref.current) {
  //       ref.current.classList.remove("show");
  //       if (exit) ref.current.classList.add("exit");
  //     }
  //     onExit();
  //   },
  // };

  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start end", "end start"],
  // });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   if (pageViewport === undefined) return;
  //   if (pageViewport.width < 960) return;
  //   if (title === "Our Approach" && ind === 1) {
  //     // console.log(text)
  //     console.log(
  //       "Page scroll: ",
  //       viewport.amount,
  //       latest,
  //       latest < viewport.amount || latest > 1 - viewport.amount ? "hide" : "show"
  //     );
  //   }
  // });

  return (
    <motion.div
      ref={ref}
      viewport={{ amount: 0.5, once: true }}
      transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      initial={{ opacity: 0, transform: "translateY(40px)" }}
      // exit={{ opacity: 0, transform: "translateY(-40px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      className={clsx("w-full h-fit relative", {}, className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeScroll;
