import { useRef } from "react";
import { motion } from "framer-motion";

const FadeScroll = ({
  viewport = { amount: 0.5 },
  onEnter = () => null,
  onExit = () => null,
  id,
  className,
  style,
  exit = false,
  // pageViewport,
  // ind,
  // title,
  // text,
  children,
}) => {
  const ref = useRef();

  const handleEntry = {
    onViewportEnter: () => {
      if (ref.current) {
        if (!ref.current.classList.contains("show")) {
          ref.current.classList.add("show");
        }
        if (exit) ref.current.classList.remove("exit");
      }
      onEnter();
    },
    onViewportLeave: () => {
      if (ref.current) {
        ref.current.classList.remove("show");
        if (exit) ref.current.classList.add("exit");
      }
      onExit();
    },
  };

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
    <motion.div ref={ref} viewport={viewport} {...handleEntry} id={id} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export default FadeScroll;
